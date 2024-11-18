// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authApiUrl = environment.apiUrls.userpubService; // Point vers API Gateway

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    console.log("Sending request to:", `${this.authApiUrl}/login`);
    console.log("Payload:", payload);
    console.log("http:", this.http);

    this.http.post(this.authApiUrl, payload)

    return this.http.post(`${this.authApiUrl}/login`, payload).pipe(
      tap((response: any) => {
        console.log("Login response:", response);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      }),
      catchError(error => {
        console.error("Login error:", error);
        return throwError(error); // Rethrow the error for further handling
      })
    );
  }
  //bech nzid methode /me

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post(`${this.authApiUrl}/refresh`, { refresh_token: refreshToken }).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getUserRole(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles ? payload.roles[0] : null;
  }

}


