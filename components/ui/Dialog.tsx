// 弹窗


interface DialogProps { 
    id: any; 
    title?: string; 
    desc?: string; 
    footer?: any; 
    onConfirm?: any; 
    onCancel?: any 
}

const Dialog = (props: DialogProps) => {
    const { id, title = '标题', desc = '这里是一个dialog', footer, onConfirm, onCancel } = props
    return <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{desc}</p>
            <div className="modal-action">
                {footer || <>
                    <button onClick={onConfirm} className="btn btn-error text-white" >确定</button>
                    <button onClick={onCancel} className="btn" >取消</button>
                </>}
                
            </div>
        </form>
    </dialog>
}

export default Dialog