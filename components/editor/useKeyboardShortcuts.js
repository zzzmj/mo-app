import { useEffect, useState } from "react";
import CustomEditor from "./helper";
import { Editor, Transforms } from "slate";


const useKeyboardShortcuts = (editor) => {
    const [keyCommands, setKeyCommands] = useState({});


    const handleKeyDown = (event) => {
        const { key, metaKey, ctrlKey, shiftKey, altKey } = event;
        let combo = "";
        if (metaKey) combo += "meta+";
        if (ctrlKey) combo += "ctrl+";
        if (shiftKey) combo += "shift+";
        if (altKey) combo += "alt+";
        combo += key.toLowerCase();

        if (keyCommands[combo]) {
            keyCommands[combo]();
            event.preventDefault();
        }

        if (key === 'Enter') {
            const [match] = Editor.nodes(editor, {
                match: n => n.type === 'code' || n.type === 'divider',
            });
        
            if (match) {
                event.preventDefault();
                Transforms.insertNodes(editor, {
                    type: 'paragraph',
                    children: [{ text: '' }]
                });
            }
        }

        if (key === 'Enter') {
            // 获取当前选择的节点
            const [match] = Editor.nodes(editor, {
                match: n => n.type === 'paragraph',
            });

            if (match) {
                const [node, path] = match;
                if (node.children.length === 1 && node.children[0].text === '---') {
                    event.preventDefault();
                    Transforms.delete(editor, { at: path });
                    // 将当前段落节点替换为divider节点
                    Transforms.insertNodes(editor, { type: 'divider', children: [{ text: '' }] });

                    // 在下一行插入一个新的段落节点
                    const paragraph = { type: 'paragraph', children: [{ text: '' }] };
                    Transforms.insertNodes(editor, paragraph);
                }
            }
        }
    };

    useEffect(() => {
        
        // 初始化你的快捷键
        setKeyCommands({
            "meta+b": () => CustomEditor.toggleBoldMark(editor),
            "ctrl+`": () => CustomEditor.toogleCode(editor)
            // ... 你可以在这里添加其他的快捷键和对应的回调函数
        });
    }, [editor]);

    return handleKeyDown;
};

export default useKeyboardShortcuts