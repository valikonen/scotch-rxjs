import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserModel } from '../../shared/model/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({    
    template: `
        <div *ngIf="user">
            <h2>{{ user.name }} {{ user.username }}</h2>
            <img [src]="user.avatar" alt="user.last_name" class="img-rounded">
        </div>

        {{user | json}}
    `
})
export class UserSingleComponent implements OnInit {

    user: UserModel;

    constructor( private activatedRouter: ActivatedRoute, private userService: UserService ) { }

    ngOnInit() { 

        let userId = this.activatedRouter.snapshot.params['id'];

        this.userService.getUser(userId).subscribe( user => this.user = user);
    
    }

}