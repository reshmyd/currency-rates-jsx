import './Button.scss'

const Button = ({isSecondary, isAdded, onClick}) => {
  let text = isSecondary ? "Edit" : isAdded ? "Send" : "Add"
  
  return (
    <button className={isSecondary ? "btn secondary" : "btn"} onClick={onClick}>{text}</button>
  )
}

export default Button

