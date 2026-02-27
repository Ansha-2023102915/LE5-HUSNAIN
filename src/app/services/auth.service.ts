import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7191/api/Login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {
      username: username,
      password: password
    });
  }

  register(username: string, firstName: string, lastName: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password
    }, {
      responseType: 'text'
    }); // Expect text response
  }
}
