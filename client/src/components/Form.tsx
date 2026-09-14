import Field from "./Field"

interface FormProps {
    className: string
}

const Form = ({className}: FormProps) => {
    return(
        <>
            <form action="post" className={className}>
                <Field 
                    title="email"
                    type="email" 
                    inner="example@mail.com"
                    className="login_input input"
                />
                <Field 
                    title="password"
                    type="password"
                    inner="password123"
                    className="password_input input"
                />
            </form>
        </>
    )
}

export default Form