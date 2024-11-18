// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authApiUrl = environment.apiUrls.userpubService;


  constructor(private http: HttpClient) {}

  // Authentification
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.authApiUrl}/login`, { username, password });
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.authApiUrl}/refresh`, { refresh_token: refreshToken });
  }

  me(): Observable<any> {
    return this.http.get(`${this.authApiUrl}/me`);
  }
  }
