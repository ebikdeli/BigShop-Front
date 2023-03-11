// Helper to add 1 to the product--cart input number
let addOne = (inputNode, max=5) => {
    if(Number(inputNode.value < max)){
        inputNode.value = Number(inputNode.value) + 1;
    }
}
// Helper to minus 1 to the product input number
let minuseOne = (inputNode, min=1) => {
    if(Number(inputNode.value > min)){
        inputNode.value = Number(inputNode.value) - 1;
    }
}


// Change product quantity
let checkCartQuantity = (nodeValue=new Node, emptyCartElem=new Node, fullCartElem) => {
    let value = Number(nodeValue.innerText);
    if(value > 0){
        emptyCartElem.classList.add('d-none');
    }
    else{
        fullCartElem.remove();
        emptyCartElem.classList.remove('d-none');
    }
}


export {addOne, minuseOne, checkCartQuantity};