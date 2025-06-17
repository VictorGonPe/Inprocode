import { TestBed } from '@angular/core/testing';
import { StoreListComponent } from './store-list.component';
import { StoreService } from '../../core/services/store.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('StoreListComponent (basic)', () => {
  let component: StoreListComponent;
  let mockStoreService: jasmine.SpyObj<StoreService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockStoreService = jasmine.createSpyObj('StoreService', ['fetchStores']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: StoreService, useValue: mockStoreService },
        { provide: Router, useValue: mockRouter },
        StoreListComponent
      ]
    });

    component = TestBed.inject(StoreListComponent);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchStores on init', () => {
    component.ngOnInit();
    expect(mockStoreService.fetchStores).toHaveBeenCalled();
  });

  it('should navigate to the create store form', () => {
    component.createStore();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/create']);
  });

  it('should navigate to the edit form with the correct ID', () => {
    component.editStore('abc123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit', 'abc123']);
  });
});
