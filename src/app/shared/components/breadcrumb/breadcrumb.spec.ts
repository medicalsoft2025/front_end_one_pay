import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent, BreadcrumbItem } from './breadcrumb';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;

    component.items = [
      { label: 'Inicio', url: '/' },
      { label: 'Usuarios', url: '/usuarios' },
      { label: 'Perfil' },
    ];

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar todos los items', () => {
    const items = fixture.nativeElement.querySelectorAll('.breadcrumb-item');
    expect(items.length).toBe(3);
  });

  it('debe mostrar enlaces para items que no son últimos y tienen URL', () => {
    const links = fixture.nativeElement.querySelectorAll('.breadcrumb-link');
    expect(links.length).toBe(2);
  });

  it('debe mostrar texto para el último item sin URL', () => {
    const texts = fixture.nativeElement.querySelectorAll('.breadcrumb-text');
    expect(texts.length).toBeGreaterThan(0);
  });

  it('debe mostrar separadores correctamente', () => {
    const separators = fixture.nativeElement.querySelectorAll('.breadcrumb-separator');
    expect(separators.length).toBe(2);
  });

  it('debe manejar items vacíos', () => {
    component.items = [];
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.breadcrumb-item');
    expect(items.length).toBe(0);
  });

  it('debe mostrar un solo item sin separador', () => {
    component.items = [{ label: 'Inicio', url: '/' }];
    fixture.detectChanges();

    const separators = fixture.nativeElement.querySelectorAll('.breadcrumb-separator');
    expect(separators.length).toBe(0);
  });

  it('debe mostrar item sin URL como texto', () => {
    component.items = [{ label: 'Sin URL' }];
    fixture.detectChanges();

    const text = fixture.nativeElement.querySelector('.breadcrumb-text');
    expect(text).toBeTruthy();
    expect(text.textContent).toContain('Sin URL');
  });
});
