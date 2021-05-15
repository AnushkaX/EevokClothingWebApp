import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(private router: Router, private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute, private db: AngularFireDatabase) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
    this.router.navigate(['/']);
  }

  getUserState() {
    return this.afAuth.authState;
  }

  signin(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      this.eventAuthError.next(error);
    }).then((userCredential) => {
      if(userCredential){
        this.router.navigate(['/']);
      }
    });
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

  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(userCredential => {
      this.newUser = user;
      userCredential.user.updateProfile({
        displayName: user.firstName + " " + user.lastName
      });

      this.insertUserData(userCredential)
      .then(() => {
        this.router.navigate(['/']);
      });
    }).catch(error => {
      this.eventAuthError.next(error);
    })
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    console.log("came here");
    return this.db.object('/users/' + userCredential.user.uid).update({
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      name: this.newUser.firstName + " " + this.newUser.lastName,
      email: this.newUser.email,
      role: 'user'
    });
  }

} 
