import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../interfaces/store.model'; // <- tu interfaz

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/stores';

  stores = signal<Store[]>([]);

  fetchStores() {
    this.http.get<Store[]>(this.apiUrl).subscribe({
      next: (data) => this.stores.set(data),
      error: (err) => console.error('Error fetching stores:', err),
    });
  }
}