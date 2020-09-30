import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';
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
  user$: Observable<firebase.User>

  constructor(private router: Router, private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
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
