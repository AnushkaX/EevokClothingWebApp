import { Router } from '@angular/router';
import { Order } from './../models/order';
import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  
  shipping:any = {};
  cart: ShoppingCart;
  cartSubscription: Subscription;
  cart$;
  sCIC: number;
  userId: string;
  userSubscription: Subscription;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) { 

  }
  
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cart$ = cart$;
    this.cartSubscription = cart$.subscribe(cart => {
      this.cart = cart
      this.sCIC = 0;
        for ( let productId in cart.itemsMap ) {
         this.sCIC += cart.itemsMap[productId].quantity;
       }  
    });
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  } 
  
  async placeOrder() {

    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['order-success', result.key]);

  }    
}
