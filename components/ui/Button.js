import cn from "@/lib/cn";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
    'flex justify-center items-center btn border-gray-300 btn-outline w-full',
    {
        variants: {
            type: {
                default: 'border-2',
                primary: 'bg-mo-100 border-mo-200 text-mo-300',
                success: 'bg-mo-success text-white border-0 border-#[none]',
                error: 'bg-[#ff4b4b] text-white border-0',
                success2: 'bg-green-500 !border-0 border-#[none]',
                error2: 'bg-red-500 !border-0',
                warning: 'bg-amber-500 text-white !border-0',
                disable: 'bg-[#e5e5e5] border-0 opacity-1',
            },
        },
        defaultVariants: {
            type: 'default'
        }
    }
)

// ff4b4b
const Button = (props) => {
    const { className, type = 'default', onClick, style } = props

    const cls = cn(buttonVariants({
        type,
        className
    }))
    return <button style={style} onClick={onClick} disabled={type === 'disable'} className={cls}>{props.children}</button>
}

export default Button