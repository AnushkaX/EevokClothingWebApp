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
  product: Product;
  cart$;
  showActions = true;
  sizeOf: string; 
  qty: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private cartService: ShoppingCartService) {

    let id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    console.log(this.id);
    if (id) this.product = this.productService.get(this.id).subscribe(p => { this.product = p });
    
  }

  addToCart() {
    let qty : number = +this.qty;
    // this.cartService.addToCart(this.product);
    this.cartService.addToCart1(this.id, this.product, qty);
    console.log(this.product.category);
  }

  

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    
  }

}
