let bagItems;

onload();

function onload(){
DisplayItemsHomePage();
let str=localStorage.getItem('bagItems');
bagItems=str?JSON.parse(str):[];
bagCount();
}


function DisplayItemsHomePage(){
    let containerElement= document.querySelector('.items-container');

    if(!containerElement){
        return;
    }

    let innerHtml='';
    items.forEach(item =>{
        innerHtml+=
       `<div class="item-container">
        <img src=${item.image} alt="item image" class="item">
        <div class="ratings">${item.rating.stars} ⭐| ${item.rating.count}</div>
        <div class="brand">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="current-price">${item.current_price}
            <span class="original-price">${item.original_price}</span>
            <span class="offer">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="bag-button" onclick="addBagItems(${item.id})">Add to bag</button>
    </div>`
    });
    containerElement.innerHTML=innerHtml;
    
}

function addBagItems(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    bagCount();
}

function bagCount(){
    let bagCountElement=document.querySelector('.bagCount');
    if(bagItems.length>=1){
        bagCountElement.style.visibility='visible';
        bagCountElement.innerText=bagItems.length;
    }
    else{
        bagCountElement.style.visibility='hidden';
    }  
}



