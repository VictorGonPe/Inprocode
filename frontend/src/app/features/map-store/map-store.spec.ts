import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapStoreComponent } from './map-store.component';
import { StoreService } from '../../core/services/store.service';
import { of } from 'rxjs';
import { Store } from '../../core/interfaces/store.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementRef } from '@angular/core';


const mockStores: Store[] = [
  {
    _id: '1',
    name: 'Tienda Premium',
    address: 'Calle Premium 1',
    location: 'Ciudad',
    type: 'ropa',
    premium: true,
    image: 'https://via.placeholder.com/100',
    phone: '111111111',
    email: 'premium@store.com',
    latitude: 41.4502,
    longitude: 2.21873
  },
  {
    _id: '2',
    name: 'Tienda Normal',
    address: 'Calle Normal 2',
    location: 'Ciudad',
    type: 'panaderia',
    premium: false,
    image: '',
    phone: '222222222',
    email: 'normal@store.com',
    latitude: 41.451,
    longitude: 2.219
  }
];

describe('MapStoreComponent', () => {
  let component: MapStoreComponent;
  let fixture: ComponentFixture<MapStoreComponent>;
  let mockStoreService: jasmine.SpyObj<StoreService>;

  beforeEach(async () => {
    mockStoreService = jasmine.createSpyObj('StoreService', ['getStores']);
    mockStoreService.getStores.and.returnValue(of(mockStores));

    await TestBed.configureTestingModule({
      imports: [MapStoreComponent, CommonModule, FormsModule],
      providers: [{ provide: StoreService, useValue: mockStoreService }]
    }).compileComponents();

    fixture = TestBed.createComponent(MapStoreComponent);
    component = fixture.componentInstance;

    // Simula plantillas de marcador
    component.markerTemplate = {
      nativeElement: document.createElement('div')
    } as ElementRef;
    component.markerPremiumTemplate = {
      nativeElement: document.createElement('div')
    } as ElementRef;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter only premium stores when checkbox is checked', () => {
    component.onlyPremium = true;
    component.selectedCategory = '';
    component.stores = mockStores;

    const filtered = component['stores'].filter(store => store.premium);
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Tienda Premium');
  });

  it('should filter stores by category', () => {
    component.onlyPremium = false;
    component.selectedCategory = 'panaderia';
    component.stores = mockStores;

    const filtered = component['stores'].filter(
      store => store.type === 'panaderia'
    );
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Tienda Normal');
  });
});