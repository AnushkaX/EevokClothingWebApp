import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  item: any;



  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    this.item = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).valueChanges();

    this.item.take(1).subscribe(item => {
      if (item) {
        this.item = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).update({ product: product, quantity: item.quantity + 1 });
      }
      else this.item = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).set({ product: product, quantity: 1 });
    });

  }

}
