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

// Services
import { AuthServices } from './services/authServices';
import { AuthGuardService } from './services/authGuardService';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    loginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'universal-demo' }),
    HttpClientModule,
    BrowserTransferStateModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthServices, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
