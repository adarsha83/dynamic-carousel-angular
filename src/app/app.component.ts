import { Component, OnInit } from '@angular/core';
import { Product }        from './products/product';
import { ProductService } from './products/product.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'carousel-app';
  products: Product[];
  viewPortProducts: Product[];
  viewPortSize: number;
  currentStartingIndex: number;
  categories: string[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryFilters: string[];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.categories = this.productService.getCategories();
    this.categoryFilters = [];
    this.currentStartingIndex = 0;
    this.viewPortSize = 3;
    this.viewPortProducts = this.products.slice(this.currentStartingIndex, this.currentStartingIndex + this.viewPortSize);
  }

  previousProducts() {
    this.currentStartingIndex -= this.viewPortSize;
    if(this.currentStartingIndex >= 0) {
      this.viewPortProducts = this.products.slice(this.currentStartingIndex, this.currentStartingIndex + this.viewPortSize);
    }
  }

  nextProducts() {
    this.currentStartingIndex += this.viewPortSize;
    if(this.currentStartingIndex < this.products.length) {
      this.viewPortProducts = this.products.slice(this.currentStartingIndex, this.currentStartingIndex + this.viewPortSize);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our category
    if ((value || '').trim()) {
      this.categoryFilters.push(value.trim());
    }

    // Update product data
    this.products = this.productService.getFilteredProducts(this.categoryFilters);
    this.currentStartingIndex = 0;
    this.viewPortProducts = this.products.slice(this.currentStartingIndex, this.currentStartingIndex + this.viewPortSize);

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(category: string): void {
    const index = this.categoryFilters.indexOf(category);

    if (index >= 0) {
      this.categoryFilters.splice(index, 1);
    }

    // Update product data
    this.products = this.productService.getFilteredProducts(this.categoryFilters);
    this.currentStartingIndex = 0;
    this.viewPortProducts = this.products.slice(this.currentStartingIndex, this.currentStartingIndex + this.viewPortSize);
  }

  clearFilters() {
    this.categoryFilters = [];
    this.products = this.productService.getFilteredProducts(this.categoryFilters);
    this.currentStartingIndex = 0;
    this.viewPortProducts = this.products.slice(this.currentStartingIndex, this.currentStartingIndex + this.viewPortSize);
  }
}
