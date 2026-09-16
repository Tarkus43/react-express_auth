interface SubmitBtnProps {
    text: string
    className: string
}

const SubmitBtn = ({text, className}: SubmitBtnProps) => {
    return(
        <button type="submit" className={className}>{text}</button>
    )
}

export default SubmitBtn