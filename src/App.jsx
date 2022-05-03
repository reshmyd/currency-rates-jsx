import './App.scss';
import {useEffect, useState} from 'react'
import Nav from './components/Nav/Nav';
import LatestRates from './pages/LatestRates/LatestRates';
import Row from './components/Row/Row';



const today = new Date()
const yesterday = new Date()
yesterday.setDate(today.getDate() - 1)
  
const month = yesterday.getMonth() > 8 ? (yesterday.getMonth() + 1).toString() : "0" + (yesterday.getMonth() + 1)
const date = yesterday.getDate() > 9 ? yesterday.getDate().toString() : "0" + yesterday.getDate()
const fullDate = yesterday.getFullYear() + "-" + month + "-" + date



const App = () => {
  const [todaysRates, setTodaysRates] = useState({})
  const [yesterdaysRates, setYesterdaysRates] = useState({})
  const [readonly, setReadOnly] = useState(true)
  const [rows, setRows] = useState([])
  const [amount, setAmount] = useState("1.00")
  const [currency, setCurrency] = useState("")
  const [currentRates, setCurrentRates] = useState([
                                                      {
                                                        name: "US Dollar",
                                                        isoCode: "USD",
                                                        amount: 0,
                                                        rate: ""
                                                      },
                                                      {
                                                        name: "Australian Dollar",
                                                        isoCode: "AUD",
                                                        amount: 0,
                                                        rate: ""
                                                      },
                                                      {
                                                        name: "Canadian Dollar",
                                                        isoCode: "CAD",
                                                        amount: 0,
                                                        rate: ""
                                                      },
                                                      {
                                                        name: "Indian Rupee",
                                                        isoCode: "INR",
                                                        amount: 0,
                                                        rate: ""
                                                      },
                                                      {
                                                        name: "British Pound",
                                                        isoCode: "GBP",
                                                        amount: 0,
                                                        rate: ""
                                                      },
                                                      {
                                                        name: "Chinese Yuan",
                                                        isoCode: "CNY",
                                                        amount: 0,
                                                        rate: ""
                                                      },
                                                      {
                                                        name: "Russian Ruble",
                                                        isoCode: "RUB",
                                                        amount: 0,
                                                        rate: ""
                                                      },
                                                      {
                                                        name: "New Zealand Dollar",
                                                        isoCode: "NZD",
                                                        amount: 0,
                                                        rate: ""
                                                      }
                                                    ])
  
  
  useEffect(() => {
    fetch(`http://api.exchangeratesapi.io/v1/${fullDate}?access_key=d0a9cf39f8888c984808854c5918ca41&symbols=USD,AUD,CAD,JYP,INR,GBP,CNY,RUB,NZD`)
      .then(res => res.json())
      .then(res => {
        setYesterdaysRates(res.rates)
        //console.log(yesterdaysRates)
      })
      .catch(err => console.log(err))

    fetch('http://api.exchangeratesapi.io/v1/latest?access_key=d0a9cf39f8888c984808854c5918ca41&symbols=USD,AUD,CAD,JYP,INR,GBP,CNY,RUB,NZD')
      .then(res => res.json())
      .then(res => {
        setTodaysRates(res.rates)
        // console.log(todaysRates)
      })
      .catch(err => console.log(err))
  }, [])

  
  
  useEffect(() => {
    
    let tempCurrRates = [...currentRates]
    if(Object.keys(todaysRates).length && Object.keys(yesterdaysRates).length) {
      
      tempCurrRates = tempCurrRates.map((elem) => {
        
        let tempRates = ((todaysRates[elem.isoCode] - yesterdaysRates[elem.isoCode]) / yesterdaysRates[elem.isoCode]).toString()
        if (+tempRates > 0) tempRates = "+" + tempRates
        while (tempRates.length < 6) {
          tempRates += "0"
        } 
        console.log(tempRates)
        tempRates = tempRates.substring(0,6) + "%"
        elem.rate = tempRates
        
        let tempAmt = todaysRates[elem.isoCode].toString()
        while (tempAmt.length < 6) {
          tempAmt += "0"
        }
        tempAmt = tempAmt.substring(0,6)
        elem.amount = +tempAmt
        return elem
      })
    }

    console.log(tempCurrRates)

    setCurrentRates(tempCurrRates)
    }, [todaysRates, yesterdaysRates])

  const handleCurrencyAdd = () => {
    if (!currency) {
      const tempRow = {
        currency: "", 
        amount: "", 
        rate: ""
      }
      setRows([...rows,tempRow])
    }
    setCurrency("US Dollar")
   }

  const handleAddClick = () => {
    const index = rows.length - 1
    const tempRows = [...rows]
    let name, amount, rate
    currentRates.forEach(elem => {
      if (elem.isoCode === currency) {
        name = elem.name
        amount = elem.amount
        rate = elem.rate
      }
    })
    tempRows[index].currency = name
    tempRows[index].amount = (amount * +amount).toString().substring(0,6)
    tempRows[index].rate = rate
    setCurrency("")
  }

  const handleEditClick = () => {

  }

  const handleSendClick = (i) => {
    console.log(i)
   let tempRows = [...rows]
   tempRows = tempRows.filter((elem, index) => {
     if (index !== i) return elem
     })
     console.log(tempRows)
   setRows(tempRows)
  }
  
  return (
    <div className="App">
      <Nav />
      <LatestRates rows={rows} handleCurrencyAdd={handleCurrencyAdd} amount={amount} setCurrency={setCurrency} handleAddClick={handleAddClick} handleEditClick={handleEditClick} handleSendClick={handleSendClick}/>
      
      
    </div>
  );
}

export default App;

