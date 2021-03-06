import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: AngularFireList<any>;
  products: Observable<any[]>;
  prod: any;

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    this.product = this.db.list('/products');
    this.products = this.product.snapshotChanges().pipe(
      map(res => res.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
      ));
    return this.products;
  }

  get(id) {
    this.prod = this.db.object('/products/' + id).valueChanges();
    //console.log("xxx" + this.prod.key);
    return this.prod;
  }

  update(id, product) {
    return this.db.object('/products/' + id).update(product);
  }

  delete(id) {
    return this.db.object('/products/' + id).remove();
  }
}
