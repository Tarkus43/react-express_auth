import type { InputEventHandler } from "react"

interface FieldProps {
    title: string
    inner: string
    type: string
    className: string
    onInput: InputEventHandler<HTMLInputElement>
}


const Field = ({ title, inner, type, className, onInput }: FieldProps) => {



    return (
        <>  
            <div className="input_wrapper">
                <data className={className}></data>
                <p>{title}</p>
                <input onInput={onInput} type={type} placeholder={inner} />
            </div>
        </>
    )
}   

export default Field