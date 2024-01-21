import { validateEmail, numberWithCommas, parseToNumber } from './functions.js';



// Convert all price to comma separated values
let convertPrice = () => {
    Array.from(document.querySelectorAll('.price-value')).forEach(priceElem => {
        priceElem.innerHTML = numberWithCommas(priceElem.innerHTML);
    })
}
convertPrice();
