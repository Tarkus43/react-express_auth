import { useState, type SubmitEvent, type InputEvent, type MouseEvent } from "react"
import Field from "./Field"
import Button from "./Button"
import Cookies from "js-cookie"

interface FormProps {
    className: string
}

interface ResponseData {
    error?: string
    status?: string
    token?: string 
}

interface LoginResponse {
    data?: ResponseData
}

const Form = ({className}: FormProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLogined, setIsLogined] = useState("")

    const login = async (event: SubmitEvent<HTMLFormElement>) => {
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

            Cookies.set("token", result.data.token)

            console.log("Successfully logined ", result.data)
            setIsLogined("true")
        } catch (error) {
            setError(error)
        }
        
    }

    return(
            <form onSubmit={login} className={className}>
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
                    className="login_btn btn" 
                    text="login"
                    type="submit"
                />
                {isLogined && !error && <div>Successfully logined</div>}
                
            </form>
    )
}

export default Form