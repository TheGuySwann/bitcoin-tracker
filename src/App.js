import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [bitcoinPrice, setBitcoinPrice] = useState('');
  const [satsPerDollar, setSatsPerDollar] = useState(0);

  useEffect(() => {
    const fetchPrice = () => {
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then((response) => response.json())
        .then((data) => {
          const price = data.bitcoin.usd;
          setBitcoinPrice(price);
          const sats = 1 / price * 100000000; // Calculate sats per dollar
          setSatsPerDollar(sats.toFixed(0)); // Set the state, rounding to the nearest whole number
        })
        .catch((error) => console.log(error));
    };
  
    fetchPrice(); // Fetch price immediately on mount
    const interval = setInterval(fetchPrice, 60000); // Then every minute
  
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  

  return (
    <div className="App">
      <header className="App-header">
        <p>Bitcoin price: ${bitcoinPrice}</p>
        <p>Sats per dollar: {satsPerDollar}</p>
      </header>
    </div>
  );
  
}

export default App;
