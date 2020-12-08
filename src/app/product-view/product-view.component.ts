import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {

  id;
  product: any = {};

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService) {
    let id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    console.log(id);
    if (id) this.productService.get(id).subscribe(p => { this.product = p });
  }

}
