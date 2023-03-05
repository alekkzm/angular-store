import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  cart: Cart = { items: [] };
  itemsQuantity = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartBehaviorSubject.subscribe(cart => {
      this.cart = cart;
      this.itemsQuantity = cart.items.reduce((qty, item) => qty + item.quantity, 0);
    });
  }

  getTotal(): number {
    return this.cartService.getTotal(this.cart.items);
  }

  clearCart() {
    this.cartService.clearCart();
  }

}
