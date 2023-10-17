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
      let productsCart = document.querySelectorAll<HTMLElement>('.product-cart');
      let currentBtn = e.currentTarget;
      if(!(currentBtn instanceof HTMLElement)) return;

      let currentElement = currentBtn?.parentElement?.parentElement;
      let currentElementID = currentElement?.dataset?.id;
        
      productsCart.forEach(quantity => {
        let quantityID = quantity.dataset.id;
        if(quantityID == currentElementID) {
          // Skrypt w tym momencie będzie blokował dodanie kolejnego tego samego elementu i zamiast tego będzie 
          // zwiększać ilość tego produktu w koszyku jeżeli już się tam znajduje
        }
      })

      let product = getProduct(e);
      products.push(product);
      renderProducts(products);
      updateTotal();
    })
  })
}

function deleteFromCart(product: HTMLElement): void{
  if(!(product instanceof HTMLElement)) return
  let removeBtn = product?.querySelector<HTMLButtonElement>('.remove-from-cart');
  removeBtn?.addEventListener('click', (e) => {
    let currentBtn = e?.currentTarget;
    if(!(currentBtn instanceof HTMLElement)) return;

    let currentElement = currentBtn?.parentElement;

    currentElement?.remove();
    updateTotal()
  })
}

function quantityChange(): void{
  let quantityElement = document.querySelectorAll<HTMLInputElement>('.quantity');
  quantityElement.forEach(quantity => {
    quantity?.removeEventListener("change", updateTotal)
    quantity?.addEventListener("change", updateTotal)
  })
}
 
function updateTotal(): void{
  let priceElement = document.querySelector<HTMLSpanElement>('.price');
  let products = document.querySelectorAll<HTMLElement>('.product-cart');
  let total: number = 0;
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
  console.log(showPrice)
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
                          <input type="number" name="quantity" class="quantity" value="${product.quantity}" min="1">
                        </div>
                        <button class="remove-from-cart btn">usuń</button>`;
    
    element.classList.add("product-cart");
    element.setAttribute('data-id', product.title);
    element.innerHTML = text ?? "";
  })
  deleteFromCart(element)
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