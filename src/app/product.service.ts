
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Product} from './product';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {
    private productsUrl = 'http://localhost:3000/';

        constructor(
            private http: HttpClient) { }

        getProduce(id): Observable <Product[]>{
            return this.http.get<Product[]>(this.productsUrl + 'products/'+id, httpOptions)
            .pipe(
                tap(products => this.log(`fetched products`)),
                catchError(this.handleError('getProduce', []))
            );
        }

        editProduce(product: Product): Observable<any>{
            return this.http.post(this.productsUrl + 'editproduce', product, httpOptions)
            .pipe(
                tap(_ => this.log('edited produce')),
                catchError(this.handleError<any>('editproduce'))
            );
        }

        deleteProduce(id): Observable<any> {
            return this.http.put(this.productsUrl + 'deleteproduce/' + id, httpOptions)
                .pipe(
                    tap(_ => this.log('deleted produce')),
                    catchError(this.handleError<any>('deleteproduce'))
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