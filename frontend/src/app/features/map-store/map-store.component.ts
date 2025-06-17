import { Component, AfterViewInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../core/services/store.service';
import { FormsModule } from '@angular/forms';
import mapboxgl from 'mapbox-gl';
import { environment } from 'environments/environment';
import { Store } from '../../core/interfaces/store.model';

@Component({
  standalone: true,
  selector: 'app-map-store',
  imports: [CommonModule, FormsModule],
  templateUrl: './map-store.component.html',
  styleUrl: './map-store.component.scss',
})
export class MapStoreComponent implements AfterViewInit {
  private storeService = inject(StoreService);

  @ViewChild('markerTemplate', { static: true }) markerTemplate!: ElementRef;
  @ViewChild('markerPremiumTemplate', { static: true }) markerPremiumTemplate!: ElementRef;

  map!: mapboxgl.Map;
  stores: Store[] = [];

  selectedCategory: string = '';
  onlyPremium: boolean = false;

  storeTypes = [
    { value: 'estanco', label: 'Estanco' },
    { value: 'restaurante', label: 'Restaurante / Bar' },
    { value: 'drogueria', label: 'Droguería / Perfumería' },
    { value: 'zapateria', label: 'Zapatería' },
    { value: 'panaderia', label: 'Panadería / Pastelería' },
    { value: 'supermercado', label: 'Supermercado / Alimentación' },
    { value: 'ropa', label: 'Tienda de ropa' },
    { value: 'ferreteria', label: 'Ferretería' },
    { value: 'papeleria', label: 'Papelería / Librería' },
    { value: 'fruteria', label: 'Frutería / Verdulería' },
  ];

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.MI_MAPBOX_TOKEN;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.21873, 41.4502],
      zoom: 17,
    });
    this.storeService.getStores().subscribe((data: Store[]) => {
      this.stores = data;
      this.updateMarkers(); // Mostrar todos al inicio
    });
  }

  updateMarkers(): void {
    document.querySelectorAll('.mapboxgl-marker').forEach(el => el.remove());

    const filtered = this.stores.filter((store) => {
      const matchCategory = this.selectedCategory
        ? store.type === this.selectedCategory
        : true;
      const matchPremium = this.onlyPremium ? store.premium === true : true;
      return matchCategory && matchPremium;
    });

    filtered.forEach((store) => {
      const lat = Number(store.latitude);
      const lng = Number(store.longitude);

      if (!lat || !lng || isNaN(lat) || isNaN(lng)) return;

      // 💡 Aquí clonamos el marcador en lugar de crear uno desde cero
      const markerElement = (store.premium
        ? this.markerPremiumTemplate.nativeElement
        : this.markerTemplate.nativeElement
      ).cloneNode(true) as HTMLElement;

      markerElement.style.display = 'block'; // ya no oculto

      const popupHTML = `
        <div class="popup">
          <h6>${store.name}</h6>
          <p>${store.address}</p>
          ${store.premium && store.image ? `<img src="${store.image}" width="100" />` : ''}
        </div>
      `;

      new mapboxgl.Marker({ element: markerElement })
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setHTML(popupHTML))
        .addTo(this.map);
    });
  }
}

