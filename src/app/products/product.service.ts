import { Injectable } from '@angular/core';
import { PRODUCTS } from './mock-products';
import { CATEGORIES } from './mock-categories';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts() {
    return PRODUCTS;
  }

  getCategories() {
    return CATEGORIES;
  }

  getFilteredProducts(categories: string[]) {
    let products = [];
    let allProducts = this.getProducts();
    if(!categories.length)
      return allProducts;
    for(let product of allProducts) {
      let commonCategories = product.categories.filter(value => -1 !== categories.indexOf(value))
      if(commonCategories.length)
        products.push(product);
    }
    return products;
  }
}
