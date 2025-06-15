import { Component, AfterViewInit, inject } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements AfterViewInit {
  ngAfterViewInit() {
    const calendarEl: HTMLElement = document.getElementById('calendar')!;

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
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
