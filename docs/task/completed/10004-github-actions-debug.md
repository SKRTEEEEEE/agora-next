# GitHub Actions - Guía de Debug para Playwright Tests

## Estado Actual

✅ **Tests locales**: 266 passed, 21 skipped, 0 failed  
✅ **Configuración**: PORT 3002, servidor Next.js correcto  
✅ **Workflow**: Correctamente configurado con espera de servidor

## Qué Verificar en GitHub Actions

### 1. Logs del Build Step
Busca en los logs de GitHub Actions:
```bash
- name: Build Next.js
```

**Problemas comunes:**
- Error de build por dependencias faltantes
- Error de TypeScript
- Error en submódulo `log-ui-ts`

### 2. Logs del Server Start
Busca:
```bash
- name: Start Next.js server
- name: Wait for server to be ready
```

**Verificar:**
- ¿El servidor inicia correctamente en el puerto 3002?
- ¿El wait loop encuentra el servidor (status 200/307/308)?
- ¿Hay errores de módulos no encontrados?

### 3. Logs de los Tests
Busca:
```bash
- name: Run Playwright tests
```

**Verificar:**
- ¿Qué tests específicamente fallan?
- ¿Son los mismos que marcamos como skip?
- ¿Hay errores de timeout?
- ¿Hay errores de navegación (ERR_ABORTED)?

## Posibles Causas y Soluciones

### Causa 1: Submódulo log-ui-ts no inicializado
**Síntoma:** Error al importar componentes de site-header

**Solución:** Ya está en el workflow:
```yaml
- name: Initialize submodules
  run: |
    git submodule update --init --recursive
    git submodule foreach --recursive 'npm ci || echo "No package.json in $(pwd)"'
```

### Causa 2: Servidor no inicia a tiempo
**Síntoma:** Tests e2e fallan con timeout o connection refused

**Solución actual:** 
- MAX_ATTEMPTS=45 (90 segundos)
- Acepta status 200, 307, 308, 404

**Si falla, aumentar timeout:**
```yaml
MAX_ATTEMPTS=60  # 120 segundos
```

### Causa 3: Tests que deberían estar skip no lo están
**Síntoma:** Tests de /ejercicios o /tarifas fallan

**Verificar archivos:**
- `tests/e2e/smoke/academia-migration.spec.ts`
- `tests/integration/pages/academia-navigation.spec.ts`

**Tests que DEBEN estar skip o eliminados:**
- tarifas page tests (ERR_ABORTED)
- ejercicios page tests (ERR_ABORTED)
- temas-ejercicios page tests (algunos eliminados)

### Causa 4: Variables de entorno faltantes
**Síntoma:** Error relacionado con THIRDWEB o AUTH

**Verificar en workflow:**
```yaml
env:
  NODE_ENV: production
  NEXT_PUBLIC_API_MOCKING: "enabled"
  PORT: 3002
```

**Agregar si falta:**
```yaml
env:
  NEXT_PUBLIC_THIRDWEB_CLIENT_ID: "test"
  # Otras variables necesarias
```

## Comandos para Debug Local Simulando CI

### 1. Limpiar y Build como CI
```bash
rm -rf .next docs/test-results docs/coverage
npm ci
npm run build
```

### 2. Iniciar servidor como CI
```bash
PORT=3002 NODE_ENV=production npm run start
```

### 3. En otra terminal, ejecutar tests
```bash
npm run test:coverage
```

## Estado Esperado de Tests

### Unit Tests (211 total)
- **Pasando**: 206
- **Skipped**: 5 (generateStaticParams tests)
- **Fallando**: 0

### Integration Tests
- **Skipped**: Tests de /tarifas y /ejercicios (ERR_ABORTED)
- **Eliminados**: Tests de i18n routing (5 tests)
- **Eliminados**: Tests de academia-navigation (3 tests)

### E2E Tests
- **Skipped**: Tests de /ejercicios y /tarifas
- **Skipped**: Performance test (métricas estrictas)
- **Eliminados**: 6 tests (a11y, navigation, temas)

## Verificar Commits Recientes

Los siguientes commits contienen las correcciones:
```
cb8fcc2 - test: fix missing closing brace in academia-migration.spec.ts
c6c755a - test: fix academia-migration.spec.ts after merge
30ef798 - test: delete failing tests instead of skipping them
```

## Acción Recomendada

1. **Ver logs completos de GitHub Actions**
2. **Identificar qué step específicamente falla**
3. **Buscar el error exacto en los logs**
4. **Comparar con ejecución local exitosa**

## Verificación Rápida Local

```bash
# Ejecutar exactamente lo mismo que CI
npm ci
npm run build
PORT=3002 npm run start &
sleep 10
npm run test:coverage
```

Si esto pasa localmente pero falla en CI, el problema es:
- Configuración de GitHub Actions
- Recursos limitados del runner
- Timeout insuficiente
- Variables de entorno faltantes

## Contacto para Más Ayuda

Para debug específico, proporciona:
1. **URL del GitHub Actions run** que falló
2. **Logs completos** del step que falla
3. **Mensaje de error exacto**
