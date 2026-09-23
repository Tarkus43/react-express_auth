import LoginForm from "../LoginForm/LoginForm"

const Login = () => {
    return(
        <>
            <h1>Welcome to login page!</h1>
            <p>I hope your eyes wont bleed</p>
            <LoginForm className="login_form" />
        </>
    )
}

export default Login