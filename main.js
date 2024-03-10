let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let Brand = document.getElementById('Brand')
let btn = document.getElementById('btn')


let temp;
let mood = 'create'

function GetTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
         - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green'
    }else{
        total.style.background = '#e30e0e'
    }
}

let datapius;
if(localStorage.proudct != null){
    datapius = JSON.parse(localStorage.proudct)
}else{
    datapius = [];
}
 
btn.onclick = function()
{
    let newItem = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        Brand:Brand.value.toLowerCase(),
    }
    if(title.value != '' && price.value != '' && Brand.value != '' && newItem.count <= 100){
        if(mood === 'create')
    {
        if(newItem.count > 1){
            for (let i = 0; i < newItem.count; i++) {
                datapius.push(newItem); 
            }
        }else{
            datapius.push(newItem);
        }
    }else{
        datapius[temp] = newItem;
        mood = 'create';
        btn.innerHTML = 'Create';
        count.style.display = 'block'
    }

    ClearData()

    }
    

    localStorage.setItem('proudct', JSON.stringify(datapius))
    ShowData()
    
}


function ClearData()
{
    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    Brand.value = '';
    count.value = '';
    total.innerHTML = '';
    discount.value = '';
    search.placeholder = 'Search';

}

ShowData()
function ShowData()
{
    GetTotal()
    let table = '';
    for(let i =0; i <datapius.length;i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${datapius[i].title}</td>
                <td>${datapius[i].price}</td>
                <td>${datapius[i].taxes}</td>
                <td>${datapius[i].ads}</td>
                <td>${datapius[i].discount}</td>
                <td>${datapius[i].total}</td>
                <td>${datapius[i].Brand}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnD = document.getElementById('clear')
    let btnDelete = document.getElementById('deleteAll');
    if(datapius.length > 0){
        btnDelete.innerHTML = `
        <button onclick ="DeleteAll()">Delete All(${datapius.length})</button>
        `
    }else{
       btnDelete.innerHTML = ''; 
    }
    
}

function deleteData(i)
{
  datapius.splice(i,1);
  localStorage.proudct = JSON.stringify(datapius);
  ShowData()

}

function updateData(i)
{
    title.value = datapius[i].title;
    price.value = datapius[i].price; 
    taxes.value = datapius[i].taxes;    
    ads.value = datapius[i].ads;    
    discount.value = datapius[i].discount;    
    count.value = datapius[i].count;    
    Brand.value = datapius[i].Brand; 
    count.style.display = 'none'   
    GetTotal()  
    btn.innerHTML = 'Update'
    mood = 'update'
    temp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}


function DeleteAll() 
{
    localStorage.clear();
    datapius.splice(0)
    ShowData()
    

}

let searchMood = 'title';

function getSearch(id)
{
    let search = document.getElementById('search');
    if(id == 'btn1'){
        searchMood = 'Title';
    }else{
        searchMood = 'Brand';  
    }
    search.placeholder = 'Search By '+ searchMood; 

    search.focus();
    search.value = '';
    ShowData()

}

function SearchData(value)
{
    let table = '';
    for (let i = 0; i < datapius.length; i++){
        
        if( searchMood == 'title'){
        
         
            if(datapius[i].title.includes(value.toLowerCase())){

                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapius[i].title}</td>
                    <td>${datapius[i].price}</td>
                    <td>${datapius[i].taxes}</td>
                    <td>${datapius[i].ads}</td>
                    <td>${datapius[i].discount}</td>
                    <td>${datapius[i].total}</td>
                    <td>${datapius[i].Brand}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
            `;

            }         
        
    }

    else{

        
            if(datapius[i].Brand.includes(value)){

                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapius[i].title}</td>
                    <td>${datapius[i].price}</td>
                    <td>${datapius[i].taxes}</td>
                    <td>${datapius[i].ads}</td>
                    <td>${datapius[i].discount}</td>
                    <td>${datapius[i].total}</td>
                    <td>${datapius[i].Brand}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
            `;

            }         
        

    }

    }

    

    document.getElementById('tbody').innerHTML = table;

}










