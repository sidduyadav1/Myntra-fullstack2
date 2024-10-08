
let itemsData;
let CONVENIENCE_FEE=99;
onload();


function onload(){
    getItemsData();
    printBagItems();
    bagSummary();
}

function getItemsData(){
    itemsData=bagItems.map(item =>{
        for(let i=0;i<items.length;i++){
            if(items[i].id==item){
               
                return items[i];
            }
        }
    });
}

function printBagItems(){

    let bagitemsElement=document.querySelector('.bag-items-container');
    let innerhtml='';
    
    
    itemsData.forEach(element => {
        innerhtml+= generateBagItems(element);
        
    }); 

    bagitemsElement.innerHTML=innerhtml;
   
}  

function removeFromCart(itemId){
  bagItems=bagItems.filter(bagItemId=>bagItemId!=itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  getItemsData();
  printBagItems();
  bagCount();
  bagSummary();
}

function generateBagItems(element){
    return `<div class="bag-item-container">
                <div class="item-left-part">
                <img class="bag-item-img" src="../${element.image}">
                </div>
                <div class="item-right-part">
                  <div class="company">${element.company}</div>
                  <div class="item-name">${element.item_name}</div>
                  <div class="price-container">
                    <span class="current-price">₹ ${element.current_price}</span>
                    <span class="original-price">₹ ${element.original_price}</span>
                    <span class="discount-percentage">(${element.discount_percentage}%)OFF</span>
                  </div>
                  <div class="return-period">
                    <span class="return-period-days">${element.return_period} days</span> return available
                  </div>
                  <div class="delivery-details">
                    Delivery by
                    <span class="delivery-details-days">${element.delivery_date}</span>
                  </div>
                </div>
    
                <div class="remove-from-cart" onclick="removeFromCart(${element.id})">X</div>
              </div>
    
        `;
}

function bagSummary(){
  let bagPayments=document.querySelector('.bag-summary');

  let totalMRP=0;
  let discount=0;
  let finalAmount=0;
  let totalItems=itemsData.length;

  itemsData.forEach(element => {
    totalMRP+=element.original_price;
    discount=+element.original_price-element.current_price;
  });
  finalAmount=totalMRP-discount+CONVENIENCE_FEE;

  bagPayments.innerHTML=`
   <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹ ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹ ${discount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹ 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹ ${finalAmount}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
        </div>
  `;
}




        
