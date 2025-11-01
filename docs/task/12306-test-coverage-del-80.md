# Issue #12306: Test Coverage del 80%

## Objetivo
Incrementar la cobertura de tests del proyecto del 64% actual al 80% requerido.

## Estado Actual
- Cobertura actual: ~64%
- Cobertura objetivo: 80%
- Tests existentes: 35 tests unitarios pasando

## Análisis de Cobertura

### Archivos con baja cobertura:
1. **src/core/presentation/controllers/user.ts** - 0% de cobertura
   - Necesita tests para `userInCookiesUC()`
   
2. **src/lib/utils.ts** - 84% de cobertura
   - Líneas sin cubrir: 40, 71-79
   - Función `generatePaymentLink()` sin tests

3. **src/actions/user.ts** - No incluido en reporte
   - Funciones server actions sin tests

## Plan de Acción

### PRE-BUCLE:
1. ✅ Leer documentación del task
2. Generar tests unitarios para:
   - `src/core/presentation/controllers/user.ts`
   - `src/lib/utils.ts` (función `generatePaymentLink`)
   - `src/actions/user.ts` (server actions)
   - Otros módulos principales

### BUCLE (max 3 iteraciones):
1. Ejecutar tests con coverage
2. Verificar que se alcanza 80% de cobertura
3. Corregir errores si los hay
4. Validar Docker y build

### VALIDACIÓN:
1. Linting y type checking
2. Build del proyecto
3. Tests pasando con >80% coverage

### POST-BUCLE:
1. Actualizar README si necesario
2. Commit con mensaje descriptivo
3. Generar resumen en `docs/task/end/12306-test-coverage-del-80.md`

## Estrategia de Tests
- Tests unitarios puros (sin servidor)
- Mocks para dependencias externas
- Cobertura de casos edge
- Validación de errores y excepciones
