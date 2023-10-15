import {v4 as uuidV4} from 'uuid';

window.addEventListener('DOMContentLoaded', () => {
  main();
})

interface Product {
  id: string,
  src: string,
  title: string,
  price: number,
  quantity: number
}

function main(): void{
  let products: Product[] = [];
  let productsBtns = document.querySelectorAll<HTMLButtonElement>('.add-to-cart');

  productsBtns?.forEach(btn => {

    btn?.addEventListener('click', (e) => {

      let product = getProduct(e);
      products.push(product);
      renderProducts(products);
      updateTotal();
    

    })

  })

}

function quantityChange(): void{
  let quantityElement = document.querySelectorAll<HTMLInputElement>('.quantity');
  quantityElement.forEach(quantity => {
   quantity?.removeEventListener("change", updateTotal)
   quantity?.addEventListener("change", (e) => {
    let quantityNumber = quantity.value ? parseInt(quantity.value) : 0
    if(quantityNumber <= 0){
      if(!(e.currentTarget instanceof HTMLElement)) return quantity 
      let currentElement = e?.currentTarget?.parentElement?.parentElement;
      currentElement?.remove();
    }
    updateTotal()
  })
  })
}
 
function updateTotal(): void{
  let priceElement = document.querySelector<HTMLSpanElement>('.price');
  let total: number = 0;
  let products = document.querySelectorAll<HTMLElement>('.product-cart');
  let price: number = 0;
  let quantity: number = 0;
  products.forEach(product => {
    let productPrice = product?.querySelector<HTMLDivElement>('.product-price-cart')?.textContent;
    let quantityElement = product?.querySelector<HTMLInputElement>('.quantity')?.value;
    quantity = quantityElement ? parseFloat(quantityElement) : 0;
    price = productPrice ? parseFloat(productPrice) : 0;
    total += (price * quantity);
  }) 
  quantityChange();
  let showPrice = total.toFixed(2);
  priceElement ? priceElement.textContent = showPrice : "";
}

function renderProducts(products: Product[]){
  let containerCarts = document.querySelector<HTMLDivElement>('.product-center-cart');
  let element: HTMLElement = document.createElement("article");

  products.forEach(product => {
    let text: string = `<div class="product-img-cart">
                        <img src="${product.src}" alt="#">
                        </div>
                        <div class="title-cart">${product.title}</div>
                        <div class="product-price-cart">${product.price}</div>
                        <div class="product-quantity-element">
                          <input type="number" name="quantity" class="quantity" value="${product.quantity}">
                        </div>
                        <button class="remove-from-cart btn">usuń</button>`;
    
    element.classList.add("product-cart");
    element.setAttribute('data-id', product.id);
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