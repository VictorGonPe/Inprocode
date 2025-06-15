// map.component.ts
import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../core/services/store.service';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environment';
import { Store } from '../../core/interfaces/store.model';

@Component({
  standalone: true,
  selector: 'app-map-store',
  imports: [CommonModule],
  templateUrl: './map-store.component.html',
  styleUrl: './map-store.component.scss',
})
export class MapStoreComponent implements AfterViewInit {
  private storeService = inject(StoreService);
  map!: mapboxgl.Map;

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.MI_MAPBOX_TOKEN;

    this.map = new mapboxgl.Map({
      container: 'map', // El ID del div en el HTML
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.21873, 41.45020],
      zoom: 17,
    });

    this.storeService.getStores().subscribe((stores: Store[]) => {
      stores.forEach((store) => {
        if (store.latitude && store.longitude) {
          new mapboxgl.Marker()
            .setLngLat([store.longitude, store.latitude])
            .setPopup(
              new mapboxgl.Popup().setHTML(`<div class="popup"><h6>${store.name}</h6><p>${store.address}</p></div>`)
            )
            .addTo(this.map);
        }
      });
    });
  }
}