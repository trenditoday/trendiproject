import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { loginComponent } from './admin/components/loginComponent/login.component';
import {AdminBlogsComponent} from './admin/components/admin-blogs/admin-blogs.component';
import { AdminCreateBlogComponent } from './admin/components/admin-create-blog/admin-create-blog.component';
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

export const appRoutes: Routes = [
  // { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
  // { path: 'login', component: loginComponent },
  // { path: '**', redirectTo: '' }

  //Site routes goes here 
    { 
        path: '', 
        component: SiteLayoutComponent,
        children: [
          { path: '', component: HomeComponent, pathMatch: 'full'}
        ]
    },
    
    // App routes goes here here
    { 
        path: '',
        component: AdminLayoutComponent, 
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'login', component: loginComponent },
          { path: 'blogs', component: AdminBlogsComponent },
          { path: 'addblog', component: AdminCreateBlogComponent },
          { path: 'addblog/:id', component: AdminCreateBlogComponent },
          { path: 'categories', component: CategoriesComponent }
        ]
    },

    //no layout routes
    { path: 'login', component: loginComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
]