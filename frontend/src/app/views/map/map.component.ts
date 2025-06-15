import { Component } from '@angular/core';
import { MapStoreComponent } from "../../features/map-store/map-store.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MapStoreComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

}
