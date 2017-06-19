import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserModel } from '../model/user.model';

@Injectable()

export class UserService {

    private userUrl: string = 'https://reqres.in/api/users';
    errMessage: any;

    // Observable source
    private userCreatedSource = new Subject<UserModel>();
    private userDeletedSource = new Subject();

    // Observable stream
    userCreated$ = this.userCreatedSource.asObservable();
    userDeleted$ = this.userDeletedSource.asObservable();

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

    /**
     * Create a user
     */ 
    createUser(user: UserModel): Observable<UserModel> {
        return this.http
                   .post(`${this.userUrl}`, user)
                   .map(res => res.json())
                   .do(user => this.userCreated(user))
                   .catch(this.handleError);
    }

    /**
     * Update a user
     */ 
    updateUser(user: UserModel): Observable<UserModel> {
        return this.http
                    .get(`${this.userUrl}/${user.id}`, user)
                    .map(res => res.json())
                    .catch(this.handleError);
                        
    }

    /**
     * Delete a user
     */ 
    deleteUser(userId: number): Observable<any> {
        return this.http
                   .delete(`${this.userUrl}/${userId}`)
                   .do(res => this.userDeleted())
                   .catch(this.handleError)
    }

    /**
     * The user was created. Add this info to our stream
     */
    private userCreated(user: UserModel) {
        this.userCreatedSource.next(user);
    }

    /**
     * The user was deleted. Add this info to our stream
     */
    private userDeleted() {
        this.userDeletedSource.next();
    }


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
            this.errMessage = `${err.status} - ${err.statusText || ''} ${error}`
        }
        else {
            this.errMessage = err.message ? err.message : err.toString()
        }
    
        return Observable.throw(this.errMessage);
    }

}