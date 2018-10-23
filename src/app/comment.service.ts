
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Comment } from './comment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CommentService {

    private commentsUrl = 'http://localhost:3000/';  // URL to web api

    constructor(
        private http: HttpClient) { }
 
    getComments(topicId): Observable <Comment[]> {
        return this.http.get<Comment[]>(this.commentsUrl + 'comments/' +topicId, httpOptions)
            .pipe(
                tap(comments => this.log(`fetched comments`)),
                catchError(this.handleError('getComments', []))
            );
    }
   
    createComment(comment: Comment): Observable<any>{
        return this.http.post(this.commentsUrl + 'commentcreate', comment, httpOptions)
        .pipe(
            tap(_ => this.log('created comment')),
            catchError(this.handleError<any>('createComment'))
        );
    }

    editComment(comment: Comment): Observable<any> {
        return this.http.put(this.commentsUrl + 'commentedit', comment, httpOptions)
            .pipe(
                tap(_ => this.log('edited comment')),
                catchError(this.handleError<any>('editcomment'))
            );
    }
    
    deletecomment(id): Observable < any > {
        return this.http.put(this.commentsUrl + 'commentdelete/' +id, httpOptions)
        .pipe(
            tap(_=> this.log('deleted comment')),
            catchError(this.handleError<any>('deletecomment'))
        );
    }

    private log(message: string) {
        console.log(message);
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