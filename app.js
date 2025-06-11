//? Assigning API to the variables
const flags_url = "https://flagsapi.com/AD/flat/64.png";
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

//? Assigning html select element to the variable
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const amount = document.querySelector(".amount input");
const totalRate = document.querySelector(".rate");



for (const select of dropdowns) {
    for(const currCode in countryList) {
        let options = document.createElement("option");
        options.value = currCode;
        options.innerText = currCode;
        if(select.name === "from" && currCode === "USD") {
            options.selected = "selected";
        } else if(select.name === "to" && currCode === "BDT") {
            options.selected = "selected";
        }
        select.append(options)
    }
    select.addEventListener("change", (evt) => {
        getFlag(evt.target);
    })
}

const getFlag = (parameter) => {
    let currencyCode = parameter.value; //? This is the currency code, the code is = BDT
    let countryCode = countryList[currencyCode]; //? countryCode is just for showing flag's image, the code is = BD
    let url = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = parameter.parentElement.querySelector("img");
    img.src = url;
}

const getExchangeRate = async () => {
    let amountVal = amount.value;
    if(amountVal === "" || amountVal < 0) {
        amount.value = 1;
    }

    let API_URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    const icon = document.querySelector(".icon");
    icon.classList.add("play-animation");
    icon.classList.remove("stop-animation");
    let response = await fetch(API_URL);
    let get = await response.json();
    icon.classList.add("stop-animation");
    icon.classList.remove("play-animation");
    let rate = get[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    let totalAmount = rate * amountVal;
    totalRate.innerText = `${amountVal} ${fromCurr.value} = ${totalAmount} ${toCurr.value}`;
}


button.addEventListener("click", (evt) => {
    evt.preventDefault();
    getExchangeRate();
})

//? this event is for default value is getExchangeRate()
window.addEventListener("load", () => {
    getExchangeRate();
})

function rout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Success");
        }, 3000);
    })
}



