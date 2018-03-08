import { Routes, RouterModule } from '@angular/router';
import { loginComponent } from './admin/components/loginComponent/login.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
  
export const ADMIN_ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: loginComponent },
    { path: 'adminDashboard', component: DashboardComponent }
];