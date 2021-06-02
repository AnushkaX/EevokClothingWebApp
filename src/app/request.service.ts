import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  imageDetailList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getImageDetailsList() {
    this.imageDetailList = this.db.list("imageDetails");
  }

  insertDetails(imgDetails) {
    this.imageDetailList.push(imgDetails);
  }

}
