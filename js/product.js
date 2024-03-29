import {addOne, minuseOne, numberWithCommas, parseToNumber} from './functions.js';
import { sendPostData } from './ajax.js';



// Convert all price to comma separated values
let convertPrice = () => {
    Array.from(document.querySelectorAll('.price-value')).forEach(priceElem => {
        priceElem.innerHTML = numberWithCommas(priceElem.innerHTML);
    })
}
convertPrice();




// Following node will be used both in 'Add to cart' and 'Delete from cart'
let deleteButton = document.getElementById('delete-button');

// *** Count price discount percent ***
let plainPrice = parseToNumber(document.querySelector('#plain-price').textContent);
let endPrice = parseToNumber(document.querySelector('#end-price').textContent);
let discountPercent = ((plainPrice - endPrice) / plainPrice) * 100
document.querySelector('#discount--value').textContent = discountPercent.toFixed(0);




// *Add the product to cart using ajax ***
let productCart = document.querySelector('#product--cart-input');

// * Functionalities to add or minus product number before sending the data to server

// Add functionality
document.querySelector('#number-up-button').addEventListener('click', e => {
    addOne(productCart);
})
// Minus functionality
document.querySelector('#number-down-button').addEventListener('click',()=>{
    minuseOne(productCart);
})




// *** Add product to the cart
// Add event listener for the add to cart button
document.querySelector('#cart--button').addEventListener('click', e => {
    e.preventDefault();
    // Send product-id and product-number to server to add products to the cart
    let productId = productCart.getAttribute('data-product-id');
    let productNumber = productCart.value;
    let productData = {product_id: productId, product_number: productNumber};
    // ! Uncomment below code in deployment in full-stack
    // Invoke helper function to send data to the server
    // sendPostData('http://127.0.0.1:8000/add-product-cart', productData)
    // .then(data => {
    //     // Add delete button if does not exist
    //     let addToCartBox = document.querySelector('.add--to--cart');
    //     let isDelete = false;
    //     Array.from(addToCartBox.children).forEach(childNode => {
    //         if(childNode.id == 'delete-button'){
    //             isDelete = true;
    //         }
    //     })
    //     if(!isDelete){
    //         addToCartBox.appendChild(deleteButton);
    //     }
    //     Swal.fire({
    //         // position: 'top-end',
    //         icon: 'success',
    //         title: 'محصول در سبد خرید ذخیره شد',
    //         showConfirmButton: false,
    //         timer: 2000
    //       })
    //     console.log(data);
    // })
    // .catch(errMsg => {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'توقف عملیات',
    //         text: errMsg,
    //         footer: '<a href="#">تماس با پشتیبانی</a>'
    //       })
    //     console.log(errMsg);
    // })
    // ! Delete below codes in full-stack deployment
    let cartItemNumber = Number(document.querySelector('.nav-cart-number').innerHTML);
    if(cartItemNumber > 4){
        Swal.fire("سبد خرید پر شده");
    }
    else{
        Swal.fire("محصول به سبد خرید اضافه شد");
        document.querySelector('.nav-cart-number').innerHTML = document.querySelector('#product--cart-input').value;
    }
    
})




// *** Delete product from the cart (if exists)
let currentProductInCart = document.querySelector('[name="current-product-in-cart"]');
// If there is no product of this kind in the kart, just hide the 'Delete button'
if(Number(currentProductInCart.value) < 1){
    deleteButton.remove();
}
else{
    deleteButton.addEventListener('click', e => {
        let productId = currentProductInCart.getAttribute('data-product-id');
        // ! Uncomment below code in deployment in full-stack
        // After click on the 'Delete button', if server was ok with deleting, remove the button
        // sendPostData('http://127.0.0.1:8000/delete-product-cart', {product_id: productId})
        // .then(data => {
        //     console.log(data);
        //     if(data.status == 200){
        //         deleteButton.remove();
        //         Swal.fire({
        //             title: 'محصول از سبد خرید حذف شد',
        //             icon: 'warning',
        //             iconHtml: '!',
        //             confirmButtonText: 'ادامه',
        //             showCloseButton: true
        //           })
        //     }
        // })
        // .catch(err => {
        //     console.log(err);
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'توقف عملیات',
        //         text: err,
        //         footer: '<a href="#">تماس با پشتیبانی</a>'
        //       })
        // })
        // ! Delete below codes in full-stack deployment
        document.querySelector('#product--cart-input').value = 1
        document.querySelector('.nav-cart-number').innerHTML = 0;
        Swal.fire("محصول از سبد خرید حذف شد");
    })
}