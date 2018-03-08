import { Injectable } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';
    
@Injectable()

export class AuthServices {
    userData: Array<{}>;
    token: Number = 0;
    tokenDetails: String;
    constructor() {
        this.userData = [{
            emailId: 'admin@gmail.com', password: 'admin123'
        }]
    }
    settoken() {
        this.token = new Date().getTime();
        localStorage.setItem('token', JSON.stringify(this.token));
    }
    validateUsertoken() {
        this.tokenDetails = localStorage.getItem('token');
        //let _token = JSON.parse
        if (this.tokenDetails != null) {
            return true;
        } else {
            return false;
        }

    }
    //it should be from backend
    validateUserDetails(user) {
        let _userList = this.userData;
        for (var i = 0; i < _userList.length; i++) {
            if (user.emailId.toLowerCase() == _userList[i]['emailId'].toLowerCase() && user.password == _userList[i]['password']) {
                return true;
            }
        }
    }
    logout() {
        localStorage.clear();
    }
}