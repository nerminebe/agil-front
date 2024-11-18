// src/app/services/cms.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CMSService {
  private apiUrl = environment.apiUrls.CMSService;

  constructor(private http: HttpClient) {}

  getContent(): Observable<any> {
    return this.http.get(`${this.apiUrl}/content`);
  }

}
