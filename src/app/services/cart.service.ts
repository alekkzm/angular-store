import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartBehaviorSubject = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackbar: MatSnackBar) { }

  addToCart(product: Product): void {
    const items = [...this.cartBehaviorSubject.value.items];
    const productInCart = items.find(_item => _item.id === product.id);
    if (productInCart) productInCart.quantity++;
    else items.push({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
    this.cartBehaviorSubject.next({ items });
    this._snackbar.open('1 item added to cart.', 'Ok', { duration: 3000 });
    // console.log(this.cartBehaviorSubject.value);
  }

  getTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  clearCart(): void {
    this.cartBehaviorSubject.next({ items: [] });
    this._snackbar.open('Cart is cleared.', 'Ok', { duration: 3000 });
  }

  removeFromCart(item: CartItem): void {
    this.cartBehaviorSubject.next({
      items: [...this.cartBehaviorSubject.value.items.filter(_item => _item !== item)]
    });
    this._snackbar.open(`${item.name} removed from cart.`, 'Ok', { duration: 3000 });
  }

  addQuantity(item: CartItem, qty: number = 1): void {
    item.quantity += qty;
    this.cartBehaviorSubject.next({
      items: [...this.cartBehaviorSubject.value.items]
    });
  }

  removeQuantity(item: CartItem, qty: number = 1): void {
    item.quantity -= qty;
    if (item.quantity === 0) return this.removeFromCart(item);
    this.cartBehaviorSubject.next({
      items: [...this.cartBehaviorSubject.value.items]
    });
  }
}
