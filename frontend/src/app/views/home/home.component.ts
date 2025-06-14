import { Component, signal, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../../core/interfaces/store.model';
import { StoreService } from '../../core/services/store.service';
import { StoreListComponent } from "../../features/store-list/store-list.component";

@Component({
  selector: 'app-home',
  imports: [StoreListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
