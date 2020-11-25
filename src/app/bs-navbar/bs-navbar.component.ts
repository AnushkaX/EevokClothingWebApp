import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  sCIC: number;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart => {
      this.sCIC = 0;
      for ( let productId in cart.itemsMap ) {
        this.sCIC += cart.itemsMap[productId].quantity;
      }  
    });
  }

  logout() {
    this.auth.logout();
  }

}
