import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [key: number]: number; } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Product[] | undefined;
  sort = 'desc';
  limit = 12;
  productsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
  }

  getProducts() {
    this.productsSubscription = this.storeService.getAllProducts(this.limit, this.sort, this.category)
      .subscribe(products => this.products = products);
  }

  onColumnsCountChange(cols: number) {
    this.cols = cols;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(category: string) {
    this.category = category;
    this.getProducts();
  }

  onAddToCart($event: Product) {
    this.cartService.addToCart($event);
  }

  onItemsShowCountChange(limit: number) {
    this.limit = limit;
    this.getProducts();
  }

  onSortChange(sort: string) {
    this.sort = sort;
    this.getProducts();
  }

}