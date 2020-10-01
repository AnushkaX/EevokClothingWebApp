import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  cat: AngularFireList<any>;
  categories: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    this.cat = this.db.list('/categories');
    this.categories = this.cat.snapshotChanges().pipe(
      map(res => res.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
      ));
    return this.categories;
  }

}
