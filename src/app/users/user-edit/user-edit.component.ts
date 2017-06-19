import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserModel } from '../../shared/model/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
    template: `
        <div *ngIf="user">
            <form (ngSubmit)="updateUser()">
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

                <button class="btn btn-success">Update user</button>

            </form>
            
        </div>
    `
})
export class UserEditComponent implements OnInit {

    user: UserModel;
    successMsg: string = '';
    errMsg: string = '';

    constructor( private activatedRoute: ActivatedRoute, private userService: UserService ) { }

    ngOnInit() { 
        let userId = this.activatedRoute.snapshot.params['id'];

        this.userService.getUser(userId).subscribe(user => this.user = user);

    }

    updateUser(user) {
        
        this.successMsg = '';

        this.userService
            .updateUser(this.user)
            .subscribe(user => {
                this.user = user
                this.successMsg = 'User was updated';
            }, err => {
                this.errMsg = 'User could not be updated';
            });
    }
    
}