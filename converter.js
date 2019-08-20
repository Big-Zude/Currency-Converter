//exchange Rates:http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1
//rest countries:https://restcountries.eu/rest/v2/currency/{currency}
//apikey:5c3bd933236a15766310c6853bcebecb

const axios=require('axios')
const getExchangeRate = async (fromCurrency, toCurrency)=>{
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1');
    const rate=response.data.rates
    const euro=1/rate[fromCurrency]
    const exchangeRate=euro*rate[toCurrency]
    if(isNaN(exchangeRate)){
            throw new Error(`unable to get currency ${fromCurrency}`)
    }
    return exchangeRate
}

const getCountries=async(toCurrency)=>{
    const response =await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)
    return response.data.map(country=>country.name);
}

const convertCurrency=async(fromCurrency,toCurrency,amount)=>{
    const exchangeRate= await getExchangeRate(fromCurrency,toCurrency)
    const countries=await getCountries(toCurrency)
    const convertedAmount= (amount*exchangeRate).toFixed(2)
    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
}

convertCurrency('USD','GBP',30)
    .then((message)=>{
        console.log(message)
    }).catch((error)=>{
        console.log(error.message)
    })