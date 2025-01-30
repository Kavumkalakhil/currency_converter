// script.js
const apiKey = "32fd39dc63860bfbe4966455"; // Replace with a real API key
const apiUrl = "https://v6.exchangerate-api.com/v6/" + apiKey + "/latest/USD";

async function fetchCurrencies() {
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        let currencies = Object.keys(data.conversion_rates);
        let fromCurrency = document.getElementById("fromCurrency");
        let toCurrency = document.getElementById("toCurrency");

        currencies.forEach(currency => {
            let option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = currency;

            let option2 = option1.cloneNode(true);

            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

        fromCurrency.value = "USD";
        toCurrency.value = "INR"; // Default conversion
    } catch (error) {
        console.error("Error fetching currencies:", error);
    }
}

async function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        let rate = data.conversion_rates[toCurrency] / data.conversion_rates[fromCurrency];
        let result = (amount * rate).toFixed(2);

        document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    } catch (error) {
        console.error("Error converting currency:", error);
    }
}

window.onload = fetchCurrencies;
