function getProductIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  return productId;
}

function getProduct() {
  const arr = JSON.parse(localStorage.getItem("listProduct"));
  const id = getProductIdFromURL();
  const data = arr.filter((item) => item.id == id);
  console.log(data);
  return data;
}

var thumbnail1 = document.getElementById("thumbnail1");
var thumbnail2 = document.getElementById("thumbnail2");
var thumbnail3 = document.getElementById("thumbnail3");
var mainImg = document.getElementById("main-img");
var nameP = document.getElementById("name");
var price = document.getElementById("price");

const list = [thumbnail1, thumbnail2, thumbnail3];
list.map((item) =>
  item.addEventListener("click", function () {
    mainImg.src = item.src;
    list.forEach(function (element) {
      if (element !== item) {
        element.classList.remove("chooseThumbnail");
      }
    });
    item.classList.add("chooseThumbnail");
  })
);

function setData() {
  const data = getProduct();
  thumbnail1.src = data[0].image1;
  thumbnail2.src = data[0].image2;
  thumbnail3.src = data[0].image3;

  mainImg.src = data[0].image1;
  nameP.innerHTML = data[0].name;
  price.innerHTML = data[0].price;
}

let cart = document.getElementById("bag-quantity");
function getQuantityCart() {
  const value = JSON.parse(localStorage.getItem("order"));
  if (value == null) {
    cart.innerHTML = 0;
  } else {
    cart.innerHTML = value.length;
  }
}

let cartUser = document.getElementById("cart");
let modalCart = document.getElementById("modal-cart");
let closeModalCart = document.getElementById("closeModalCart");
cartUser.addEventListener("click", function (e) {
  const data = JSON.parse(localStorage.getItem("order"));
  console.log(data);
  const element = loadCart();
  document.getElementById("cart-wrapper-item").appendChild(element);
  modalCart.classList.add("openModalCart");
  loadTotalPrice();
});
closeModalCart.addEventListener("click", function (e) {
  modalCart.classList.remove("openModalCart");
});
function loadCart() {
  const container = document.createElement("div");
  const data = JSON.parse(localStorage.getItem("order"));
  if (data == null) return container;
  data.forEach((product) => {
    const productElement = document.createElement("div");
    const info = document.createElement("div");
    info.style = "margin-right: 30px !important";
    productElement.style = "display:flex;align-items:center";

    const name = document.createElement("p");
    name.innerHTML = product.name;

    const img = document.createElement("img");
    img.style =
      "border: 1px solid #ccc;width:100px;margin-right:30px !important";
    img.src = product.image1;
    const price = document.createElement("p");
    price.innerHTML = product.price + "đ";
    price.style = "font-weight:bold";

    const deleteBtn = document.createElement("div");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.style = "cursor:pointer;color:red";
    deleteBtn.id = "deleteBtn";
    deleteBtn.addEventListener("click", function () {
      const newData = data.filter((i) => i.id !== product.id);
      localStorage.setItem("order", JSON.stringify(newData));
      const parentElement = document.getElementById("cart-wrapper-item");
      const element = loadCart();

      while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
      }

      parentElement.appendChild(element);
      getQuantityCart();
      loadTotalPrice();
    });
    info.appendChild(name);
    info.appendChild(price);

    productElement.appendChild(img);
    productElement.appendChild(info);
    productElement.appendChild(deleteBtn);

    container.appendChild(productElement);
  });
  return container;
}

function loadTotalPrice() {
  var totalPrice = document.getElementById("totalPrice");
  const data = JSON.parse(localStorage.getItem("order"));
  var sum = 0;
  data.forEach((i) => {
    sum += i.price;
  });
  totalPrice.innerHTML = sum;
}

var btn = document.getElementById("btnAdd");
btn.addEventListener("click", function (e) {
  e.preventDefault();
  const data = JSON.parse(localStorage.getItem("order"));
  const product = getProduct();
  console.log(product[0]);
  if (data == null) {
    localStorage.setItem("order", JSON.stringify([product[0]]));
  } else {
    data.push(product[0]);
    localStorage.setItem("order", JSON.stringify(data));
  }
  alert("Đã thêm vào giỏ hàng");
  getQuantityCart();
});

let btnSearch = document.getElementById("searchBtn");
let modalSearch = document.getElementById("modal-search");
let closeModalSearch = document.getElementById("closeModalSearch");
btnSearch.addEventListener("click", function () {
  console.log("ok");
  modalSearch.classList.add("openModalCart");
});
closeModalSearch.addEventListener("click", function (e) {
  modalSearch.classList.remove("openModalCart");
});

let inputValue = document.getElementById("inputSearch");
function searchProduct(keyword) {
  const productList = JSON.parse(localStorage.getItem("listProduct"));

  const searchResults = [];

  if (keyword == "") {
    return [];
  }
  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];
    const productName = product.name.toLowerCase();

    if (productName.includes(keyword.toLowerCase())) {
      searchResults.push(product);
    }
  }

  return searchResults;
}

inputValue.addEventListener("change", function () {
  let key = inputValue.value;
  const data = searchProduct(key);
  const container = document.createElement("div");
  data.forEach((item) => {
    const productElement = document.createElement("div");
    const nameProduct = document.createElement("p");
    nameProduct.innerHTML = item.name;
    productElement.appendChild(nameProduct);
    container.appendChild(productElement);
  });
  let list = document.getElementById("listSearch");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  list.appendChild(container);
});
document.getElementById("buy").addEventListener("click", function () {
  const data = JSON.parse(localStorage.getItem("order"));
  if (localStorage.getItem("orderCart") == null) {
    let orderCart = [];
    orderCart.push(data);
    localStorage.setItem("orderCart", JSON.stringify(orderCart));
  } else {
    const orderCart = JSON.parse(localStorage.getItem("orderCart"));
    orderCart.push(data);
    localStorage.setItem("orderCart", JSON.stringify(orderCart));
  }
  localStorage.setItem("order", JSON.stringify([]));
  window.location.reload();
});
document.getElementById("user").addEventListener("click", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    window.open("../LoginAndRegister/Login.html", "_top");
  } else {
    window.open("../User/user.html", "_top");
  }
});
setData();
getQuantityCart();
