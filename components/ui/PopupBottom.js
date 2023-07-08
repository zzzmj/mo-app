// 底部弹窗


// type = 'success' | 'fail'
const PopupBottom = (props) => {
    const { visible, content, type = 'success' } = props

    return <div className={"popup-bottom"}>
        <h1>正确答案：</h1>

        <div>{content}</div>
    </div>
}