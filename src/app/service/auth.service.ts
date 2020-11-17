import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { JwtStorageService } from './jwt-storage.service';
import { map } from 'rxjs/operators';
import { JwtData } from '../model/jwt-data';
import { environment } from 'src/environments/environment';

const AUTH_API = `${environment.apiUrl}/auth`;
const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtUserSubject: BehaviorSubject<User>;
  public jwtUser: Observable<User>;

  constructor(private http: HttpClient, private storageService: JwtStorageService) {
    this.jwtUserSubject = new BehaviorSubject<User>(storageService.getJwtUser());
    this.jwtUser = this.jwtUserSubject.asObservable();
  }

  public get jwtUserValue(): User {
    return this.jwtUserSubject.value;
  }

  login(credentials: { username: string; password: string; }): Observable<JwtData> {
    return this.http.post<JwtData>(`${AUTH_API}/login`, { username: credentials.username, password: credentials.password },
      HTTP_OPTIONS)
      .pipe(map((jwtData) => {
        const user = this.mapToUser(jwtData);

        this.storageService.saveJwtUser(user);
        this.storageService.saveToken(jwtData.token);
        this.jwtUserSubject.next(user);
        // TODO: ..on token expires
        // this.startRefreshTimer();

        return jwtData;
      }));
  }

  logout() {
    this.storageService.removeJwtData();
    this.jwtUserSubject.next(null);
    // window.location.reload();
  }

  register(user: { username: string; email?: string; password: string; }): Observable<any> {
    return this.http.post<any>(`${AUTH_API}/register`,
      { username: user.username, email: user.email, password: user.password }, HTTP_OPTIONS);
  }

  private mapToUser(jwtData: JwtData): User {
    if (jwtData == null) return null;

    let user = new User();
    user.id = jwtData.id;
    user.username = jwtData.username;
    user.roles = jwtData.roles;
    user.email = jwtData.email;

    return user;
  }

  // private startRefreshTimer() {
  //   const timeout = this.storageService.expiresOn().valueOf() - Date.now() - 60000;
  //   setTimeout(() => {}, timeout);
  // }
}
