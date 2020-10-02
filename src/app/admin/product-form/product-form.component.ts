import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    console.log(id);
    if (id) this.productService.get(id).subscribe(p => { this.product = p });
  }

  save(product) {

    if (this.id) {
      this.productService.update(this.id, this.product);
    }
    else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  clear() {
    if (!confirm('Clear the fields?')) return;

    this.product.title ='';
    this.product.price ='';
    this.product.category ='';
    this.product.imageUrl ='';
  }

  ngOnInit(): void {
  }

}
