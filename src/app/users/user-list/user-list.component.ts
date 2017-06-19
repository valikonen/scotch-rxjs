import { Component, OnInit } from '@angular/core';

import { UserModel } from '../../shared/model/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
    moduleId: module.id,    
    template: `
        <div class="jumbotron text-center">
            <h3>Users</h3>
        </div>

        <div class="user-list row" *ngIf="users">
            <div class="col-sm-4" *ngFor="let user of users" [routerLink]="['/users', user.id]">
                <img [src]="user.avatar" alt="user.name" class="user-avatar img-rounded">

                <h2> {{ user.name }} - <small>{{ user.username }}</small> </h2>
            </div>
        </div>
    `
})
export class UserListComponent implements OnInit {

    users: UserModel[];

    constructor( private userService: UserService ) { }

    ngOnInit() { 
        this.userService
            .getUsers()
            .subscribe( users => {               
                this.users = users;
            })
    }

}