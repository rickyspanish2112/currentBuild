import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Accountnode } from '../model/accountnode';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }


  getAccountNodes(): Observable<Accountnode[]> {
    const accountUrl = '../../../assets/api/accountnode.json';

    return this.http.get<Accountnode[]>(accountUrl).pipe(
      tap(this.DoGetAccountNodes()),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred ${err.error.message}`;
    } else {
      errorMessage = `Server side returned code: ${
        err.status
      }, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  private DoGetAccountNodes(): (x: Accountnode[]) => void {
    return data =>
      console.log(
        'The following account nodes were returned: ' + JSON.stringify(data)
      );
  }

}
