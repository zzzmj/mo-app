// Import React dependencies.
import React, { useCallback, useState } from "react";
import { Transforms, createEditor, BaseEditor, Editor } from "slate";
import { Slate, Editable, withReact, ReactEditor, DefaultElement } from "slate-react";
import useKeyboardShortcuts from './useKeyboardShortcuts'
import { HighLight, List, ListAlphabet, ListNumbers, TextBold } from "@icon-park/react";
// import styles from './SlateEditor.module.scss'


const Leaf = (props) => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
        >
            {props.children}
        </span>
    );
};

const CodeElement = props => {
    return (
        <pre className="bg-gray-100 inline-block p-[1px]" {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}
  
const DividerElement = (props) => {
    return <div {...props.attributes} className="h-[1px] my-2 bg-gray-100">
        {props.children}
    </div>;
};

const SlateEditor = () => {
    const [editor] = useState(() => withReact(createEditor()));
    const handleKeyDown = useKeyboardShortcuts(editor)
    const initialValue = [
        {
            type: 'paragraph',
            children: [{ text: '' }]
        }
    ];;

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    const renderElement = useCallback(props => {
        switch (props.element.type) {
        case 'code':
            return <CodeElement {...props} />
        case 'divider':
            return <DividerElement {...props} />;
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            )
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case 'numbered-list':
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            )
            // 为其他元素类型添加其他case
        default:
            return <DefaultElement {...props} />;
        }
    }, []);
    
    const handleChange = (value) => {
        console.log('value', value)
    }

    return (
        <div className="bg-white mt-4 relative">
            <Slate editor={editor} initialValue={initialValue} onChange={handleChange}>
                <Editable
                    placeholder="现在的想法是..."
                    renderLeaf={renderLeaf}
                    renderElement={renderElement}
                    className={"p-4 pb-12 min-h-[154px] transition-all rounded-lg border shadow"}
                    onKeyDown={handleKeyDown}
                    style={{
                        minHeight: 154
                    }}
                />
            </Slate>

            <div className="action flex absolute left-4 bottom-4 items-center">
                <TextBold className="p-1 mr-1 rounded cursor-pointer hover:bg-gray-100 transition" theme="filled" size="20" fill="#9d9d9d"/>
                <HighLight className="p-1 mr-1 rounded cursor-pointer hover:bg-gray-100 transition" theme="filled" size="20" fill="#9d9d9d"/>
                <div className="w-[1px] bg-gray-200 h-5 mx-4" />
                <List className="p-1 mr-1 rounded cursor-pointer hover:bg-gray-100 transition" theme="filled" size="20" fill="#9d9d9d"/>
                <ListAlphabet className="p-1 mr-1 rounded cursor-pointer hover:bg-gray-100 transition" theme="filled" size="20" fill="#9d9d9d"/>
                <ListNumbers className="p-1 mr-1 rounded cursor-pointer hover:bg-gray-100 transition" theme="filled" size="20" fill="#9d9d9d"/>
            </div>
        </div>
    );
};

export default SlateEditor;
