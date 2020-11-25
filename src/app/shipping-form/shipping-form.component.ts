import { ShoppingCart } from './../models/shopping-cart';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;

  shipping: any = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) {}

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {

    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['order-success', result.key]);

  }
}
