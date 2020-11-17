import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../model/user';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';

const USRS_URL = `${environment.apiUrl}/main/usrs`;
const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private notifier: NotificationService) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(USRS_URL, HTTP_OPTIONS)
      .pipe(
        catchError(this.handleError<User[]>('get all user profiles', []))
      );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${USRS_URL}/${id}`, HTTP_OPTIONS)
      .pipe(
        catchError(this.handleError<User>(`get user profile with id=${id}`))
      );
  }

  removeUser(id: number): Observable<any> {
    return this.http.delete<any>(`${USRS_URL}/${id}`, HTTP_OPTIONS)
      .pipe(
        catchError(this.handleError<any>(`remove user profile with id=${id}`))
      );
  }

  private handleError<T>(operation: string, result?: T) {
    return (err: HttpErrorResponse): Observable<T> => {
      console.warn(`Failed to ${operation}`);
      console.error(err);

      if (err.error instanceof ErrorEvent) {
        return throwError(err);
      }
      else {
        this.notifier.showError('Holy guacamole!', err.error?.message || 'Something went wrong, please try again later')
        return of(result as T);
      }
    };
  }

}
