import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import swal from 'sweetalert2';
import { CKEditorModule } from 'ng2-ckeditor';
import { DatePipe } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';  
import { PaginationModule } from 'ngx-bootstrap';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { loginComponent } from './admin/components/loginComponent/login.component';
// import {AdminBlogsComponent} from './admin/components/admin-blogs/admin-blogs.component';
// import { AdminCreateBlogComponent } from './admin/components/admin-create-blog/admin-create-blog.component';
import { CategoriesComponent } from './admin/components/categories/categories.component';

import { HomeComponent } from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {BestSellerComponent} from './components/best-seller/best-seller.component';
import {DotdComponent} from './components/dotd/dotd.component';
import {DotdFullComponent} from './components/dotd/dotd-full/dotd-full.component';
import {OfferComponent} from './components/offer/offer.component';
import { AdminFooterComponent } from './layout/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './layout/admin-header/admin-header.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';

// Services
import { AuthServices } from './services/authServices';
import { AuthGuardService } from './services/authGuardService';
import { GlobalconfigService } from './services/globalconfig.service';
import { CategoryService } from './services/category.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    loginComponent,
    HomeComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminLayoutComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
    SiteLayoutComponent,
    AboutComponent,
    BestSellerComponent,
    DotdComponent,
    DotdFullComponent,
    OfferComponent,
    // AdminBlogsComponent,
    // AdminCreateBlogComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'trendi-today' }),
    HttpClientModule,
    BrowserTransferStateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),    
    ToastrModule.forRoot(),
    CKEditorModule,
    DataTablesModule,
    PaginationModule.forRoot()
  ],
  providers: [
    AuthServices, 
    AuthGuardService, 
    GlobalconfigService,
    CategoryService,
    DatePipe
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
