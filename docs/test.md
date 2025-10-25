# Testing Documentation

## Estructura de Tests

El proyecto utiliza Playwright para todos los tests, organizados en las siguientes categorías:

### 📁 Estructura de Carpetas

```
tests/
├── unit/                    # Tests unitarios (NO requieren servidor)
│   ├── core/               # Tests de funciones core
│   └── lib/                # Tests de utilidades compartidas
├── integration/            # Tests de integración (requieren servidor)
│   └── actions/            # Tests de server actions
├── e2e/                    # Tests end-to-end (requieren servidor)
│   ├── smoke/              # Tests básicos de funcionalidad
│   ├── accessibility/      # Tests de accesibilidad
│   └── performance/        # Tests de rendimiento
└── utils/                  # Utilidades compartidas para tests
```

## Comandos de Test

### Tests Unitarios (Sin servidor)
Los tests unitarios NO requieren que el servidor esté corriendo:

```bash
# Ejecutar tests unitarios
npm test
# o
npm run test:unit

# Ejecutar con coverage
npm run test:unit:coverage
```

### Tests de Integración (Requieren servidor)
Los tests de integración requieren que el servidor Next.js esté corriendo:

```bash
# Terminal 1: Iniciar servidor
npm run dev

# Terminal 2: Ejecutar tests
npm run test:integration

# Con coverage
npm run test:integration:coverage
```

### Tests E2E (Requieren servidor)
Los tests end-to-end requieren que el servidor Next.js esté corriendo:

```bash
# Terminal 1: Iniciar servidor
npm run dev

# Terminal 2: Ejecutar tests
npm run test:e2e

# Con coverage
npm run test:e2e:coverage
```

### Todos los Tests
Para ejecutar todos los tests:

```bash
# Todos los tests (asegúrate de tener el servidor corriendo para integration/e2e)
npm run test:all

# Todos los tests con coverage
npm run test:all:coverage
```

## Coverage

### Configuración de Coverage

El proyecto utiliza NYC (Istanbul) para medir el coverage. La configuración está en `.nycrc.json`:

```json
{
  "lines": 80,
  "branches": 80,
  "functions": 80,
  "statements": 80
}
```

### Requisitos de Coverage

- **Mínimo requerido**: 80% en todas las métricas
- **Pre-commit**: Los tests unitarios deben pasar con 80% coverage
- **CI/CD**: Todos los tests deben cumplir el mínimo de coverage

### Ver Reportes de Coverage

Los reportes de coverage se generan en:
- `./docs/coverage-reports/` - Reportes HTML
- Consola - Resumen de coverage después de ejecutar tests

```bash
# Generar reporte de coverage
npm run coverage

# Ver reporte en navegador
# Abrir: ./docs/coverage-reports/index.html
```

## Husky Hooks

### Pre-commit
Se ejecuta automáticamente antes de cada commit:

1. **Lint**: `npm run lint`
2. **Type Check**: `npm run type-check`
3. **Unit Tests con Coverage**: `npm run test:unit:coverage`

Estos checks NO requieren servidor y son rápidos.

### Commit-msg
Se ejecuta para validar el formato del mensaje de commit:

- **Formato**: Conventional Commits
- **Ejemplos válidos**:
  ```
  feat: add new feature
  fix: resolve bug in component
  docs: update testing documentation
  test: add unit tests for utils
  ```

## CI/CD

### GitHub Actions

El workflow de CI ejecuta:

1. Build del proyecto
2. Inicio del servidor
3. Todos los tests (unit + integration + e2e)
4. Validación de coverage mínimo

Ver: `.github/workflows/playwright.yml`

## Mejores Prácticas

### 1. Tests Unitarios
- ✅ Deben ser independientes del servidor
- ✅ Deben ejecutarse rápido (< 1s cada uno)
- ✅ Deben cubrir funciones puras y utilidades
- ✅ NO deben usar navegador ni hacer peticiones HTTP

### 2. Tests de Integración
- ✅ Requieren servidor corriendo
- ✅ Prueban la interacción entre componentes/módulos
- ✅ Pueden usar contexto de navegador
- ✅ Validan server actions y API routes

### 3. Tests E2E
- ✅ Requieren servidor corriendo
- ✅ Simulan flujos completos de usuario
- ✅ Incluyen navegación entre páginas
- ✅ Validan funcionalidad crítica del negocio

### 4. Coverage
- ✅ Mantener mínimo 80% en todas las métricas
- ✅ Revisar reportes antes de hacer PR
- ✅ Añadir tests para código nuevo
- ❌ No hacer commits que bajen el coverage

## Troubleshooting

### Tests fallan en pre-commit
```bash
# Ver qué tests están fallando
npm run test:unit

# Ver coverage actual
npm run test:unit:coverage
```

### Tests de integración/e2e fallan
```bash
# Asegúrate de que el servidor esté corriendo
npm run dev

# En otra terminal, ejecuta los tests
npm run test:integration
```

### Coverage bajo
```bash
# Ver qué archivos tienen bajo coverage
npm run coverage

# Revisar reporte HTML detallado
# Abrir: ./docs/coverage-reports/index.html
```

### Commit rechazado por formato
```bash
# El mensaje debe seguir conventional commits
# Formato: <type>: <description>

# Ejemplos correctos:
git commit -m "feat: add new component"
git commit -m "fix: resolve navigation issue"
git commit -m "test: improve coverage for utils"
```

## Recursos

- [Playwright Documentation](https://playwright.dev/)
- [NYC (Istanbul) Documentation](https://github.com/istanbuljs/nyc)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitlint](https://commitlint.js.org/)
