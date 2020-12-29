import { OrderService } from './order.service';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AdminAuthGuard as AdminAuthGuard } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthGuard as AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { RouterModule, CanActivate } from '@angular/router';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CustomFormsModule } from 'ng2-validation';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FacebookModule } from 'ngx-facebook';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ImageCarouselComponent } from './products/image-carousel/image-carousel.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ProductViewComponent } from './product-view/product-view.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ImageCarouselComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ProductViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'product-view', component: ProductViewComponent },
      { path: 'product-view/:id', component: ProductViewComponent },

      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },

      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },

    ]),
    NgbModule,
    FormsModule,
    CustomFormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    FacebookModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
