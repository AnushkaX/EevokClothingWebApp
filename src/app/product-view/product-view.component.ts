import { Product } from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  id;
  product: any = {};
  product1: Product;
  cart$;
  showActions = true;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private cartService: ShoppingCartService) {
    let id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    console.log(id);
    if (id) this.productService.get(id).subscribe(p => { this.product = p });
    this.product1 = this.product;
    console.log(this.product)
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    
  }

}
