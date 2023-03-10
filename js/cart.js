import {addOne, minuseOne} from './functions.js';
import {sendPostData} from './ajax.js';


// Change product quantity
const changeProductQuantity = document.querySelector('.cart--change--quantity');

changeProductQuantity.addEventListener('click', e => {
  // * Add quantity
  if(e.target.classList.contains('quantity--up')){
    // console.log('quantity up');
    Array.from(e.target.parentNode.children).forEach((elem) => {
      if(elem.nodeName == 'INPUT'){
        const data = {
          product_id: elem.getAttribute('data-product-id'), 
          quantity: Number(elem.value) + 1}
        sendPostData('http://127.0.0.1:8000/change-product-quantity-cart', data, 'مشکلی پیش آمده')
        .then(data => {
          if(data.status == '200'){
            console.log(data);
            addOne(elem, 15);
          }
        })
        .catch(err => {
          console.log(err);
        })
        
      }
    })
  }
  // * Minus quantity
  if(e.target.classList.contains('quantity--down')){
    // console.log('quantity down');
    Array.from(e.target.parentNode.children).forEach((elem) => {
      if(elem.nodeName == 'INPUT'){
        const data = {
          product_id: elem.getAttribute('data-product-id'), 
          quantity: Number(elem.value) - 1}
        sendPostData('http://127.0.0.1:8000/change-product-quantity-cart', data, 'مشکلی پیش آمده')
        .then(data => {
          if(data.status == '200'){
            console.log(data);
            minuseOne(elem);
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    })
  }
})


// * Delete Item


/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00; 
var fadeTime = 300;


/* Assign actions */
$('.cart--product-quantity input').change( function() {
  updateQuantity(this);
});

$('.cart--product-removal button').click( function() {
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;
  
  /* Sum up row totals */
  $('.cart--product').each(function () {
    subtotal += parseFloat($(this).children('.cart--product-line-price').text());
  });
  
  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax + shipping;
  
  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-tax').html(tax.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
    }else{
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.cart--product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;
  /* Update line price display and recalc cart totals */
  productRow.children('.cart--product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });  
}

/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}