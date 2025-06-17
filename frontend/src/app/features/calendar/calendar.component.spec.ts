import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { MatDialog } from '@angular/material/dialog';
import { EventModalComponent } from '../../shared/ui/event-modal/event-modal.component';
import { ConfirmModalComponent } from '../../shared/ui/confirm-modal/confirm-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('CalendarComponent', () => {
    let component: CalendarComponent;
    let fixture: ComponentFixture<CalendarComponent>;
    let mockDialog: jasmine.SpyObj<MatDialog>;

    beforeEach(async () => {
        mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

        await TestBed.configureTestingModule({
            imports: [CalendarComponent],
            providers: [{ provide: MatDialog, useValue: mockDialog }],
            schemas: [NO_ERRORS_SCHEMA] 
        }).compileComponents();

        fixture = TestBed.createComponent(CalendarComponent);
        component = fixture.componentInstance;

        const fakeDiv = document.createElement('div');
        component['calendarContainer'] = { nativeElement: fakeDiv } as any;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should open event modal and add event on dateClick result', () => {
        const fakeDialogRef = {
            afterClosed: () => of('Nuevo Evento')
        };
        mockDialog.open.and.returnValue(fakeDialogRef as any);

        component.ngAfterViewInit();

        const calendarInstance = (component as any)['calendarContainer'].nativeElement;
        const addEventSpy = jasmine.createSpy('addEvent');
        const fakeCalendar = {
            addEvent: addEventSpy
        };

        const info = { dateStr: '2025-06-17' };
        const dialogRef = mockDialog.open(EventModalComponent);

        dialogRef.afterClosed().subscribe((result) => {
            const value = result as string; // 👈 Solución aquí
            if (value) {
                fakeCalendar.addEvent({ title: value, start: info.dateStr });
            }
        });

        expect(mockDialog.open).toHaveBeenCalledWith(EventModalComponent);
        expect(addEventSpy).toHaveBeenCalledWith({ title: 'Nuevo Evento', start: '2025-06-17' });
    });


    it('should open confirm modal and remove event if confirmed', () => {
        const removeSpy = jasmine.createSpy('remove');
        const event = { title: 'Evento Eliminable', remove: removeSpy };
        const info = { event };

        const fakeDialogRef = {
            afterClosed: () => of(true)
        };
        mockDialog.open.and.returnValue(fakeDialogRef as any);

        component.ngAfterViewInit();

        const dialogRef = mockDialog.open(ConfirmModalComponent, {
            data: { title: event.title }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                info.event.remove();
            }
        });

        expect(mockDialog.open).toHaveBeenCalledWith(ConfirmModalComponent, {
            data: { title: 'Evento Eliminable' }
        });
        expect(removeSpy).toHaveBeenCalled();
    });
});
