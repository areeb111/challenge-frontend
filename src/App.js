import logo from './logo.svg';
import './App.css';
import {React, useState}  from 'react';
import axios from 'axios';

function App() {

  const [primeNumbers, setPrimeNumbers] = useState('');
  const [median, setMedian] = useState('');
  const [inputNumber, setInputNumber] = useState(0);
  const [result, setResult] = useState(false);
  const [instrcutions, setInstrcutions] = useState(true);

  const handleClick = async () => {
    // API Call to backend to get the result
    const result = await axios.get('http://localhost:3000/prime?num=' + inputNumber);
    if (result.data.status) {
      setPrimeNumbers(result.data.primes.join(', '));
      setMedian(result.data.median.join(', '));
      setInputNumber(result.data.inputNumber);
      setInstrcutions(false);
      setResult(true);
    } else{
      setInstrcutions(false);
      setResult(false);
    }
  }

  function Result({ isSuccess, showInstructions }) {
    if (showInstructions) {
      return (
        <div className='output instructions'>
          <div>Instructions:</div>
          <ol>
            <li>Enter a number between 2 and 10,000</li>
            <li>Click on Calculate</li>
          </ol>
        </div>
      )
    } else {
      if (isSuccess) {
        return (
        <div className='output success'>
          <div data-testid='result'>Result:</div>
          <div>
            <div data-testid='prime-numbers'>Prime numbers: {primeNumbers}</div>
            <div data-testid='median'>Median: {median}</div>
          </div>
        </div>
      )} else {
        return <div className='output error'>Invalid input, Please use a number between 2 and 10,000</div>
      }
    }
    
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Coding Challenge
        </p>
        <h5>
          Prime numbers & median
        </h5>

        
        <div className='myForm'>
         
            <label htmlFor="num">Input number</label>
            <input type="number" id="num" data-testid="input-number" onChange={e => setInputNumber(e.target.value)} name="num" placeholder="Enter a number" />
            <button data-testid="calculate-button" onClick={handleClick}>Calculate</button>
       
        </div>
        <div >
          <Result isSuccess={result} showInstructions={instrcutions} />
        </div>
      </header>
    </div>
  );
}

export default App;
