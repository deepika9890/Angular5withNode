
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Topic } from './topic';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TopicService {

    private topicdataUrl = 'http://localhost:3000/';  // URL to web api

    constructor(
        private http: HttpClient) { }

    currentTopicSubject =new BehaviorSubject<Topic>(new Topic);
    currentTopic =this.currentTopicSubject.asObservable(); 
    

    getTopicData(): Observable < Topic[] > {
        return this.http.get<Topic[]>(this.topicdataUrl + 'usertopics')
            .pipe(
                tap(topicdata => this.log(`fetched topic data`)),
                catchError(this.handleError('getTopicData', []))
            );
    }
   
    getTopicView(topicId): Observable<Topic>{
        return this.http.get<Topic>(this.topicdataUrl+ 'topicview/' +topicId)
    }
    

    createTopic(topic: Topic): Observable<any> {
        return this.http.post(this.topicdataUrl + 'newtopic', topic, httpOptions)
            .pipe(
                tap(_ => this.log(`created new topic`)),
                catchError(this.handleError<any>('createTopic'))
            );
    }

    updateTopic(topic: Topic): Observable <Topic>{
        return this.http.put((this.topicdataUrl +'updatetopic/'+topic.topicId), topic, httpOptions).pipe(
            tap(_ => this.log(`updated created At=${topic.createdAt}`)),
            tap(_ => this.log(`updated partition key=${topic.partitionKey}`)),
            tap(_ => this.log(`updated description=${topic.description}`)),
            catchError(this.handleError<any>('updateTopic'))
        )
    }

    deleteTopic(topicId): Observable<any>{
      return this.http.put(this.topicdataUrl + 'archivetopic/' + topicId, httpOptions);
    }

    // deleteTopic (topicId):Observable <any>{
    //     return this.http.put((this.topicdataUrl +'deletetopic/'+topicId), httpOptions).pipe(
    //         tap(_ => this.log('updated partition Key')),
    //         catchError(this.handleError<any>('deleteTopic'))
    //     )
    // }

    private log(message: string){
        console.log(message);
    }

    private handleError<T>(operation = 'operation', result ?: T) {
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