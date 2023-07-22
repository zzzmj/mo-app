import React, { useRef, useEffect, ChangeEvent } from "react";

interface AutoResizeTextareaProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({ value, onChange }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [value]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
        onChange && onChange(event);
    };

    return (
        <textarea
            rows={1}
            className={"textarea bg-slate-100 block w-full"}
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            style={{
                resize: "none",
                overflow: "hidden",
            }}
        />
    );
};

export default AutoResizeTextarea;



// const InputEditable = (props) => {
//     const ref = useRef(null)
//     const { value, onChange } = props

//     const handleChange = (e) => {
//         const html = ref.current.innerHTML
//         onChange(html)
//     }

//     return <div
//         ref={ref}
//         contentEditable={true} 
//         style={{ whiteSpace: 'pre-wrap' }}
//         className={"w-20 mo-form-item textarea bg-slate-100 flex-1"}
//         onInput={handleChange}
//         onBlur={handleChange}
//         dangerouslySetInnerHTML={{__html: value}}
//     />
// }


// export default InputEditable