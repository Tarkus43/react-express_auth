import { useState, type SubmitEvent, type ChangeEvent, type MouseEvent, useEffect, useRef } from "react"
import InputField from "../InputField/InputField"
import Button from "../Button/Button"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import Cookies from "js-cookie"

interface LoginFormProps {
    className: string
}

interface ResponseData {
    status?: string
    token?: string
}

interface LoginResponse {
    data?: ResponseData
    error?: string
}

const LoginForm = ({className}: LoginFormProps) => {

    // states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState("")
    const [isLogined, setIsLogined] = useState(false)

    // refs
    const emailInputRef = useRef(null)

    // effects
    useEffect(() => {
        const token = Cookies.get("token")
        if (token) {
            setIsLogined(true)
        }
    }, [])
    useEffect(() => {
        emailInputRef.current.focus()
    }, [])
    useEffect(() => {
        if (!isLogined) {
            emailInputRef.current.focus()
        }
    }, [isLogined])

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

            const result:LoginResponse = await response.json()

            if (!response.ok) {
                setLoginError(result.error)
                return
            }

            

            if (result.data?.token) {
                Cookies.set("token", result.data.token)
                setIsLogined(true)
                setLoginError("")
                console.log("Successfully logined!")
            } else if (result.error) {
                setLoginError(result.error)
            }
        } catch (error) {
            if (error instanceof Error){
                setLoginError(error.message)
            } else {
                setLoginError("Unexpected login error")
            }
        }
        
    }

    const logout = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        try {
            const response = await fetch("http://localhost:3001/auth/logout",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(response)
            Cookies.remove("token")
            setIsLogined(false)
        } catch (error) {
            setLoginError(error.message)
        }
    }

    return(
        <>
            {!isLogined && <form onSubmit={login} className={className}>
                <InputField 
                    title="email"
                    type="email" 
                    inner="example@mail.com"
                    className="login_input input"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {setEmail(event.currentTarget.value)}}
                    emailInputRef={emailInputRef}
                />
                <InputField 
                    title="password"
                    type="password"
                    inner="password123"
                    className="password_input input"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {setPassword(event.currentTarget.value)}}
                />
                <Button 
                    className="login_btn btn" 
                    text="login"
                    type="submit"
                />
            </form>}
            {isLogined && !loginError && <p>Successfully logined</p>}
            {isLogined && <Button
                className="logout_btn btn"
                text="logout"
                type="button"
                onClick={logout}
            />}
            {loginError && <ErrorHandler
                text={loginError}
                className="login_error_handler error_handler"
            />}
        </>
    )
}

export default LoginForm