import type { ChangeEventHandler } from "react"

interface FieldProps {
    title: string
    inner: string
    type: string
    className: string
    onChange: ChangeEventHandler<HTMLInputElement>
}


const Field = ({ title, inner, type, className, onChange }: FieldProps) => {



    return (
        <>  
            <div className="input_wrapper">
                <data className={className}></data>
                <p>{title}</p>
                <input onChange={onChange} type={type} placeholder={inner} />
            </div>
        </>
    )
}   

export default Field