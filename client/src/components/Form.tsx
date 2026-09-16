import type { SubmitEvent } from "react"
import Field from "./Field"
import SubmitBtn from "./SubmitBtn"

interface FormProps {
    className: string
}

const Form = ({className}: FormProps) => {
    const onSubmit = (event: SubmitEvent): void => {
        event.preventDefault()
    }

    return(
        <>
            <form onSubmit={onSubmit} action="post" className={className}>
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
                <SubmitBtn className="login_submit_btn btn" text="login" />
            </form>
        </>
    )
}

export default Form