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

  createStore(store: Store) {
    return this.http.post<Store>(this.apiUrl, store);
  }

  getStore(id: string) {
    return this.http.get<Store>(`${this.apiUrl}/${id}`);
  }

  getStores() {
  return this.http.get<Store[]>(this.apiUrl);
}


  updateStore(id: string, store: Store) {
    return this.http.put<Store>(`${this.apiUrl}/${id}`, store);
  }

  deleteStore(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}