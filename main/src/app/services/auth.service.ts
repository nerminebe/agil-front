import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services/Storage.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authApiUrl = environment.apiUrls.userpubService; 

  constructor(
    private http: HttpClient,
    private storageService: StorageService 
  ) {}

  /**
   * Effectue la connexion de l'utilisateur et stocke les tokens.
   */
  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    console.log("Sending request to:", `${this.authApiUrl}/login`);
    console.log("Payload:", payload);

    return this.http.post(`${this.authApiUrl}/login`, payload).pipe(
      tap((response: any) => {
        console.log("Login response:", response);

        // Stockage des tokens via StorageService
        this.storageService.setLocal('access_token', response.access_token);
        this.storageService.setLocal('refresh_token', response.refresh_token);
      }),
      catchError(error => {
        console.error("Login error:", error);
        return throwError(() => error); // Rethrow l'erreur
      })
    );
  }

  /**
   * Renouvelle le token d'accès en utilisant le refresh token.
   */
  refreshToken(): Observable<any> {
    const refreshToken = this.storageService.getLocal<string>('refresh_token');
    if (!refreshToken) {
      return throwError(() => new Error("Refresh token is missing"));
    }

    return this.http.post(`${this.authApiUrl}/refresh`, { refresh_token: refreshToken }).pipe(
      tap((response: any) => {
        this.storageService.setLocal('access_token', response.access_token);
        this.storageService.setLocal('refresh_token', response.refresh_token);
      }),
      catchError(error => {
        console.error("Refresh token error:", error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Déconnecte l'utilisateur en supprimant les tokens.
   */
  logout(): void {
    this.storageService.removeLocal('access_token');
    this.storageService.removeLocal('refresh_token');
    console.log("User logged out");
  }

  /**
   * Retourne le token d'accès.
   */
  getAccessToken(): string | null {
    return this.storageService.getLocal<string>('access_token');
  }

  /**
   * Vérifie si l'utilisateur est connecté.
   */
  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    return !!token; // Retourne true si un token est présent
  }

  /**
   * Récupère le rôle de l'utilisateur depuis le token.
   */
  getUserRole(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      // Décodage du payload du token
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles ? payload.roles[0] : null;
    } catch (e) {
      console.error("Error decoding token:", e);
      return null;
    }
  }
}
