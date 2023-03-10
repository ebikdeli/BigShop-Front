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
let changeQuantity = (element=new Node, signal=new String, max=15, min=1) => {
    if(signal == 'up'){
        addOne(element, max);
    }
    else if(signal == 'down'){
        minuseOne(element, min);
    }
}


export {addOne, minuseOne, changeQuantity};