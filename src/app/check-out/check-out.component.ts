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
  subscription: Subscription;
  cart$;
  sCIC: number;
  
  constructor(
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) { 

  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cart$ = cart$;
    this.subscription = cart$.subscribe(cart => {
      this.cart = cart
      this.sCIC = 0;
        for ( let productId in cart.itemsMap ) {
         this.sCIC += cart.itemsMap[productId].quantity;
       }  
    })
  } 
  
  placeOrder() {
    let order = {
      datePlaced : new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    };

    this.orderService.storeOrder(order);
  }    
}
