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
  downloadURL: any;

  constructor(private storage: AngularFireStorage) {}


  onUpload(event){
    const id = Math.random().toString(36).substring(2);
    this.selectedImage = event.target.files[0];
  }

  upload(form) {
    this.ref = this.storage.ref(this.selectedImage.name);
    var name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.ref.put(this.selectedImage).snapshotChanges().pipe(
      finalize(()=> {
        fileRef.getDownloadURL().subscribe((url)=>{
          console.log(url);
          this.downloadURL = url;
        })
      })
    ).subscribe();
    
  }
  
}
