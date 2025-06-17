import { Component, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation,inject} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import { MatDialog } from '@angular/material/dialog';
import { EventModalComponent } from '../../shared/ui/event-modal/event-modal.component';
import { ConfirmModalComponent } from '../../shared/ui/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements AfterViewInit {
  private dialog = inject(MatDialog);

  @ViewChild('calendarContainer', { static: true }) calendarContainer!: ElementRef;

  ngAfterViewInit(): void {
    const calendar = new Calendar(this.calendarContainer.nativeElement, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: esLocale,
      editable: true,
      selectable: true,
      events: [],
      dateClick: (info) => {
        const dialogRef = this.dialog.open(EventModalComponent);

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            calendar.addEvent({ title: result, start: info.dateStr });
          }
        });
      },
      eventClick: (info) => {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
          data: { title: info.event.title }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            info.event.remove();
          }
        });
      }
    });

    calendar.render();
  }
}
