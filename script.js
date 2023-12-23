let productsGrid = document.getElementById("products-grid");
let productsArray = [];
let xhr = new XMLHttpRequest();
let url = "https://my-json-server.typicode.com/ionco9/Shop02";

xhr.open('GET',url + '/products');
xhr.responseType = 'json';
xhr.onload = function(){
	let products = xhr.response;
	productsGrid.innerHTML = null;
	products.forEach(p=>{
		productsArray.push(p);
		let pElem = document.createElement('div');
		pElem.classList.add('product');
		pElem.innerHTML = `
				<h2 class='product-name'>${p.name}</h2>
				<img class='product-photo' src='${p.photo_url}'>
				<p class='product-description'><b>Description: </b>
				${p.description}</p>
				<button onclick="addProductToCart(${p.id})">Buy</button>`;
		productsGrid.append(pElem);
	});
}
xhr.send();

let cart = [];
let cartProd = document.getElementById('cart-products');

function openCart(){
	cartProd.classList.toggle('hide');
}

if(localStorage.getItem('cart')){
	cart = JSON.parse(localStorage.getItem('cart'));
	drawCartProducts();
}

function addProductToCart(id){
	let product = productsArray.find(function(p){
		return p.id == id
	})
	cart.push(product);
	drawCartProducts();
	localStorage.setItem("cart", JSON.stringify(cart));
}

function drawCartProducts(){
	if(cart.lenght ===0) return cartProd.innerHtml = "Cart is empty";
	cartProd.innerHTML = null;
	let sum = 0;
	cart.forEach(function(p){
		cartProd.innerHTML +=`
				<p class="text"><img class="img" src="${p.photo_url}">${p.name} |${p.price}$</p>
				<hr>
				`;
				sum +=p.price	
	})
	cartProd.innerHTML +=`
			<p class="total">Total price: ${sum}$</p>
			<button class="buy" onclick="buyAll()"333>Buy All</button>`
}

function buyAll(){
	cart = [];
	cartProd.innerHTML = "Money was withdraw from your credit card";
	localStorage.setItem("cart", '[]')
}

