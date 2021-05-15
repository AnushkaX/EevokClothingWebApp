import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;

  constructor(private router: Router, private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute, private db: AngularFirestore) {
    this.user$ = afAuth.authState;
  }

  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(userCredential => {
      this.newUser = user;

      userCredential.user.updateProfile({
        displayName: user.firstName + " " + user.lastName
      });

      this.insertUserData(userCredential).then(()=> {
        this.router.navigate(['/home']);
      })

    }).catch(error => {
      this.eventAuthError.next(error);
    })
  }

  insertUserData(userCredential: firebase.auth.UserCredential){
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
    })
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
    this.router.navigate(['/']);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.switchMap(user => {
      if(user) return this.userService.get(user.uid)

      return Observable.of(null);
    });

  }

} 
