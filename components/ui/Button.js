import classNames from "classnames";

// ff4b4b
const Button = (props) => {
    const { className, type = 'default', onClick } = props
    const cls = classNames({
        [className]: className,
        'flex justify-center items-center btn border-2 border-gray-300 btn-outline w-full': true,
        'bg-mo-100 border-mo-200 text-mo-300': type === 'primary',
        'bg-mo-success text-white border-0': type === 'success',
        'bg-[#ff4b4b] text-white border-0': type === 'error',
        'bg-[#e5e5e5] border-0 opacity-1': type === 'disable',
    })
    return <button onClick={onClick} disabled={type === 'disable'} className={cls}>{props.children}</button>
}

const test = () => {
    return <div className={"items-center opacity-1"}></div>
}

export default Button