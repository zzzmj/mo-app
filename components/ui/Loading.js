const Loading = (props) => {
    const { text } = props
    return <div className="toast toast-top toast-center pt-100">
        <div className="alert">
            <span className="loading loading-spinner text-info"></span>
            <span>{text}</span>
        </div>
    </div>
}

export default Loading