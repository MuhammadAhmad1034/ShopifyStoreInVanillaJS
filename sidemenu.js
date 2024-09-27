const navBar = document.querySelector("nav"),
       menuBtn = document.querySelector(".bxs-cart"),
       proceedOrderBtn = document.querySelector("#btnProceedOrder");

     
menuBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
});

let totalPrice = 0.0;

let clearAllBtn = document.querySelector("#clearAllDiv");
clearAllBtn.style.display="none";
 document.getElementById("sideContentDiv").innerHTML = "Cart is Empty";
// document.getElementById("sideContentDiv").style.textAlign = "center";
const backBtn = document.querySelector(".bx-arrow-back");
backBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
  });


proceedOrderBtn.style.display = 'none';

 let temp=0;
     function addToCart(){
        clearAllBtn.style.display="";
        
        proceedOrderBtn.style.display = 'block';
        let cartContent = document.getElementById("sideContentDiv");
        
        if(temp==0){
            cartContent.innerHTML = "";
        }
        let quantity = document.getElementById("quantityInput").value;
        itemIdCart.push(itemId-1);
        itemQuantityCart.push(quantity);
        let count;
        if(categoryId == 1)
        {
            count=0;
            
            for(let i=0;i<groceryItems.length;i++)
            {
                if(groceryItems[i][0]==subcategoryId-1)
                {
                    count++;
                    if(count == itemId)
                    {
                        itemId=i;
                        break;
                    }
                }
            }
            
            if(groceryItems[itemId][2] >= quantity && quantity > 0)
            {
                itemQuantityCart.push(quantity);
                itemIdCart.push(itemId);
                groceryItems[itemId][2] -= quantity;
                //displayItem();
                document.getElementById("itemInfo").innerHTML = "Added to Cart Successfully<br><br><button onclick='displayCategories();addCategoryRowHandlers();' id='browseBtn'>Browse More</button>";
                itemInfo.style.display="none";
                
                var div = document.createElement("div");
                temp++;
                div.id = `div${temp}`;
                div.innerHTML ="<br>"+groceryItems[itemId][1]+"<br>Total Price: Rs."+groceryItems[itemId][3]*quantity+"<br>Quantity: "+quantity+"<img src='./delete-bin-7-fill.png' style='margin-left:100px;' onclick='deleteItem("+temp+")' ><br>----------------------";
                cartContent.appendChild(div);
                totalPrice +=groceryItems[itemId][3]*quantity;
                addItemRowHandlers();
            }
            else{
                alert("Please Select Valid Quantity.");
            }
            
        
          
        }
        else if(categoryId==2)
        {
            count=0;
            
            for(let i=0;i<electronicsItems.length;i++)
            {
                if(electronicsItems[i][0]==subcategoryId-1)
                {
                    count++;
                    if(count == itemId)
                    {
                        itemId=i;
                        break;
                    }
                }
            }
            if(electronicsItems[itemId][2] >= quantity && quantity > 0)
            {
                itemQuantityCart.push(quantity);
                itemIdCart.push(itemId);
                electronicsItems[itemId][2] -= quantity;
                //displayItem();
                document.getElementById("itemInfo").innerHTML = "Added to Cart Successfully<br><br><button onclick='displayCategories();addCategoryRowHandlers();' id='browseBtn'>Browse More</button>";
                itemInfo.style.display="none";
                var div = document.createElement("div");
                temp++;
                div.id = `div${temp}`;
                div.innerHTML ="<br>"+electronicsItems[itemId][1]+"<br>Total Price: Rs."+electronicsItems[itemId][3]*quantity+"<br> Quantity: "+quantity+"<img src='./delete-bin-7-fill.png'  style='margin-left:100px;' onclick='deleteItem("+temp+")'><br>----------------------";
                cartContent.appendChild(div);
                totalPrice += electronicsItems[itemId][3]*quantity;
                addItemRowHandlers();
            }
            else{
                    alert("Please Select Valid Quantity.");
            }
        }
        else if(categoryId==3)
        {
            count=0;
            for(let i=0;i<booksItems.length;i++)
            {
                if(booksItems[i][0] == subcategoryId-1)
                {
                    count++;
                    if(count == itemId)
                    {
                        itemId=i;
                        break;
                    }
                }
            }
            
            itemQuantityCart.push(quantity);
            itemIdCart.push(itemId);
            //displayItem();
            document.getElementById("itemInfo").innerHTML = "Added to Cart Successfully<br><br><button onclick='displayCategories();addCategoryRowHandlers();' id='browseBtn'>Browse More</button>";
            
            
            itemInfo.style.display="none";
            var div = document.createElement("div");
            temp++;
            div.id = `div${temp}`;
            div.innerHTML ="<br>"+ booksItems[itemId][1]+"<br>Total Price: Rs."+booksItems[itemId][3]+"<br>Quantity:"+1+"<img src='./delete-bin-7-fill.png'  style='margin-left:100px;' onclick='deleteItem("+temp+")'><br>----------------------";
            cartContent.appendChild(div);
            totalPrice += booksItems[itemId][3];
            addItemRowHandlers();
        }
        if(temp==1){
        var totalPriceDiv = document.createElement("div");
        totalPriceDiv.style.position = "absolute";
        totalPriceDiv.style.bottom = '70px';
        totalPriceDiv.style.left = '50px';
        totalPriceDiv.style.borderTop = "1px solid black";
        totalPriceDiv.id = 'totalPriceDiv';
        totalPriceDiv.style.textAlign = 'center';
        cartContent.appendChild(totalPriceDiv);
    }
    
        document.getElementById("totalPriceDiv").textContent = "Total Price: Rs."+totalPrice;
     }




    function confirmOrder(){
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        let orderId = Math.floor(Math.random() * 1500);
        document.getElementById("cOrderReceipt").innerHTML = `<strong>Order Placed Successfully</strong><br>Order Id: ${orderId}<br>Total Price: Rs.${totalPrice}<br><br>Thank You!`;
        span.onclick = function() {
            modal.style.display = "none";
            emptyCart();
          }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
            emptyCart();
            }
        }
        
        //document.body.innerHTML = "Order Placed Successfully!";
    }



    function emptyCart()
    {
        const myNode = document.getElementById("sideContent");
        myNode.innerHTML = 'Cart is Empty';
        clearAllBtn.style.display='none';
        totalPrice=0.0;
        window.location.reload();
    }


    function deleteItem(id)
    {
       document.getElementById(`div${id}`).remove();
       let numb = document.getElementById("sideContentDiv").childElementCount;
       if(numb<=1)
       {
            itemIdCart.splice(0,itemIdCart.length);
            itemQuantityCart.splice(0,itemQuantityCart.length);
            proceedOrderBtn.style.display = 'none';
            document.getElementById("sideContentDiv").innerHTML = "Cart is Empty";
            document.getElementById("totalPriceDiv").innerHTML ="";
       }
    }
    

    