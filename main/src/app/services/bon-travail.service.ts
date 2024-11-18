// bon-travail.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BonTravail } from '../entities/BonTravail';
import { UserDto } from '../entities/UserDto';
import { Reclamation } from '../entities/Reclamation';

@Injectable({
  providedIn: 'root'
})
export class BonTravailService {
  private apiUrl = 'http://localhost:8080/api/bonTravail'; // URL of your backend

  constructor(private http: HttpClient) {}

  getBonTravails(): Observable<BonTravail[]> {
    return this.http.get<BonTravail[]>(`${this.apiUrl}`);
  }

  getBonTravailById(id: number): Observable<BonTravail> {
    return this.http.get<BonTravail>(`${this.apiUrl}/${id}`);
  }

  createBonTravail(bonTravail: BonTravail): Observable<BonTravail> {
    return this.http.post<BonTravail>(`${this.apiUrl}`, bonTravail);
  }

  updateBonTravail(id: number, bonTravail: BonTravail): Observable<BonTravail> {
    return this.http.put<BonTravail>(`${this.apiUrl}/${id}`, bonTravail);
  }

  deleteBonTravail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // New methods for getting Technicians and Claims
  getTechniciens(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>('http://localhost:8080/api/techniciens');
  }

  getReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>('http://localhost:8080/api/reclamations');
  }
}
