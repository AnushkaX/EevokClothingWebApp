import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) this.productService.get(id).subscribe(p => {this.product = p});
    console.log(Object.keys(this.product).length);
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
