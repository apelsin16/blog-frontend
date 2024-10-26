import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token!: string | null;
  user!: User | null;

  private apiUrl = 'https://blog-server-9f34645fa6c6.herokuapp.com/account'; // API URL

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(this.apiUrl + '/reg', user, { headers })
      .pipe(map((res) => res)); // У нових версіях немає потреби в `res.json()`
  }

  authUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(this.apiUrl + '/auth', user, { headers })
      .pipe(map((res) => res)); // У нових версіях немає потреби в `res.json()`
  }

  storeUser(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = null;
    this.user = null;

    localStorage.clear();
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}
