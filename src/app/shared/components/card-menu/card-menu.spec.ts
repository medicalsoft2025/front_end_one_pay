import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardMenuComponent } from './card-menu';

describe('CardMenuComponent', () => {
  let component: CardMenuComponent;
  let fixture: ComponentFixture<CardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardMenuComponent);
    component = fixture.componentInstance;

    component.title = 'Test Title';
    component.subtitle = 'Test Subtitle';

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el título correctamente', () => {
    component.title = 'Mi Título';
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('.card-menu-title');
    expect(titleElement.textContent).toContain('Mi Título');
  });

  it('debe mostrar el subtítulo correctamente', () => {
    component.subtitle = 'Mi Subtítulo';
    fixture.detectChanges();

    const subtitleElement = fixture.nativeElement.querySelector('.card-menu-subtitle');
    expect(subtitleElement.textContent).toContain('Mi Subtítulo');
  });

  it('debe mostrar el icono cuando está presente', () => {
    component.icon = '📊';
    fixture.detectChanges();

    const iconElement = fixture.nativeElement.querySelector('.card-menu-icon');
    expect(iconElement).toBeTruthy();
    expect(iconElement.textContent).toContain('📊');
  });

  it('no debe mostrar el icono cuando no está presente', () => {
    component.icon = undefined;
    fixture.detectChanges();

    const iconElement = fixture.nativeElement.querySelector('.card-menu-icon');
    expect(iconElement).toBeFalsy();
  });

  it('debe recibir y mostrar todos los parámetros correctamente', () => {
    component.icon = '✨';
    component.title = 'Nuevo Título';
    component.subtitle = 'Nuevo Subtítulo';
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('.card-menu-title');
    const subtitleElement = fixture.nativeElement.querySelector('.card-menu-subtitle');
    const iconElement = fixture.nativeElement.querySelector('.card-menu-icon');

    expect(titleElement.textContent).toContain('Nuevo Título');
    expect(subtitleElement.textContent).toContain('Nuevo Subtítulo');
    expect(iconElement.textContent).toContain('✨');
  });
});
