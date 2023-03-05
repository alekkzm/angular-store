import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html'
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  @Input() product: Product | undefined; /* = {
    id: 1,
    title: 'Snickers',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eius.',
    price: 150,
    category: 'Shoes',
    image: 'https://via.placeholder.com/150'
  }; */

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

}
