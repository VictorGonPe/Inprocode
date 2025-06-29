import { Component, inject, OnInit } from '@angular/core';
import { StoreService } from '../../core/services/store.service';
import { Router } from '@angular/router';
import { Store } from '../../core/interfaces/store.model';

@Component({
  selector: 'app-store-list',
  standalone: true,
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss'
})
export class StoreListComponent implements OnInit {
  private storeService = inject(StoreService);
  private router = inject(Router);

  stores = this.storeService.stores;

  ngOnInit(): void {
    this.storeService.fetchStores();
  }
  editStore(id: string) {
    this.router.navigate(['/edit', id]);
  }

  deleteStore(id: string) {
    this.storeService.deleteStore(id).subscribe(() => {
      this.storeService.fetchStores();
      this.router.navigate(['/']);
    });
  }

  createStore(): void {
    this.router.navigate(['/create']);
  }

  downloadCSV(): void {
    const data = this.stores();

    if (!data.length) return;

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','), 
      ...data.map(store =>
        headers.map(header => JSON.stringify(store[header as keyof Store] ?? '')).join(',')
      )
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'stores.csv';
    a.click();

    window.URL.revokeObjectURL(url);
  }
}
