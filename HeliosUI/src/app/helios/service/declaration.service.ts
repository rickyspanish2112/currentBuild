import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Declarationtype } from '../model/declarationtypes';
import { throwError, BehaviorSubject } from 'rxjs';
import { Badge } from '../model/badges';
import { ArrivalTransportType } from '../model/arrivaltransporttypes';
import { Port } from '../model/port';
import { OtherAdditionsAndDeductions } from '../model/otheradditionsAndDeductions';


@Injectable({
  providedIn: 'root'
})
export class DeclarationService {
  dataChange: BehaviorSubject<OtherAdditionsAndDeductions[]> = new BehaviorSubject<OtherAdditionsAndDeductions[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private http: HttpClient) { }

  get data(): OtherAdditionsAndDeductions[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

    /** CRUD METHODS */
    getAllAdditionsAndDeductions(): void {

      const ADDITIONS_DEDUCTIONS_URL = '../../../assets/api/otheradditionsAndDeductions.json';

      this.http.get<OtherAdditionsAndDeductions[]>(ADDITIONS_DEDUCTIONS_URL).subscribe(data => {
          this.dataChange.next(data);
          console.log( 'The following additions and deductions were ret transport types were returned: ' + JSON.stringify(data));
        },
        (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
        });
    }

    addAdditionAndDeduction(issue: OtherAdditionsAndDeductions): void {
      this.dialogData = issue;
    }

    updatePort(issue: OtherAdditionsAndDeductions): void {
      this.dialogData = issue;
    }

    deleteAdditionAndDeduction(id: number): void {
      console.log(id);
    }

  getAllDeclarationTypes() {
    const declarationTypesUrl = '../../../assets/api/declarationtypes.json';

    return this.http.get<Declarationtype[]>(declarationTypesUrl).pipe(
      tap(this.DoGetDeclarationTypes()),
      catchError(this.handleError)
    );
  }

  getAllBadges() {
    const badgeUrl = '../../../assets/api/badges.json';

    return this.http.get<Badge[]>(badgeUrl).pipe(
      tap(this.doGetBadges()),
      catchError(this.handleError)
    );
  }

 getAllArrivalTransportTypes() {
  const arrivalTransportTypes = '../../../assets/api/arrivaltransporttype.json';

  return this.http.get<ArrivalTransportType[]>(arrivalTransportTypes).pipe(
    tap(this.doGetArrivalTypes()),
    catchError(this.handleError)
  );
 }

 private doGetArrivalTypes(): (x: ArrivalTransportType[]) => void {
    return data =>
    console.log(
      'The following arrival transport types were returned: ' + JSON.stringify(data)
    );
  }

 private doGetBadges(): (x: Badge[]) => void {
    return data =>
      console.log(
        'The following badges were returned: ' + JSON.stringify(data)
      );
  }

  private DoGetDeclarationTypes(): (x: Declarationtype[]) => void {
    return data =>
      console.log(
        'The following declaration types were returned: ' + JSON.stringify(data)
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

}
