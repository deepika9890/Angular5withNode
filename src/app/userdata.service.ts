import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { Login } from './login';
import { Register } from './register';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    private userdataUrl = 'http://localhost:3000/';  // URL to web api

    constructor(
        private http: HttpClient)  { }

  currentUserSubject = new BehaviorSubject<User>(new User);
  currentUser = this.currentUserSubject.asObservable();

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }

  /* Verifying login credentials */
  login (login: Login): Observable<User[]>{
      return this.http.post<Login>((this.userdataUrl + 'login'), login, httpOptions).pipe(
          tap(_ => this.log(`Logged in`)),
          catchError(this.handleError<any>('createUser'))
      );
  }

  //registering a new user
   registerUser(register: Register): Observable <User[]>{
      return this.http.post<Register>((this.userdataUrl+ 'register'),register,httpOptions).pipe(
          tap(_ => this.log(`Registered`)),
          catchError(this.handleError<any>('registerUser'))
      );
  }

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

  getUserView (id): Observable<User> {
      return this.http.get<User>(this.userdataUrl +'user/' + id)
  }


    /** Log a HeroService message with the MessageService */
  private log(message: string) {
        console.log(message);
    }

  
    /** PUT: update the user on the server */
  updateUser(user: User): Observable <any > {
      console.log(user);
        return this.http.put((this.userdataUrl + 'user/'+ user.id), user, httpOptions).pipe(
            tap(_ => this.log(`updated user id=${user.id}`)),
            catchError(this.handleError<any>('updateUser'))
        );
    }

  createUser(user: User): Observable <User[]>{
        
        return this.http.post((this.userdataUrl + 'newuser/'), user, httpOptions)
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

