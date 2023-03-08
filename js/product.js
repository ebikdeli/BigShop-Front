import getCookie from './csrftoken.js';


// *** Count price discount percent ***
let plainPrice = Number(document.querySelector('#plain-price').textContent);
let endPrice = Number(document.querySelector('#end-price').textContent);
let discountPercent = ((plainPrice - endPrice) / plainPrice) * 100
document.querySelector('#discount--value').textContent = discountPercent.toFixed(0);


// *** Add the product to cart using ajax ***
let productCart = document.querySelector('#product--cart-input');

// * Functionalities to add or minus product number before sending the data to server
// Helper to add 1 to the product--cart input number
let addOne = (inputNode) => {
    if(Number(inputNode.value < 5)){
        inputNode.value = Number(inputNode.value) + 1;
    }
}
// Helper to minus 1 to the product input number
let minuseOne = (inputNode) => {
    if(Number(inputNode.value > 1)){
        inputNode.value = Number(inputNode.value) - 1;
    }
}
// Add functionality
document.querySelector('#number-up-button').addEventListener('click', e => {
    addOne(productCart);
})
// Minus functionality
document.querySelector('#number-down-button').addEventListener('click',()=>{
    minuseOne(productCart);
})

// * Send product-id and product-number to server to add products to the cart
// Helper function to send data to server
const sendProductData = async (url=new String, data=new Object) => {
    const csrftoken = getCookie('csrftoken');
    // There is a little problem with fetch and send 'bodey:json' data to server so we have used FormData to resolve the problem
    var dataBody = new FormData();
    dataBody.append("product_data", JSON.stringify(data));
    let response = await fetch(url, {
        method: 'POST',
        body: dataBody,
        credentials: 'include',
        mode: 'cors',
        headers: {
            'X-CSRFToken': csrftoken,
          },
    })
    console.log(response);
    if(response.status !== 200 || !response.status){
        return Promise.reject('اطلاعات ارسال نشد');
    }
    let jsonData = await response.json();
    return jsonData;
}
// Add event listener for the add to cart button
document.querySelector('#cart--button').addEventListener('click', e => {
    e.preventDefault();
    let productId = productCart.getAttribute('data-product-id');
    let productNumber = productCart.value;
    let productData = {product_id: productId, product_number: productNumber};
    // Invoke helper function to send data to the server
    sendProductData('http://127.0.0.1:8000/add-product-cart', productData)
    .then(data => {
        console.log(data);
    })
    .catch(errMsg => {
        console.log(errMsg);
    })
})


// * Delete product from the cart (if exists)
// Helper function to send ajax delete request to server
const deleteCartItem = async (url=new String, data=new Object) => {
    const csrftoken = getCookie('csrftoken');
    let dataJson = new FormData()
    dataJson.append('product_id', JSON.stringify(data));
    let response = await fetch(url, {
        method: 'POST',
        body: dataJson,
        credentials: 'include',
        mode: 'cors',
        headers: {
            'X-CSRFToken': csrftoken,
        }
    })
    if(response.status !== 200 || !response.ok){
        return Promise.reject('مشکلی پیش آمده');
    }
    let jsonData = await response.json();
    return jsonData;
}

let deleteButton = document.getElementById('delete-button');
let currentProductInCart = document.querySelector('[name="current-product-in-cart"]');
// If there is no product of this kind in the kart, just hide the 'Delete button'
if(Number(currentProductInCart.value) < 1){
    deleteButton.remove();
}
else{
    deleteButton.addEventListener('click', e => {
        let productId = currentProductInCart.getAttribute('data-product-id');
        // After click on the 'Delete button', if server was ok with deleting, remove the button
        deleteCartItem('http://127.0.0.1:8000/delete-product-cart', {product_id: productId})
        .then(data => {
            console.log(data);
            if(data.status == 200){
                alert('محصول از سبد خرید حذف شد');
                deleteButton.remove();
            }
        })
        .catch(err => {
            console.log(err);
        })
    })
}