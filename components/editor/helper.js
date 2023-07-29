import { Editor, Transforms, Element } from "slate";

const CustomEditor = {
    isBoldMarkActive(editor) {
        const marks = Editor.marks(editor);
        return marks ? marks.bold === true : false;
    },

    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor);
        if (isActive) {
            Editor.removeMark(editor, "bold");
        } else {
            Editor.addMark(editor, "bold", true);
        }
    },
    toogleCode(editor) {
        console.log('触发函数')
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code',
        })
        // Toggle the block type depending on whether there's already a match.
        Transforms.setNodes(
            editor,
            { type: match ? 'paragraph' : 'code' },
            { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
        )
    }
};

export default CustomEditor