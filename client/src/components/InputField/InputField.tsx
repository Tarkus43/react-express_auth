import type { ChangeEventHandler, RefObject } from "react"

interface InputFieldProps {
    title: string
    inner: string
    type: string
    inputClassName: string
    textClassName: string
    onChange: ChangeEventHandler<HTMLInputElement>
    emailInputRef?: RefObject<HTMLInputElement>
}


const InputField = ({ title, inner, type, inputClassName, textClassName, onChange, emailInputRef }: InputFieldProps) => {
    return (
        <>  
            <div className="input_wrapper">
                <p className={textClassName}>{title}</p>
                <input className={inputClassName} ref={emailInputRef} onChange={onChange} type={type} placeholder={inner} />
            </div>
        </>
    )
}   

export default InputField