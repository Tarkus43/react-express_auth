import { useState, type SubmitEvent, type InputEvent } from "react"
import Field from "./Field"
import Button from "./Button"
import Cookies from "js-cookie"

interface FormProps {
    className: string
}

interface LoginResponse {
    error?: string
    data?: object
    status?: string
    token?: string
}

const Form = ({className}: FormProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLogined, setIsLogined] = useState("")

    const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const response = await fetch("http://localhost:3001/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            if (!response.status) {
                throw new Error("Error while sending login request")
            }

            const result:LoginResponse = await response.json()

            Cookies.set("token", result.token)

            console.log("Successfully logined ", result.data)
            setIsLogined("true")
        } catch (error) {
            setError(error)
        }
        
    }

    return(
            <form onSubmit={onSubmit} className={className}>
                <Field 
                    title="email"
                    type="email" 
                    inner="example@mail.com"
                    className="login_input input"
                    onInput={(event: InputEvent<HTMLInputElement>) => {setEmail(event.currentTarget.value)}}
                />
                <Field 
                    title="password"
                    type="password"
                    inner="password123"
                    className="password_input input"
                    onInput={(event: InputEvent<HTMLInputElement>) => {setPassword(event.currentTarget.value)}}
                />
                <Button 
                    className="login_submit_btn btn" 
                    text="login"
                    type="submit"
                />
                {isLogined && !error && <div>Successfully logined</div>}
            </form>
    )
}

export default Form