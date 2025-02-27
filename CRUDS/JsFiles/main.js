let title = document.getElementById('title');

let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');

let total = document.getElementById('total');

let count = document.getElementById('count');
let category = document.getElementById('category');

let submit = document.getElementById('submit');

let mood = 'Create';
let tmp;

// fonctions a implementer :
//get total 
//create product 
//save localstorage
//clear inputs // clean data
//read
//count
//delete + le choix du delete par rapport au count
//update
//search



//get total 

let getTotal = function() {
    if ((+price.value != '') && (+taxes.value != '') && (+ads.value != '')) {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;

    } else { total.innerHTML = '' }
}

//create product  // save localstorage

let dataPro;
if (localStorage.product != null) { dataPro = JSON.parse(localStorage.product); } // JSON.parse === kat7ewel lina mn string l object . fhmti
else { dataPro = [] }
submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    if (newPro.count == '') newPro.count = 1
    if (mood === 'Create') {
        dataPro.push(newPro);
    } else {
        dataPro[tmp] = newPro;
        mood = 'Create';
        submit.innerHTML = 'Create';
        clear.onclick();
    }
    localStorage.setItem('product', JSON.stringify(dataPro)); // JSON.stringify === kat7ewel lina mn object l string . fhmti

    showData()
}

//clear inputs //clean data

clear.onclick = function() {
    title.value = '',
        price.value = '',
        taxes.value = '',
        ads.value = '',
        discount.value = '',
        count.value = '',
        category.value = '',
        total.innerHTML = ''
}

//read

function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="UpdateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
}
showData()

//delete + le choix du delete par rapport au count

function deleteData(i) {
    if (dataPro[i].count == 1) dataPro.splice(i, 1)
    else {
        let Repeat = true;
        while (Repeat) {
            let nbr = prompt(`There are ${dataPro[i].count} products. How many do you want to delete?`);
            if (nbr === null) { Repeat = false; } else if (!isNaN(nbr) && nbr > 0 && nbr <= dataPro[i].count) {
                dataPro[i].count -= +nbr;
                Repeat = false;
            } else alert("Invalid input. Please enter a number between 1 and " + dataPro[i].count);
        }
        if (dataPro[i].count == 0) dataPro.splice(i, 1);
    }
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

//Update

function UpdateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    count.value = dataPro[i].count;
    category.value = dataPro[i].category;
    getTotal();
    submit.innerHTML = 'Update';
    mood = 'Update';
    tmp = i;
    scroll({ top: 0, behavior: "smooth" })
}

//search

let searchMood = 'title';

function getsearchMood(id) {
    let search = document.getElementById('search');
    search.focus();
    if (id == 'searchTitle') {
        searchMood = 'title'
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="UpdateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`;
            }
        } else if (dataPro[i].category.includes(value.toLowerCase())) {
            table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="UpdateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`;
        }
        document.getElementById('tbody').innerHTML = table;
    }
}

// limit data and force data