import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../entities/produit'; 
import { ProduitStation } from '../entities/ProductStation.model'; 


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = `http://localhost:8081/pms/api/v1/produits`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  // Method to create a product
  createProduct(createProductRequest: any): Observable<Produit> {
    return this.http.post<Produit>('${this.apiUrl}', createProductRequest, this.getHttpOptions());
  }

  // Method to update a product by ID
  updateProduct(produitId: number, updateProductRequest: any): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${produitId}`, updateProductRequest, this.getHttpOptions());
  }

  // Method to add a product to a station
  ajouterProductToStationId(ProductStation: ProduitStation): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/console/api/v1/produitstation`, ProductStation, this.getHttpOptions());
  }

  // Method to set the product quantity in a station
  setProductQteDansStationId(ProductStation: ProduitStation): Observable<void> {
    return this.http.put<void>(`this.apiUrl/console/api/v1/produitstation`, ProductStation, this.getHttpOptions());
  }

  /*getAllProducts(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl, {
      headers: this.createAuthorizationHeader() // If needed for authorization
    });
  }

  // Get products by station ID
  getAllProductsByStationId(stationId: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/station/${stationId}`, {
      headers: this.createAuthorizationHeader() // If needed for authorization
    });
  }*/

  // Get product by ID
  getProductById(produitId: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${produitId}`, {
      headers: this.createAuthorizationHeader() // If needed for authorization
    });
  }

  // Helper method to get headers with authorization
  private getHttpOptions() {
    const token = localStorage.getItem('token'); // Assuming you are storing the JWT token in localStorage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return { headers };
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Adjust based on how you manage tokens
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
