import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private url = 'https://utn2019-avanzada2-tp9.herokuapp.com/'

  private httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<any>
  {
    return this.http.post(this.url + 'sign-up/', user, this.httpOptions);
  }

  isExistsEmail(email: String): Observable<any>
  {
    return this.http.get(this.url + 'users/identities?email=' + email);
  }

}
