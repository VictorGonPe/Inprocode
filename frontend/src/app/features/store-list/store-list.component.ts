import { Component, inject, OnInit } from '@angular/core';
import { StoreService } from '../../core/services/store.service';
import { Router } from '@angular/router';

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
}
