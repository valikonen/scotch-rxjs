import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
    moduleId: module.id,
    selector: 'users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

    successMsg: string = '';
    errMsg: string = '';

    constructor( private userService: UserService) { }

    ngOnInit() { 
        this.userService.userCreated$.subscribe( user => {
            this.successMsg = `${user.name} has been created!`;
            this.clearMsg();
        });

        this.userService.userDeleted$.subscribe( () => {
            this.successMsg = 'User has been deleted!';
            this.clearMsg();
        });
        
    }

    clearMsg() {
        setTimeout( () => {
            this.successMsg = '';
            this.errMsg = '';
        }, 2000)
        
    }

}