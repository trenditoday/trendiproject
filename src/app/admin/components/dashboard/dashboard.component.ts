import { Component } from '@angular/core'
import { AuthServices } from '../../../services/authServices';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard-component',
    templateUrl: '../dashboard/dashboard.component.html'
})

export class DashboardComponent {
    constructor(private auth: AuthServices, private route: Router) { }
    logOut() {
        this.auth.logout();
        this.route.navigate(['login']);
    }
}