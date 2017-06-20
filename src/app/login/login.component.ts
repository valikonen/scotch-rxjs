import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
    template: `
        <h3>Login</h3>
        <form (ngSubmit)="login()">
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" name="username" [(ngModel)]="credentials.username">
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" name="password" [(ngModel)]="credentials.password">
            </div>

            <div class="alert alert-success" *ngIf="successMsg">
                {{successMsg}}
            </div>
            
            <div class="alert alert-success" *ngIf="errMsg">
                {{errMsg}}
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-info">Login</button>    
            </div>
        </form>
    `
})
export class LoginComponent implements OnInit {

    credentials = {
        username: '',
        password: ''
    }

    successMsg: string = '';
    errMsg: string = '';

    constructor( private router: Router, private authService: AuthService ) { }

    ngOnInit() { 
        
    }

    login() {
        this.authService.login(this.credentials.username, this.credentials.password).subscribe(
            data => {
                this.router.navigate(['/users'])
            },
            err => {

            }
        )
    }

}