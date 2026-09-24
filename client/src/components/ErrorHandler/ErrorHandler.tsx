interface ErrorHandlerProps {
    className?: string
    text: string
}

const ErrorHandler = ({className, text}: ErrorHandlerProps) => {
    return(
        <div className={className}>{text}</div>
    )
}

export default ErrorHandler