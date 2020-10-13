import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/observable';
import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  item: any;
  x: ShoppingCart;


  constructor(private db: AngularFireDatabase) { } 

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
      map(x => new ShoppingCart(x['items']))
    );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    this.item = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).valueChanges();

    this.item.take(1).subscribe(item => {
      if (item) {
        this.item = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: item.quantity + change
        });
      }
      else this.item = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).set({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: 1
      });
    });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    console.log(cartId);
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }


  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

}
