import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;

  constructor(private authService: AuthService, private orderService: OrderService) {
    
    this.orders$ = authService.user$.switchMap(u => orderService.getOrderById(u.uid));
   }

  ngOnInit(): void {
  }

}
