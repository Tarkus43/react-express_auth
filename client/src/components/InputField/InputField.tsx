import type { ChangeEventHandler, RefObject } from "react"

interface InputFieldProps {
    title: string
    inner: string
    type: string
    className: string
    onChange: ChangeEventHandler<HTMLInputElement>
    emailInputRef?: RefObject<HTMLInputElement>
}


const InputField = ({ title, inner, type, className, onChange, emailInputRef }: InputFieldProps) => {



    return (
        <>  
            <div className="input_wrapper">
                <data className={className}></data>
                <p>{title}</p>
                <input ref={emailInputRef} onChange={onChange} type={type} placeholder={inner} />
            </div>
        </>
    )
}   

export default InputField