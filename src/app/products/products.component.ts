import { ShoppingCartService } from './../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from './../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[];
  category: string;
  cart: any;
  subscription: Subscription


  constructor(route: ActivatedRoute, productService: ProductService, private shoppingCartService: ShoppingCartService) {

    

    productService
      .getAll()
      .switchMap(p => {
        this.products = p;
        return route.queryParamMap;
      }).subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

async ngOnInit() {
  this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => {
    this.cart = cart;
  });
}



}