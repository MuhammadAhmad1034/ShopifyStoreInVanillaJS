let categoriestable = document.getElementById("categoryTable");
let subCategoriestable = document.getElementById("subCategoryTable");
let itemtable = document.getElementById("itemTable");
let quantity = document.getElementById("quantity");
let itemInfo = document.getElementById("itemInfoFooter");
let breadCrumb = document.getElementById("breadcrumb");
var categoryId,subcategoryId,itemId;


displayCategories();






function removeBreadCrumb(count)
{
    while(breadCrumb.childElementCount>count)
        breadCrumb.removeChild(breadCrumb.lastChild);
}

function displayCategories(){
    
    categoriestable.style.display="";
    document.getElementById("mainHeading").style.display='';
    
    itemInfo.style.display='none';
    document.getElementById("itemInfo").style.display='none';

    document.getElementById("subHeading").style.display='none';
    document.getElementById("itemHeading").style.display='none';
    itemtable.style.display="none";
    subCategoriestable.style.display="none";
    //quantity.style.display="none";
    itemInfoFooter.style.display="none";
    for(var i = document.getElementById("categoryTable").rows.length; i > 1;i--)
    {
        document.getElementById("categoryTable").deleteRow(i-1);
    }
    
    for(let i=1;i<=categories.length;i++){
        var r1 = categoriestable.insertRow(i);
        var c1 = r1.insertCell(0);
        var c2 = r1.insertCell(1);
        c1.innerHTML = i;
        c2.innerHTML = categories[i-1];
    }
    removeBreadCrumb(1);

}
function displaySubCategories(){
    document.getElementById("subHeading").style.display='';
    document.getElementById("mainHeading").style.display='none';
    document.getElementById("itemHeading").style.display='none';
    itemInfo.style.display='none';
    document.getElementById("itemInfo").style.display='none';
    itemtable.style.display = "none";

    categoriestable.style.display="none";
    for(var i = document.getElementById("subCategoryTable").rows.length; i > 1;i--)
    {
            document.getElementById("subCategoryTable").deleteRow(i-1);
    }
    subCategoriestable.style.display='';
    let id = categoryId-1;
    document.getElementById("subHeading").innerHTML = categories[id];
    //categoriestable.style.display = "none";
    //subCategoriestable.style.display = "block";  
    subCategoriestable.style.display = "";
    //subCategoriestable.innerHTML += `<tr><th>Number</th><th>Name</th></tr>`;
    for(let j=0;j<subCategories[id].length;j++){
        var r1 = subCategoriestable.insertRow(j+1);
        var c1 = r1.insertCell(0);
        var c2 = r1.insertCell(1);
        c1.innerHTML = j+1;
        
        c2.innerHTML = subCategories[id][j];
    }

    //creating sub category breadcrumb
    var subCategoryBreadCrumb = document.createElement('li');
    subCategoryBreadCrumb.innerHTML = '<a href="javascript:void(0)" onclick="displaySubCategories();addSubCategoryRowHandlers();">'+categories[id]+'</a>';
    breadCrumb.appendChild(subCategoryBreadCrumb);
    
    removeBreadCrumb(2);
}

function renderItemTable(arr,count)
{
        let change = document.getElementById("change");
        var r1 = itemtable.insertRow(count);
        var c1 = r1.insertCell(0);
        var c2 = r1.insertCell(1);
        var c3 = r1.insertCell(2);
        var c4 = r1.insertCell(3);
        c1.innerHTML = count;
        c2.innerHTML = arr[1];
        c3.innerHTML = arr[2];
        if(categoryId == 1)
            c4.innerHTML = arr[3]+"/"+arr[4];
        else
            c4.innerHTML = arr[3];
        if(categoryId==3)
        {
            change.innerHTML = "Author";
        }
    
}
function displayItem(){
    //alert(subCategories[categoryId-1][subcategoryId-1]);
    subCategoriestable.style.display='none';
    itemtable.style.display = "";
    document.getElementById("itemInfo").style.display='none';
    itemInfo.style.display='none';

    document.getElementById("itemHeading").style.display='';
    document.getElementById("subHeading").style.display='none';
    // document.getElementById("categoryHeading").style.display='none';
    for(var i = document.getElementById("itemTable").rows.length; i > 1;i--)
    {
        document.getElementById("itemTable").deleteRow(i-1);
    }
    document.getElementById("itemHeading").innerHTML = subCategories[categoryId-1][subcategoryId-1];
    //itemtable.style.display="";
    let count = 1;
    if(categoryId == 1)
    {
        count=1;
        for(let i=0; i<=groceryItems.length-1;i++)
        {
            if(groceryItems[i][0] === subcategoryId-1)
            {
                renderItemTable(groceryItems[i],count);
                count = count +1;
            }
        }
        
        
    }
    else if(categoryId==2)
    {
        count=1;
        for(let i=0 ; i<=electronicsItems.length-1;i++)
        {
            if(electronicsItems[i][0] === subcategoryId-1)
            {
                renderItemTable(electronicsItems[i],count);
                count = count +1;
            }
        }
    }
    else if(categoryId==3) {
        count=1;

        for(let i=0 ; i<=booksItems.length-1;i++)
        {
            if(booksItems[i][0] === subcategoryId-1)
            {
                renderItemTable(booksItems[i],count);
                count = count+1;
            }
        }
    }
    var itemBreadCrumb = document.createElement('li');
    itemBreadCrumb.innerHTML = '<a href="javascript:void(0)" onclick="displayItem();addItemRowHandlers();">'+subCategories[categoryId-1][subcategoryId-1]+'</a>';
    breadCrumb.appendChild(itemBreadCrumb);
    removeBreadCrumb(3);
}

function displayItemInfo(itemName,itemQuantity,itemPrice){
    subCategoriestable.style.display='none';
    itemtable.style.display = "none";
    document.getElementById("itemInfo").style.display='';
    document.getElementById("itemInfo").style.color='black';
    document.getElementById("itemHeading").style.display='none';
    document.getElementById("subHeading").style.display='none';
    itemInfo.style="";
    document.getElementById("itemInfo").innerHTML = "";
    const para = document.createElement("p");
    const node = document.createTextNode("Name:"+itemName);
    para.appendChild(node);
    const para2 = document.createElement("p");
    if(categoryId==3){
        document.getElementById("quantity").style.display = "none";
        const node2 = document.createTextNode("Author:"+itemQuantity);
        para2.appendChild(node2);
    }
    else{
        const node2 = document.createTextNode("Quantity Available:"+itemQuantity);
        para2.appendChild(node2);
    }
    
    const para3 = document.createElement("p");
    const node3 = document.createTextNode("Item Price:Rs."+itemPrice);
    para3.appendChild(node3);
    let itemInfoDiv = document.getElementById("itemInfo");
    itemInfoDiv.appendChild(para);
    itemInfoDiv.appendChild(para2);
    itemInfoDiv.appendChild(para3);
    document.getElementById("quantityInput").setAttribute("max", itemQuantity);

    var itemInfoBreadCrumb = document.createElement('li');
    itemInfoBreadCrumb.innerHTML = itemName;
    breadCrumb.appendChild(itemInfoBreadCrumb);
    removeBreadCrumb(4);
}





var createCategoryClickHandler =
            function (row) {
                return function () {
                    for(var i = document.getElementById("subCategoryTable").rows.length; i > 1;i--)
                        {
                            document.getElementById("subCategoryTable").deleteRow(i-1);
                        }
                    var cell = row.getElementsByTagName("td")[0];
                    categoryId = cell.innerHTML;
                    //alert(clickedId);

                    displaySubCategories();
                    window.onload = addSubCategoryRowHandlers();
                };
            };

var createSubCategoryClickHandler =
            function (row) {
                return function () {
                    for(var i = document.getElementById("itemTable").rows.length; i > 1;i--)
                        {
                            
                            document.getElementById("itemTable").deleteRow(i-1);
                        }
                    var cell = row.getElementsByTagName("td")[0];
                    subcategoryId = cell.innerHTML;
                    displayItem();
                    addItemRowHandlers();
                    
                };
        };

var createItemClickHandler =
        function (row) {
            return function () {
                
                var cell = row.getElementsByTagName("td")[0];
                var cell2 = row.getElementsByTagName("td")[1];
                var cell3 = row.getElementsByTagName("td")[2];
                var cell4 = row.getElementsByTagName("td")[3];
                itemId = cell.innerHTML;
                let itemName =cell2.innerHTML;
                let itemQuantity =cell3.innerHTML;
                let itemPrice =cell4.innerHTML;
                displayItemInfo(itemName,itemQuantity,itemPrice);
                
            };
        };

function addCategoryRowHandlers() {
    var table = document.getElementById("categoryTable");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        currentRow.onclick = createCategoryClickHandler(currentRow);
    }    
}
function addSubCategoryRowHandlers() {
    
    var table = document.getElementById("subCategoryTable");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        currentRow.onclick = createSubCategoryClickHandler(currentRow);
    } 
    
}

function addItemRowHandlers() {
    
    var table = document.getElementById("itemTable");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        currentRow.onclick = createItemClickHandler(currentRow);
    } 
}

window.onload = addCategoryRowHandlers();
window.onload = addSubCategoryRowHandlers();
window.onload = addItemRowHandlers();

