import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
 
export const SITE_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent }
];