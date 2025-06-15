import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';



@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements AfterViewInit {
  ngAfterViewInit() {
    const calendarEl: HTMLElement = document.getElementById('calendar')!;

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: esLocale,
      editable: true,
      selectable: true,
      events: [],
      dateClick(info) {
        const title = prompt('Título del evento:');
        if (title) {
          calendar.addEvent({ title, start: info.dateStr });
        }
      },
      eventClick(info) {
        if (confirm(`¿Eliminar evento "${info.event.title}"?`)) {
          info.event.remove();
        }
      },
    });

    calendar.render();
  }
}
