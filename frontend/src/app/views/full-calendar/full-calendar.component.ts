import { Component } from '@angular/core';
import { CalendarComponent } from "../../features/calendar/calendar.component";

@Component({
  selector: 'app-full-calendar',
  imports: [CalendarComponent],
  templateUrl: './full-calendar.component.html',
  styleUrl: './full-calendar.component.scss'
})
export class FullCalendarComponent {

}
