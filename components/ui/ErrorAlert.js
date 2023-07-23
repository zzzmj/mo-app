'use client'

const ErrorAlert = (props) => {
    const { text } = props
    return (
        <div className="toast toast-top toast-center pt-100">
            <div className="alert alert-error">
                <span>{text}</span>
            </div>
        </div>
    )
}

export default ErrorAlert