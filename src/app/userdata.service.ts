import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    private userdataUrl = 'http://localhost:3000/';  // URL to web api

    constructor(
        private http: HttpClient)  { }

  /** GET users from the server */
  getUserData (): Observable<User[]> {
    return this.http.get<User[]>(this.userdataUrl)
      .pipe(
        tap(userdata => this.log(`fetched user data`)),
        catchError(this.handleError('getUserData', []))
      );
  }

  deleteUser (id): Observable<User> {
      return this.http.delete <User>(this.userdataUrl +'user/'+ id)
  }

  getUserView (id): Observable<User>{
      return this.http.get<User>(this.userdataUrl +'user/' + id)
  }


    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(message);
    }


    /** PUT: update the user on the server */
    updateUser(user: User): Observable < any > {
        return this.http.put((this.userdataUrl + 'user/'+ user.id), user, httpOptions).pipe(
            tap(_ => this.log(`updated user id=${user.id}`)),
            tap(_ => this.log(`updated user name=${user.name}`)),
            tap(_ => this.log(`updated user address=${user.address}`)),
            catchError(this.handleError<any>('updateUser'))
        );
    }

    createUser(user: User): Observable <User[]>{
        
        return this.http.post((this.userdataUrl + 'user/'), user, httpOptions)
            .pipe(
                tap(_ => this.log(`created new user`)),
                catchError(this.handleError<any>('createUser'))
            );
    }


  private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }


}

