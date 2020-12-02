import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs/observable';
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
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[];
  category: string;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    
    this.productService
      .getAll()
      .switchMap(p => {
        this.products = p;
        return this.route.queryParamMap;
      }).subscribe(params => {
        this.category = params.get('category');

        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}