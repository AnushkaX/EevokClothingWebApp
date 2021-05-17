import { RequestService } from './../request.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {

  selectedImage: any = null;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  constructor(private storage: AngularFireStorage) {}


  onUpload(event){
    const id = Math.random().toString(36).substring(2);
    this.selectedImage = event.target.files[0];
    console.log(event);
    this.ref = this.storage.ref(this.selectedImage.name);
    
    this.task = this.ref.put(event.target.files[0]);
  }

  upload() {

  }
  
}
