import { useState, useEffect } from 'react' // Added useEffect for potential automatic conversion
import {InputBox} from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo' // Corrected path

function App() {
    const [amount,setAmount]=useState(0);
    const [from,setFrom]= useState("usd");
    const [to,setTo]= useState("inr");
    const [convertedAmount,setConvertedAmount]=useState(0);

    // Assuming useCurrencyInfo fetches data when 'from' changes
    const currencyInfo = useCurrencyInfo(from); // currencyInfo is an object like { inr: 83, eur: 0.92, ... }

    // Ensure options are updated when currencyInfo changes
    const options = currencyInfo ? Object.keys(currencyInfo) : [];

    // Optional: Recalculate convertedAmount whenever amount, from, or to changes
    // You could also rely solely on the button click, but this is a common pattern
    useEffect(() => {
        convert(); // Convert on initial load and whenever dependencies change
    }, [amount, from, to, currencyInfo]); // Add currencyInfo as a dependency

    const swap = () => {
      setFrom(to)
      setTo(from)
      // When swapping, the previous convertedAmount becomes the new amount
      setAmount(convertedAmount)
      // The new convertedAmount will be calculated by the useEffect or the convert button
      // setConvertedAmount(0); // You could reset, or let the convert logic handle it
    }

    const convert = () => {
        
        if (currencyInfo && currencyInfo[to] !== undefined) {
            setConvertedAmount(amount * currencyInfo[to]); // Corrected: access rate using [to]
        } else {
             setConvertedAmount(0); // Handle cases where rate is not available
             console.error(`Conversion rate for ${to} not found.`);
        }
    }

    return (
      <div
          className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
          style={{
              backgroundImage: `url('https://images.pexels.com/photos/31748896/pexels-photo-31748896/free-photo-of-aerial-view-of-antalya-cityscape-in-turkey.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load')`,
          }}
      >
          <div className="w-full">
              <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                  <form
                      onSubmit={(e) => {
                          e.preventDefault();
                          convert(); 
                      }}
                  >
                      <div className="w-full mb-1">
                          <InputBox
                              label="From"
                              amount={amount}
                              currencyOptions={options}
                              onCurrencyChange={(currency) => setFrom(currency)} 
                              selectCurrency={from}
                              
                              onAmountChange={(inputAmount) => setAmount(inputAmount)} 
                          />
                      </div>
                      <div className="relative w-full h-0.5">
                          <button
                              type="button"
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                              onClick={swap}
                          >
                              swap
                          </button>
                      </div>
                      <div className="w-full mt-1 mb-4">
                          <InputBox
                              label="To"
                              amount={convertedAmount}
                              currencyOptions={options}
                              onCurrencyChange={(currency) => setTo(currency)}
                              selectCurrency={to}
                              amountDisable
                          />
                      </div>
                      <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                          Convert {from.toUpperCase()} to {to.toUpperCase()} {}
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default App; // Added semicolon