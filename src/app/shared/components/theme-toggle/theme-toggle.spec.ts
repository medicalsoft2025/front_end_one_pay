import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar isDark en false por defecto', () => {
    document.documentElement.classList.remove('dark');
    component.ngOnInit();
    expect(component.isDark).toBeFalsy();
  });

  it('debe detectar tema oscuro si está activo', () => {
    document.documentElement.classList.add('dark');
    component.ngOnInit();
    expect(component.isDark).toBeTruthy();
    document.documentElement.classList.remove('dark');
  });

  it('debe cambiar el tema al hacer click', () => {
    component.isDark = false;
    component.toggleTheme();
    expect(component.isDark).toBeTruthy();
    expect(document.documentElement.classList.contains('dark')).toBeTruthy();

    component.toggleTheme();
    expect(component.isDark).toBeFalsy();
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
  });

  it('debe guardar el tema en localStorage', () => {
    spyOn(localStorage, 'setItem');
    component.isDark = false;
    component.toggleTheme();
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');

    component.toggleTheme();
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('debe mostrar el icono del sol cuando el tema es claro', () => {
    component.isDark = false;
    fixture.detectChanges();
    const sunIcon = fixture.nativeElement.querySelectorAll('svg')[0];
    expect(sunIcon).toBeTruthy();
  });

  it('debe mostrar el icono de la luna cuando el tema es oscuro', () => {
    component.isDark = true;
    fixture.detectChanges();
    const moonIcon = fixture.nativeElement.querySelectorAll('svg')[1];
    expect(moonIcon).toBeTruthy();
  });

  it('debe tener aria-label para accesibilidad', () => {
    const button = fixture.nativeElement.querySelector('.theme-toggle');
    expect(button.getAttribute('aria-label')).toBe('Toggle theme');
  });
});
