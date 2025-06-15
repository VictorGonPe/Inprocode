import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto'; // <-- importante usar 'auto'

@Component({
  selector: 'app-chart-store',
  standalone: true,
  imports: [],
  templateUrl: './chart-store.component.html',
  styleUrl: './chart-store.component.scss'
})
export class ChartStoreComponent implements AfterViewInit {

  ngAfterViewInit(): void {
   
    new Chart('barCanvas', {
      type: 'bar',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3'],
        datasets: [
          {
            label: 'Visitantes únicos',
            data: [90, 200, 180],
            backgroundColor: '#36A2EB',
          },
          {
            label: 'Visitantes totales',
            data: [140, 400, 350],
            backgroundColor: '#f9c74f',
          },
        ]
      },
      options: {
        responsive: true
      }
    });

  
    new Chart('donutCanvas', {
      type: 'doughnut',
      data: {
        labels: ['V. Únicos', 'V. Totales', 'Impresiones del perfíl'],
        datasets: [
          {
            data: [400, 800, 1200],
            backgroundColor: ['#f9c74f', '#36A2EB', '#FF6384'],
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }
}
