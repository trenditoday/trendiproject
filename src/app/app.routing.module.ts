import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { loginComponent } from './admin/components/loginComponent/login.component';

// Services
import { AuthServices } from './services/authServices';
import { AuthGuardService } from './services/authGuardService';

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: loginComponent },
  { path: '**', redirectTo: '' }
]