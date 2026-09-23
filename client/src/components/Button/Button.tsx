import type { MouseEventHandler } from "react"


interface ButtonProps {
    text: string
    className: string
    type: "submit" | "reset" | "button"
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({text, className, type, onClick}: ButtonProps) => {
    return(
        <button onClick={onClick} type={type} className={className}>{text}</button>
    )
}

export default Button