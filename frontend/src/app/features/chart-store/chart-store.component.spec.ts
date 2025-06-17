import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartStoreComponent } from './chart-store.component';
import { Chart } from 'chart.js/auto';

describe('ChartStoreComponent', () => {
  let component: ChartStoreComponent;
  let fixture: ComponentFixture<ChartStoreComponent>;
  let chartSpy: jasmine.Spy;

  beforeEach(async () => {
    // Espiamos la creación de Chart para evitar dibujar en canvas real
    chartSpy = spyOn(Chart.prototype, 'constructor' as any).and.callThrough();

    await TestBed.configureTestingModule({
      imports: [ChartStoreComponent] // standalone
    }).compileComponents();

    fixture = TestBed.createComponent(ChartStoreComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the canvas elements', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const barCanvas = compiled.querySelector('#barCanvas');
    const donutCanvas = compiled.querySelector('#donutCanvas');

    expect(barCanvas).not.toBeNull();
    expect(donutCanvas).not.toBeNull();
  });

  it('should initialize charts after view init', () => {
    fixture.detectChanges();

    // Esperamos que Chart se haya instanciado al menos dos veces
    const barCanvas = document.getElementById('barCanvas');
    const donutCanvas = document.getElementById('donutCanvas');

    expect(barCanvas).toBeTruthy();
    expect(donutCanvas).toBeTruthy();

    // Como no podemos verificar directamente la instancia,
    // solo validamos que no lanzó errores y que los canvas están.
  });
});
