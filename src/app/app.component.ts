import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private auth: AuthService, router: Router, private facebookService: FacebookService) {
    auth.user$.subscribe(user => {
      if (user) return;

      userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);

    });
  }
  ngOnInit(): void {
    this.initFacebookService();
  }

  private initFacebookService(): void {
    const initParams: InitParams = { xfbml:true, version:'v3.2'};
    this.facebookService.init(initParams);
  }
}
