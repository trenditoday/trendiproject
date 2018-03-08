import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing.module';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { loginComponent } from './admin/components/loginComponent/login.component';

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
    OfferComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'trendi-today' }),
    HttpClientModule,
    BrowserTransferStateModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),    
  ],
  providers: [AuthServices, AuthGuardService, GlobalconfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
