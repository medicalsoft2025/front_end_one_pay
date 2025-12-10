# Pipes Básicos - OnePay

Colección de pipes reutilizables para Angular 21 para transformar datos en templates.

## Pipes Disponibles

### 1. **TruncatePipe**
Trunca texto a una longitud específica.

```typescript
import { TruncatePipe } from '@core/pipes';

// En el template
{{ 'Este es un texto muy largo' | truncate:10 }}
// Resultado: Este es u...

{{ 'Este es un texto muy largo' | truncate:10:'***' }}
// Resultado: Este es u***
```

**Parámetros:**
- `limit` (number, default: 20) - Número de caracteres
- `ellipsis` (string, default: '...') - Sufijo cuando se trunca

---

### 2. **PhoneFormatPipe**
Formatea números de teléfono con código de país.

```typescript
import { PhoneFormatPipe } from '@core/pipes';

// En el template
{{ '3005551234' | phoneFormat }}
// Resultado: +57 300 555 1234

{{ '3005551234' | phoneFormat:'+1' }}
// Resultado: +1 300 555 1234
```

**Parámetros:**
- `countryCode` (string, default: '+57') - Código de país

---

### 3. **CurrencyFormatPipe**
Formatea números como moneda con símbolo.

```typescript
import { CurrencyFormatPipe } from '@core/pipes';

// En el template
{{ 1500000 | currencyFormat }}
// Resultado: $ 1,500,000.00

{{ 1500000 | currencyFormat:'USD' }}
// Resultado: $ 1,500,000.00

{{ 1500000 | currencyFormat:'EUR' }}
// Resultado: € 1,500,000.00

{{ 1500000 | currencyFormat:'EUR':'€':0 }}
// Resultado: € 1,500,000
```

**Parámetros:**
- `currency` (string, default: 'COP') - Código de moneda (USD, EUR, COP, MXN, ARS, PEN, CLP, BRL)
- `symbol` (string, optional) - Símbolo personalizado
- `decimals` (number, default: 2) - Número de decimales

**Monedas Soportadas:**
- USD: $
- EUR: €
- COP: $
- MXN: $
- ARS: $
- PEN: S/
- CLP: $
- BRL: R$

---

### 4. **TimeAgoPipe**
Muestra el tiempo transcurrido en formato legible.

```typescript
import { TimeAgoPipe } from '@core/pipes';

// En el template
{{ '2024-12-10T15:30:00' | timeAgo }}
// Resultado: Hace 2 horas

{{ new Date() | timeAgo }}
// Resultado: Justo ahora
```

**Parámetros:**
- `value` (Date | string) - Fecha a comparar

---

### 5. **CapitalizePipe**
Convierte la primera letra a mayúscula.

```typescript
import { CapitalizePipe } from '@core/pipes';

// En el template
{{ 'john doe' | capitalize }}
// Resultado: John doe

{{ 'HELLO WORLD' | capitalize }}
// Resultado: Hello world
```

---

### 6. **PercentagePipe**
Calcula y formatea un porcentaje.

```typescript
import { PercentagePipe } from '@core/pipes';

// En el template
{{ 100 | percentage:20 }}
// Resultado: 20%

{{ 100 | percentage:33.33:2 }}
// Resultado: 33.33%
```

**Parámetros:**
- `value` (number) - Valor base
- `percent` (number) - Porcentaje a calcular
- `decimals` (number, default: 0) - Número de decimales

---

### 7. **BytesFormatPipe**
Convierte bytes a formato legible (KB, MB, GB, etc).

```typescript
import { BytesFormatPipe } from '@core/pipes';

// En el template
{{ 1024 | bytesFormat }}
// Resultado: 1 KB

{{ 1048576 | bytesFormat }}
// Resultado: 1 MB

{{ 1048576 | bytesFormat:3 }}
// Resultado: 1.000 MB
```

**Parámetros:**
- `value` (number) - Tamaño en bytes
- `decimals` (number, default: 2) - Número de decimales

---

### 8. **SafeHtmlPipe**
Renderiza contenido HTML de forma segura (sanitizado).

```typescript
import { SafeHtmlPipe } from '@core/pipes';

// En el component
htmlContent = '<strong>Bold text</strong>';

// En el template
<div [innerHTML]="htmlContent | safeHtml"></div>
// Resultado: <strong>Bold text</strong> renderizado
```

⚠️ **ADVERTENCIA:** Solo usa con contenido HTML de confianza. Evita contenido del usuario sin validar.

---

## Uso en Componentes

### Importar un pipe individual:
```typescript
import { CurrencyFormatPipe, PhoneFormatPipe } from '@core/pipes';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe, PhoneFormatPipe],
  template: `
    <p>Total: {{ total | currencyFormat }}</p>
    <p>Teléfono: {{ phone | phoneFormat }}</p>
  `
})
export class InvoiceComponent {
  total = 50000;
  phone = '3005551234';
}
```

### Importar múltiples pipes:
```typescript
import { 
  CurrencyFormatPipe, 
  PhoneFormatPipe, 
  TimeAgoPipe 
} from '@core/pipes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe, PhoneFormatPipe, TimeAgoPipe],
  // ...
})
export class DashboardComponent { }
```

---

## Ejemplos Prácticos

### Dashboard con datos financieros
```html
<div class="dashboard">
  <p>Total de ventas: {{ totalSales | currencyFormat:'COP':'$' }}</p>
  <p>Actualizado: {{ lastUpdate | timeAgo }}</p>
  <p>Comisión: {{ 100000 | percentage:5 }}</p>
</div>
```

### Formulario de contacto
```html
<form>
  <input type="text" placeholder="Nombre" [value]="fullName | capitalize">
  <input type="tel" placeholder="Teléfono" [value]="phone | phoneFormat">
  <textarea [value]="description | truncate:100"></textarea>
</form>
```

### Información de almacenamiento
```html
<div class="storage">
  <p>Disponible: {{ availableSpace | bytesFormat }}</p>
  <p>Usado: {{ usedSpace | bytesFormat:3 }}</p>
</div>
```

---

## Testing

```typescript
import { TestBed } from '@angular/core/testing';
import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyFormatPipe],
    });
    pipe = TestBed.inject(CurrencyFormatPipe);
  });

  it('should format number as currency', () => {
    const result = pipe.transform(1500000, 'COP');
    expect(result).toBe('$ 1,500,000.00');
  });

  it('should handle custom symbol', () => {
    const result = pipe.transform(1500000, 'COP', '$COP');
    expect(result).toBe('$COP 1,500,000.00');
  });
});
```

---

## Notas Importantes

1. **Pipes Standalone:** Todos los pipes son componentes standalone y se importan directamente
2. **Seguridad:** El pipe `SafeHtmlPipe` debe usarse solo con contenido seguro
3. **Performance:** Los pipes se ejecutan en cada cambio de detección de cambios
4. **Localización:** Los pipes están configurados en español (ej: "Hace 2 horas")

---

## Archivos

```
/src/app/core/pipes/
├── truncate.pipe.ts          # Trunca texto
├── phone-format.pipe.ts      # Formatea teléfono
├── currency-format.pipe.ts   # Formatea moneda
├── time-ago.pipe.ts          # Tiempo transcurrido
├── capitalize.pipe.ts        # Capitaliza texto
├── percentage.pipe.ts        # Calcula porcentaje
├── bytes-format.pipe.ts      # Formatea bytes
├── safe-html.pipe.ts         # Renderiza HTML seguro
└── index.ts                  # Exportaciones
```
