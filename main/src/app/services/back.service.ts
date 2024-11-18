// src/app/services/back.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Commande } from '../entities/commande';

@Injectable({
  providedIn: 'root'
})
export class BackService {
  private apiUrl = environment.apiUrls.backService;

  constructor(private http: HttpClient) {}

  // Example: Get a list of items from the back microservice
  getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/items`);
  }

  // Example: Create a new item
  createItem(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/items`, data);
  }

  // Example: Update an item by ID
  updateItem(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/items/${id}`, data);
  }

  // Example: Delete an item by ID
  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${id}`);
  }
  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.apiUrl);  // Effectue une requête GET et retourne un Observable de Commande[]
  }
}
