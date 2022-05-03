import './LatestRates.scss'
import Row from '../../components/Row/Row'

const LatestRates = ({rows, handleCurrencyAdd, amount, setCurrency, handleAddClick, handleEditClick, handleSendClick}) => {
  return (
    <div className='latest-rates'>
      <p>Transfer</p>
      <h2>View Latest Rates</h2>
      <div className='latest-rates__description'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</div>
      
      <div className='table'>
        <div className='headings'>
          <div>Currency</div>
          <div>Amount</div>
          <div>Rate</div>
        </div>
        
        <div className='table-body'>
          <Row currency="Euro" amount={amount} isSecondary />
          {rows.length ? (
            <>
            {rows.map((elem, index) => <Row key={index + 1} currency={elem.currency} amount={elem.amount} rate={elem.rate} setCurrency={setCurrency} handleAddClick={handleAddClick} index={index} isAdded={elem.amount ? true : false} handleEditClick={handleEditClick} handleSendClick={handleSendClick}/>)}
            </>
          ) : (<></>)} 
        </div>
      </div>
      <button onClick={handleCurrencyAdd}>Add Currency</button>
    </div>
  )
}

export default LatestRates