interface ErrorProps {
    className: string
    text: string
}

const Error = ({className, text}: ErrorProps) => {
    return(
        <div className={className}>{text}</div>
    )
}

export default Error