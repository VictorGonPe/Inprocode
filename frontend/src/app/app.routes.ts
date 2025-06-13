import { Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { MapComponent } from './views/map/map.component';
import { GraphicsComponent } from './views/graphics/graphics.component';
import { FullCalendarComponent } from './views/full-calendar/full-calendar.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'map', component: MapComponent },
    { path: 'calendar', component: FullCalendarComponent },
    { path: 'graphics', component: GraphicsComponent },
    { path: '**', redirectTo: '' }
];
