import './Row.scss'
import Button from '../Button/Button'

const Row = ({currency, amount, rate, isSecondary, setCurrency, handleAddClick, index, isAdded, handleEditClick, handleSendClick}) => {
  
  const onClick = isSecondary ? handleEditClick : isAdded ? () => handleSendClick(index) : handleAddClick
  return (
    <div className={isSecondary ? "row main" : "row"}>
      <div className='row__values'>
        {currency ? (<div>{currency}</div>):(<>
        <select name="currency" onChange={e => {
          console.log(e.target.value)
          setCurrency(e.target.value)}}>
          <option value="USD">US Dollar</option>
          <option value="AUD">Australian Dollar</option>
          <option value="CAD">Canadian Dollar</option>
          <option value="INR">Indian Rupee</option>
          <option value="GBP">British Pound</option>
          <option value="CNY">Chinese Yuan</option>
          <option value="RUB">Russian Ruble</option>
          <option value="NZD">New Zealand Dollar</option>
        </select>
        </>)}
        {isSecondary ? (<input type="text" value={amount} readOnly/>):(<div>{amount}</div>)}
        <div>{rate ? rate : ""}</div>
      </div>
      
      <Button isSecondary={isSecondary} isAdded={isAdded} onClick={onClick}  />
      
    </div>
  )
}

export default Row