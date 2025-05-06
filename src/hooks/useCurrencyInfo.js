import { useEffect, useState } from "react";

function useCurrencyInfo(currency){
    const [data, setData] = useState({});

    useEffect(() => {
        // Construct the correct API URL using the base currency parameter
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((res) => {
            if (!res.ok) {
                // Basic error handling
                console.error(`HTTP error! status: ${res.status}`);
                setData({}); // Clear data on error
                return {}; // Return empty object to prevent further processing errors
            }
            return res.json();
        })
        .then((res) => {
            // The response structure for this endpoint is like:
            // { "date": "...", "usd": { "aed": ..., "afn": ..., ... } }
            // We need the nested object containing the rates from the base currency
            setData(res[currency]); 
        })
        .catch(error => {
            console.error("Error fetching currency data:", error);
            setData({}); // Clear data on fetch error
        });

    }, [currency]); // The effect should re-run whenever the base currency changes

    return data; // This data object will contain rates like { "inr": 83, "eur": 0.92, ... }
}

export default useCurrencyInfo;
