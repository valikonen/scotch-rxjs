import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserModel } from '../../shared/model/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({    
    template: `
        <div *ngIf="user">
            <h2>{{ user.name }} {{ user.username }}</h2>
            <img [src]="user.avatar" alt="user.last_name" class="img-rounded">
            <button class="btn btn-default btn-sm" [routerLink]="['/users', user.id, 'edit']">edit</button>
            <button class="btn btn-danger btn-sm" (click)="deleteUser()">Delete</button>
        </div>

        {{user | json}}
    `
})
export class UserSingleComponent implements OnInit {

    user: UserModel;

    constructor( private router: Router, private activatedRouter: ActivatedRoute, private userService: UserService ) { }

    ngOnInit() { 

        let userId = this.activatedRouter.snapshot.params['id'];

        this.userService.getUser(userId).subscribe( user => this.user = user);
    
    }

    deleteUser() {
        this.userService
            .deleteUser(this.user.id)
            .subscribe(data => {
                this.router.navigate(['/users'])
            })
    }

}