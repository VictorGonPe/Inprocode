import { Component } from '@angular/core';
import { StoreListComponent } from "../../features/store-list/store-list.component";

@Component({
  selector: 'app-home',
  imports: [StoreListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
