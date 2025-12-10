import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatCardComponent } from './stat-card';

describe('StatCardComponent', () => {
  let component: StatCardComponent;
  let fixture: ComponentFixture<StatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatCardComponent);
    component = fixture.componentInstance;

    component.title = 'Ingresos';
    component.value = '$45,200';
    component.change = '+12.5%';
    component.trend = 'up';
    component.icon = '💰';
    component.color = 'green';

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el título correctamente', () => {
    const title = fixture.nativeElement.querySelector('.stat-card-title');
    expect(title.textContent).toContain('Ingresos');
  });

  it('debe mostrar el valor correctamente', () => {
    const value = fixture.nativeElement.querySelector('.stat-card-value');
    expect(value.textContent).toContain('$45,200');
  });

  it('debe mostrar el cambio correctamente', () => {
    const change = fixture.nativeElement.querySelector('.stat-card-change');
    expect(change.textContent).toContain('+12.5%');
  });

  it('debe mostrar el icono correctamente', () => {
    const icon = fixture.nativeElement.querySelector('.stat-card-icon');
    expect(icon.textContent).toContain('💰');
  });

  it('debe asignar la clase de color correcta', () => {
    component.color = 'green';
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.stat-card-icon');
    expect(icon.classList.contains('stat-green')).toBeTruthy();
  });

  it('debe asignar la clase de trend correcta para up', () => {
    component.trend = 'up';
    fixture.detectChanges();
    const change = fixture.nativeElement.querySelector('.stat-card-change');
    expect(change.classList.contains('trend-up')).toBeTruthy();
  });

  it('debe asignar la clase de trend correcta para down', () => {
    component.trend = 'down';
    fixture.detectChanges();
    const change = fixture.nativeElement.querySelector('.stat-card-change');
    expect(change.classList.contains('trend-down')).toBeTruthy();
  });

  it('debe mostrar icono de trend correcto', () => {
    component.trend = 'up';
    expect(component.trendIcon).toBe('📈');

    component.trend = 'down';
    expect(component.trendIcon).toBe('📉');

    component.trend = 'neutral';
    expect(component.trendIcon).toBe('➡️');
  });

  it('debe soportar diferentes colores', () => {
    const colors: Array<'green' | 'red' | 'blue' | 'purple'> = ['green', 'red', 'blue', 'purple'];

    colors.forEach((color) => {
      component.color = color;
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.stat-card-icon');
      expect(icon.classList.contains(`stat-${color}`)).toBeTruthy();
    });
  });
});
