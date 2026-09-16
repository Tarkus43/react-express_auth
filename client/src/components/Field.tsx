interface FieldProps {
    title: string
    inner: string
    type: string
    className: string
}


const Field = ({ title, inner, type, className }: FieldProps) => {



    return (
        <>  
            <div className="input_wrapper">
                <data className={className}></data>
                <p>{title}</p>
                <input type={type} placeholder={inner} />
            </div>
        </>
    )
}   

export default Field