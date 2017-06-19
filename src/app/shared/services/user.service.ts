import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserModel } from '../model/user.model';

@Injectable()

export class UserService {

    private userUrl: string = 'https://reqres.in/api/users';
    errMessage: any;

    constructor(private http: Http) {
        
    }

    /**
     * Get all users
     */ 
    getUsers(): Observable<UserModel[]> {
        return this.http
                   .get(this.userUrl)                   
                   .map( res => res.json().data )
                   .map( users => users.map(this.toUser))
                   .catch( 
                        this.handleError
                        //return Observable.throw(err.json().data || 'Server error')
                   );    
    }

    /**
     * Get a single user
     */ 
    getUser(userId: number): Observable<UserModel> {
        return this.http
                   .get(`${this.userUrl}/${userId}`)
                   .map( res => res.json().data )
                   .map( this.toUser)
                   .catch(this.handleError)

    }

    // Create a user

    // Update a user

    // Delete a user


    /**
     * Convert user info from the API to our standard/format
     */

    private toUser(user): UserModel {
        return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            username: user.first_name,
            avatar: user.avatar
        }
    }


    /**
     * Handle any errors from API
     */
    private handleError(err) {
        if(err instanceof Response) {
            let body = err.json() || '';
            let error = body.error || JSON.stringify(body);
            this.errMessage = `${err.status} - ${err.statusText} || '' ${error}`
        }
        else {
            this.errMessage = err.message ? err.message : err.toString()
        }
    
        return Observable.throw(this.errMessage);
    }

}