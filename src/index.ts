import {v4 as uuidV4} from 'uuid';

window.addEventListener('DOMContentLoaded', () => {
  main();
})

let total: number = 0;

interface Product {
  id: number,
  src: string,
  title: string,
  price: number,
  quantity: number
}

function main(): void{
  let products: Product[] = [];
  let productsBtns = document.querySelectorAll<HTMLButtonElement>('.add-to-cart');
  let priceElement = document.querySelector<HTMLSpanElement>('.price');

  productsBtns?.forEach(btn => {

    btn?.addEventListener('click', (e) => {

      let product = getProduct(e);
      products.push(product);
      renderProducts(products);
      let total = updateTotal(e);
      let price = total.toFixed(2);
      priceElement ? priceElement.textContent = price : "";

    })

  })

}
 
function updateTotal(e: Event): number{
  let currentBtn = e?.currentTarget ?? "";
  if(!(currentBtn instanceof HTMLElement)) return 0;
  let currentElement = currentBtn?.parentElement;

  let currentPrice = currentElement?.querySelector<HTMLDivElement>('.product-price')?.textContent;

  let price: string = currentPrice ?? "";
  let priceAsNumber = price ? parseFloat(price) : 0;

  total += (priceAsNumber);

  return total;
}

function renderProducts(products: Product[]){
  let containerCarts = document.querySelector<HTMLDivElement>('.product-center-cart');
  let element: HTMLElement = document.createElement("article");

  products.forEach(product => {
    let text: string = `<div class="product-img-cart" data-id="${product.id}">
                        <img src="${product.src}" alt="#">
                        </div>
                        <div class="title-cart">${product.title}</div>
                        <div class="product-price-cart">${product.price}</div>
                        <div class="product-quantity-element">
                          <input type="number" name="quantity" class="quantity" value="${product.quantity}">
                        </div>
                        <button class="remove-from-cart btn">usuń</button>`;
    
    element.classList.add("product-cart");
    element.innerHTML = text ?? "";
  })  
  
  containerCarts?.append(element);
}

function getProduct(e: Event): Product {
  let product: Product = {
    id: uuidV4(),
    src: '',
    title: '',
    price: 0,
    quantity: 1
  }
  
  let currentBtn = e?.currentTarget ?? "";
  
  if(!(currentBtn instanceof HTMLElement)) return product

  let currentElement = currentBtn?.parentElement?.parentElement
      
  let src = currentElement?.querySelector<HTMLImageElement>('.img')?.src;
  let title = currentElement?.querySelector<HTMLDivElement>('.title')?.textContent;
  let price = currentElement?.querySelector<HTMLDivElement>('.product-price')?.textContent;
  let priceAsNumber = price ? parseFloat(price) : 0;
  let quantity = 1;

  product.src = src ?? "";
  product.title = title ?? "";
  product.price = priceAsNumber;
  product.quantity = quantity ?? "";

  return product
}