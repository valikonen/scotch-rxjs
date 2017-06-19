import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel } from '../../shared/model/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
    template: `
        <form (ngSubmit)="createUser()">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" class="form-control" name="name" [(ngModel)]="user.name">
            </div>

            <div class="form-group">
                <label for="name">Username</label>
                <input type="text" id="username" class="form-control" name="username" [(ngModel)]="user.username">
            </div>

            <div class="alert alert-success" *ngIf="successMsg">
                {{successMsg}}
            </div>
            <div class="alert alert-danger" *ngIf="errMsg">
                {{errMsg}}
            </div>

            <button class="btn btn-success">Create user</button>

        </form>
    `
})
export class UserCreateComponent implements OnInit {

    user: UserModel;
    successMsg: string = '';
    errMsg: string = '';

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit() {
        this.user = {
            name: '',
            username: '',
            avatar: ''
        }
    }

    createUser() {
        this.successMsg = '';
        this.userService
            .createUser(this.user)
            .subscribe(user => {
                this.successMsg = 'Used was created!';
                this.router.navigate(['/users'])
            });
    }

}