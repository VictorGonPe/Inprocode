import { TestBed } from '@angular/core/testing';
import { StoreListComponent } from './store-list.component';
import { StoreService } from '../../core/services/store.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('StoreListComponent', () => {
    let component: StoreListComponent;
    let mockStoreService: jasmine.SpyObj<StoreService>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(() => {
        mockStoreService = jasmine.createSpyObj('StoreService', ['fetchStores', 'deleteStore'], {
            stores: () => [
                {
                    _id: '1',
                    name: 'Mi tienda',
                    address: 'Calle principal, 123',
                    location: 'Barcelona',
                    description: 'Todo a cien',
                    image: 'http://www.image.png',
                }
            ]
        });

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



    it('calls fetchStores when component initializes', () => {
        /**
         * Scenario: Component is initialized
         * Given the component is created
         * When ngOnInit is called
         * Then fetchStores should be triggered
         */

        // Act
        component.ngOnInit();

        // Assert
        expect(mockStoreService.fetchStores).toHaveBeenCalled();
    });



    it('navigates to edit page with correct id', () => {

        // Arrange
        const id = '123';

        // Act
        component.editStore(id);

        // Assert
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit', id]);
    });



    it('deletes store and refreshes list', () => {

        // Arrange
        const id = '123';
        mockStoreService.deleteStore.and.returnValue(of({}));

        // Act
        component.deleteStore(id);

        // Assert
        expect(mockStoreService.deleteStore).toHaveBeenCalledWith(id);
        expect(mockStoreService.fetchStores).toHaveBeenCalled();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });



    it('navigates to create store form', () => {

        // Act
        component.createStore();

        // Assert
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/create']);
    });



    it('generates and downloads a CSV file when data exists', () => {

        // Arrange
        const createObjectURLSpy = spyOn(window.URL, 'createObjectURL').and.returnValue('blob:url');
        const revokeObjectURLSpy = spyOn(window.URL, 'revokeObjectURL');
        const clickSpy = jasmine.createSpy();

        spyOn(document, 'createElement').and.returnValue({
            href: '',
            download: '',
            click: clickSpy
        } as unknown as HTMLAnchorElement);

        // Act
        component.downloadCSV();

        // Assert
        expect(createObjectURLSpy).toHaveBeenCalled();
        expect(clickSpy).toHaveBeenCalled();
        expect(revokeObjectURLSpy).toHaveBeenCalled();
    });

});
