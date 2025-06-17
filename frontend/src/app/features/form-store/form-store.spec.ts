import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormStoreComponent } from './form-store.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../../core/services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';


describe('FormStoreComponent', () => {
    let component: FormStoreComponent;
    let fixture: ComponentFixture<FormStoreComponent>;
    let mockStoreService: jasmine.SpyObj<StoreService>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockActivatedRoute: any;

    beforeEach(async () => {
        mockStoreService = jasmine.createSpyObj('StoreService', ['getStore', 'updateStore', 'createStore']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
        mockActivatedRoute = {
            snapshot: { data: { titleSection: 'Crear Tienda' } },
            paramMap: of(new Map())
        };

        await TestBed.configureTestingModule({
            imports: [FormStoreComponent, ReactiveFormsModule, CommonModule],
            providers: [
                { provide: StoreService, useValue: mockStoreService },
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FormStoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should have a form with required fields', () => {
        const form = component.form;
        expect(form.contains('name')).toBeTrue();
        expect(form.contains('type')).toBeTrue();
        expect(form.contains('address')).toBeTrue();
        expect(form.contains('location')).toBeTrue();
        expect(form.contains('phone')).toBeTrue();
        expect(form.contains('email')).toBeTrue();
        expect(form.contains('latitude')).toBeTrue();
        expect(form.contains('longitude')).toBeTrue();
    });

    it('should not submit if the form is invalid', () => {
        component.submit();
        expect(mockStoreService.createStore).not.toHaveBeenCalled();
        expect(mockStoreService.updateStore).not.toHaveBeenCalled();
    });

    it('should create a store if form is valid and no storeId', () => {
        component.form.patchValue({
            name: 'Tienda X',
            type: 'zapateria',
            premium: false,
            address: 'Calle Falsa 123',
            location: 'Madrid',
            description: '',
            image: '',
            phone: '555555555',
            email: 'test@tienda.com',
            latitude: 40.4168,
            longitude: -3.7038
        });

        mockStoreService.createStore.and.returnValue(
            of({
                _id: '123',
                name: 'Tienda X',
                type: 'zapateria',
                premium: false,
                address: 'Calle Falsa 123',
                location: 'Madrid',
                description: '',
                image: '',
                phone: '123456789',
                email: 'test@tienda.com',
                latitude: 40.4168,
                longitude: -3.7038
            })
        );

        component.submit();

        expect(mockStoreService.createStore).toHaveBeenCalled();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
});
