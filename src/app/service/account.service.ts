import { Injectable } from '@angular/core';
import { Account } from '../model/account';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';

const ACC_URL = `${environment.apiUrl}/main/accounts`;
const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private notifier: NotificationService) { }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(ACC_URL)
      .pipe(
        catchError(this.handleError<Account[]>('get all accounts', []))
      );
  }

  getAccountById(id: number): Observable<Account> {
    const URL = this.composeUrl(id);
    return this.http.get<Account>(URL)
      .pipe(
        catchError(this.handleError<Account>(`get account with id=${id}`))
      );
  }

  searchAccountsByTerms(searchTerm: string, searchOption: string): Observable<Account[]> {
    if (!searchTerm.trim() && searchOption?.length < 1) {
      return of([]);
    }

    const HTTP_PARAMS = {
      params: new HttpParams().set('term', searchTerm).set('option', searchOption)
    };

    return this.http.get<Account[]>(`${ACC_URL}/search`, HTTP_PARAMS)
      .pipe(
        catchError(this.handleError<Account[]>('find accounts by terms'))
      );
  }

  saveAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(ACC_URL, account, HTTP_OPTIONS)
      .pipe(
        catchError(this.handleError<Account>('save account', account))
      );
  }

  updateAccount(account: Account): Observable<Account> {
    const URL = this.composeUrl(account.id);
    return this.http.put<Account>(URL, account, HTTP_OPTIONS)
      .pipe(
        catchError(this.handleError<Account>(`update account with id=${account.id}`))
      );
  }

  deleteAccount(account: Account | number): Observable<any> {
    const id = typeof account === 'number' ? account : account.id;
    const URL = this.composeUrl(id);

    return this.http.delete<any>(URL, HTTP_OPTIONS)
      .pipe(
        catchError(this.handleError<any>(`delete account with id=${id}`))
      );
  }

  private composeUrl(id: number): string {
    return `${ACC_URL}/${id}`;
  }

  /**
    * Handle Http operation that failed.
    * Let the app keep running by returning an empty result.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
  private handleError<T>(operation: string, result?: T) {
    return (err: any): Observable<T> => {
      console.warn(`Failed to ${operation}: ${JSON.stringify(err?.error?.message || err?.error || err?.message)}`);
      console.error(err);

      if (err instanceof HttpErrorResponse) {
        if (err.error instanceof ErrorEvent) {
          return throwError(err);
        }
        // else if (err.error?.validationErrors) {
        //   // TODO: parseFieldErrors..
        //   return throwError(err);
        // }
        else {
          this.notifier.showError('Holy guacamole!', err.error?.message || 'Something went wrong, please try again later')
          return of(result as T);
        }
      }

      return throwError(err);
    };
  }
}
