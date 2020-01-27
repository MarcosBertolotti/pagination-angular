import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://utn2019-avanzada2-tp9.herokuapp.com/login';

  redirectUrl: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any>
  {
    const observable = this.http.post(this.url, user, this.httpOptions);

    observable.subscribe(
      response => {
        localStorage.setItem('token', response['jwt']);
      },
      error => {
        console.log(error);
      }
    );
    return observable;
  }

  logout(): void
  {
    localStorage.removeItem('token')
  }

  isLogged(): boolean
  {
    return localStorage.getItem('token') ? true : false;
  }

}
