import { Component, inject, OnInit } from '@angular/core';
import { Store } from '../../core/interfaces/store.model';
import { StoreService } from '../../core/services/store.service';

@Component({
  selector: 'app-store-list',
  standalone: true,
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss'
})
export class StoreListComponent implements OnInit {
  private storeService = inject(StoreService);
  stores = this.storeService.stores;

  ngOnInit(): void {
    this.storeService.fetchStores();
  }
}
