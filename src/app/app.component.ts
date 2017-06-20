import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel } from './shared/model/user.model';
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';


@Component({
  selector: 'app-root',
  template: `
   
    <div class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a routerLink="/" class="navbar-brand">My App</a>
        </div>
        <ul class="nav navbar-nav">
          <li>
            <a routerLink="/users" class="navbar-brand">Users</a>
          </li>            
        </ul>

        <ul class="nav navbar-nav navbar-right">
          <li *ngIf="!isLoggedIn"><a routerLink="/login">Login</a></li>
          <li *ngIf="isLoggedIn"><a (click)="logout()">Logut</a></li>
        </ul>

      </div>
    </div>
    

    <router-outlet></router-outlet>
    
  `
})
export class AppComponent implements OnInit {

  users: UserModel[];

  constructor( private router: Router, private userService: UserService, private authService: AuthService ) {
    
  }

  ngOnInit() {

    this.userService
        .getUsers()
        .subscribe( users => this.users = users );

    // this.http.get('https://reqres.in/api/users')
    //   .map( res => res.json().data )
    //   .subscribe(usr => this.users = usr);

    // this.http.get('https://reqres.in/api/users')
    //          .toPromise()
    //          .then(data => {
    //            this.users = data.json().data;
    //          })
      
  }

  /**
   * Logout
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


    /**
     * Is user logged in?
     */
    get isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}
