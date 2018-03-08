import { Component, OnInit } from '@angular/core';
import { loginModel } from '../loginComponent/loginModel';
import { AuthServices } from '../../../services/authServices';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'login-component',
    templateUrl: '../loginComponent/login.component.html'
})

export class loginComponent {
    public model: loginModel;
    showLoginWarningMessage: boolean = false;
    returnUrl: string = '';

    constructor(
        private auth: AuthServices,
        private router: Router,
        private route: ActivatedRoute) {
        this.model = new loginModel();
    }
    ngOnInit() {
        if (this.auth.validateUsertoken()) {
            //update your logic accordingly
            //this will trigger while user clicks on back button, 
            //before naviagting to login page
            alert('You will be logged out');
        }
        this.auth.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.showLoginWarningMessage = false;
        if (this.auth.validateUserDetails(this.model)) {
            this.auth.settoken();
            this.router.navigate([this.returnUrl]);
        } else {
            console.log('Invalid credentials');
            this.showLoginWarningMessage = true;
        }

    }
}