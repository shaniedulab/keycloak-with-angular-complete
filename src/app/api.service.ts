// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  get(endpoint: string) {
    const url = `${this.baseUrl}`;
    return this.http.get(url);
  }

//   post(endpoint: string, data: any) {
//     const url = `${this.baseUrl}/${endpoint}`;
//     return this.http.post(url, data);
//   }

  // Add other HTTP methods as needed (e.g., put, delete, etc.)
}
