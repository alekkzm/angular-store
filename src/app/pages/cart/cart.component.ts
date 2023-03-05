import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cart: Cart = {
    items: []
  };

  dataSource: CartItem[] = [];

  displayColumns = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cartService.cartBehaviorSubject.subscribe(cart => {
      this.cart = cart;
      this.dataSource = this.cart.items;
    });

  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem) {
    this.cartService.addQuantity(item);
  }

  onRemoveQuantity(item: CartItem) {
    this.cartService.removeQuantity(item);
  }

  onCheckout() {
    this.http.post(`${environment.serverUrl}/create-checkout-session`, this.cart.items)
      .subscribe(async (session: any) => {
        const stripe = await loadStripe('pk_test_51MiIxgLf31LEiy66hJDfhkr6ghxsPb3Xj3HQBLXJMrnM9YeEkY443KWh9s5xAMpJGNsAajtiwpqwoWxPKgM3DSaz00Ancbd1XG');
        stripe?.redirectToCheckout({
          sessionId: session.id
        });
      });
  }

}
