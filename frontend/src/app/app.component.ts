import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/layout/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  protected title = 'frontend';
}
