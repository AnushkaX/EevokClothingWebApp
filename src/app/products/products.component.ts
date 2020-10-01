import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    products$;
    categories$;

  constructor(productService: ProductService, categoryService : CategoryService) { 
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getCategories();
   }

  ngOnInit(): void {
  }

}
