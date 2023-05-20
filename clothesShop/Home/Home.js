import data from "./list.js";

function MyComponent() {
  const container = document.createElement("div");
  localStorage.setItem("listProduct", JSON.stringify(data));
  const arr = JSON.parse(localStorage.getItem("listProduct"));
  arr.forEach((product) => {
    const link = document.createElement("a");
    link.href = `../DetailProduct/DetailProduct.html?id=${product.id}`;

    const productElement = document.createElement("div");
    productElement.classList.add("card");

    const titleElement = document.createElement("h5");
    titleElement.textContent = product.name;
    titleElement.style.fontSize = "13px";

    const imgElement = document.createElement("img");
    imgElement.src = product.image1;
    imgElement.alt = "anh";

    const priceElement = document.createElement("p");
    priceElement.textContent = `
      ${product.price.toLocaleString()}
    đ`;
    priceElement.style.fontWeight = "bold";

    productElement.appendChild(imgElement);
    productElement.appendChild(titleElement);
    productElement.appendChild(priceElement);

    link.appendChild(productElement);

    container.appendChild(link);
  });

  return container;
}

const element = MyComponent();
document.getElementById("products").appendChild(element);

function addFlashSale() {
  const arr = JSON.parse(localStorage.getItem("listProduct"));
  const container = document.createElement("div");
  for (let i = 0; i < 4; i++) {
    console.log(arr[i].name);
    const link = document.createElement("a");
    link.href = `../DetailProduct/DetailProduct.html?id=${arr[i].id}`;

    const productElement = document.createElement("div");
    productElement.classList.add("card");

    const titleElement = document.createElement("h5");
    titleElement.textContent = arr[i].name;
    titleElement.style.fontSize = "13px";

    const imgElement = document.createElement("img");
    imgElement.src = arr[i].image1;
    imgElement.alt = "anh";

    const priceElement = document.createElement("p");
    priceElement.textContent = `
      ${arr[i].price.toLocaleString()}
    đ`;
    priceElement.style.fontWeight = "bold";

    productElement.appendChild(imgElement);
    productElement.appendChild(titleElement);
    productElement.appendChild(priceElement);

    link.appendChild(productElement);

    container.appendChild(link);
  }
  return container;
}
const element2 = addFlashSale();
document.getElementById("listFlashSale").appendChild(element2);
