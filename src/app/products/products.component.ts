import { Subscription } from 'rxjs/Subscription';
import { CategoryService } from './../category.service';
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
  categories$;
  subscription: Subscription;
  category: string;


  constructor(route: ActivatedRoute, productService: ProductService, categoryService: CategoryService) {

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

    this.categories$ = categoryService.getCategories();

  }

ngOnInit(): void {
}



}
