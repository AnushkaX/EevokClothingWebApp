import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authError: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    });
  }
  
  login() {
    this.auth.login();
  }

  signin(form) {
    this.auth.signin(form.value.email, form.value.password);
  }

}
