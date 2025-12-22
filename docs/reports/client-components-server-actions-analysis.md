# Análisis: Client Components que usan Server Actions - Agora-Next

## 🎯 Objetivo
Identificar qué componentes del cliente en **agora-next** necesitan implementar skeleton + fallback usando el patrón `SectionFallbackProvider` + `analyzeError()`.

---

## 📊 Componentes específicos de Agora-Next

### 1. **SubscriptionPlansDialog** (`src/components/academia/subscription-plans-dialog.tsx`)
**Server Actions usadas:**
- ❌ **NINGUNA** (solo Client Component)

**Funcionalidad:**
- Diálogo modal para seleccionar planes de suscripción
- Solo usa props `user` que viene del padre
- Genera links de pago con `generatePaymentLink()` (función utils, no Server Action)

**Estado:** ✅ **NO REQUIERE** manejo de errores
- No hace llamadas al servidor directamente
- Toda la lógica es del lado del cliente

---

### 2. **SubscriptionPlanCard** (`src/components/academia/subscription-plans-card.tsx`)
**Server Actions usadas:**
- `getCurrentUserUC()` - Obtener datos del usuario actual

**Componente interno:** `PlanButton`
- **Tipo:** Server Component (usa `await getCurrentUserUC()`)
- **Funcionalidad:** Renderiza botón apropiado según rol del usuario

**Tipo de errores esperados:**
- Error de conexión al backend (ECONNREFUSED)
- Error HTTP 500 del servidor
- Usuario no autenticado (null)

**Implementación necesaria:**
- ❌ **NO tiene try/catch** - El error se propaga sin manejo
- ❌ Necesita implementar patrón Server Component con try/catch
- ❌ Skeleton para mostrar mientras carga el estado del plan
- ❌ Fallback cuando falla la carga del usuario

**Prioridad:** 🟡 **MEDIA** 
- Funcionalidad importante para conversión de usuarios
- Error podría mostrar botones incorrectos

**Implementación sugerida:**
```typescript
// Server Component wrapper
async function PlanButtonSection({ planPrice, planName }: Props) {
  try {
    const user = await getCurrentUserUC();
    return <PlanButton user={user} planPrice={planPrice} planName={planName} />;
  } catch (error) {
    const serializedError = analyzeError(error);
    
    // Si es error silencioso, mostrar botón genérico
    if (serializedError.description.es === 'd') {
      return <Button className="w-full" disabled>Cargando...</Button>;
    }
    
    // Mostrar fallback con SectionFallbackProvider
    return (
      <SectionFallbackProvider error={serializedError}>
        <Button className="w-full" disabled>No disponible</Button>
      </SectionFallbackProvider>
    );
  }
}

// Skeleton
function PlanButtonSkeleton() {
  return <Button className="w-full" disabled>Cargando...</Button>;
}

// Uso con Suspense
<Suspense fallback={<PlanButtonSkeleton />}>
  <PlanButtonSection planPrice={plan.price} planName={plan.name} />
</Suspense>
```

---

### 3. **Callout** (`src/components/academia/callout.tsx`)
**Server Actions usadas:**
- `getCurrentUserUC()` - Verificar rol del usuario para mostrar contenido restringido

**Tipo:** Server Component

**Funcionalidad:**
- Componente de contenido condicional basado en rol
- Muestra warnings si el usuario no tiene el rol necesario
- Roles: `student`, `student_pro`, `verificado`, `default`

**Tipo de errores esperados:**
- Error de conexión al backend (ECONNREFUSED)
- Error HTTP 500 del servidor
- Usuario no autenticado (se maneja con `if (!user)`)

**Implementación necesaria:**
- ❌ **NO tiene try/catch** - El error se propaga sin manejo
- ❌ Necesita skeleton mientras carga el rol del usuario
- ❌ Fallback cuando falla la verificación de rol

**Prioridad:** 🔴 **ALTA**
- Protege contenido premium
- Error podría exponer contenido que debería estar bloqueado
- Usado en MDX de ejercicios (afecta UX de contenido)

**Implementación sugerida:**
```typescript
// Wrapper con manejo de errores
async function CalloutWithAuth({ children, type, role, ...props }: CalloutProps) {
  try {
    const user = await getCurrentUserUC();
    return <CalloutContent user={user} type={type} role={role} {...props}>{children}</CalloutContent>;
  } catch (error) {
    const serializedError = analyzeError(error);
    
    // Si es error silencioso, asumir no autenticado
    if (serializedError.description.es === 'd') {
      return <CalloutWarning type="verificado" />;
    }
    
    // Mostrar error con fallback
    return (
      <SectionFallbackProvider error={serializedError}>
        <CalloutWarning type="verificado" />
      </SectionFallbackProvider>
    );
  }
}

// Skeleton
function CalloutSkeleton() {
  return (
    <div className="my-2 items-start rounded-sm border border-l-2 px-2 w-full animate-pulse bg-muted">
      <div className="h-20"></div>
    </div>
  );
}

// Uso con Suspense
<Suspense fallback={<CalloutSkeleton />}>
  <CalloutWithAuth role="student">{children}</CalloutWithAuth>
</Suspense>
```

---

## 🔄 Componentes compartidos con Admin-Next (log-ui-ts)

Los siguientes componentes de `log-ui-ts` también se usan en agora-next:

### ✅ Ya implementados:
1. **CustomConnectButton** - Manejo completo de errores ✅
2. **UserConnectWrapper** - Skeleton + SectionFallbackProvider ✅

### 🔴 Pendientes (compartidos):
3. **UserFormDialog** - Necesita manejo de errores
4. **VerificacionEmailAlert** - Necesita manejo de errores
5. **DeleteUserButton** - Necesita manejo de errores
6. **SolicitudRoleButton** - Necesita manejo de errores

*(Ver análisis detallado en `admin-next/docs/reports/client-components-server-actions-analysis.md`)*

---

## 📋 Resumen Agora-Next

| Componente | Server Actions | Prioridad | Estado |
|------------|---------------|-----------|--------|
| SubscriptionPlansDialog | ❌ Ninguna | - | ✅ No requiere |
| SubscriptionPlanCard → PlanButton | `getCurrentUserUC()` | 🟡 Media | 🔴 Pendiente |
| Callout | `getCurrentUserUC()` | 🔴 Alta | 🔴 Pendiente |

---

## 🎯 Plan de implementación para Agora-Next

### Paso 1: **Callout** (Prioridad ALTA)
**Razón:** Protege contenido premium, error crítico

1. Crear wrapper `CalloutWithAuth` con try/catch
2. Implementar `CalloutSkeleton`
3. Refactorizar lógica de roles a componente Client `CalloutContent`
4. Usar `<Suspense>` en páginas de ejercicios
5. Agregar `SectionFallbackProvider` para errores

**Archivos a modificar:**
- `src/components/academia/callout.tsx`
- Potencialmente `src/app/[locale]/ejercicios/[...slug]/page.tsx` (para agregar Suspense)

---

### Paso 2: **SubscriptionPlanCard → PlanButton** (Prioridad MEDIA)

1. Crear wrapper `PlanButtonSection` con try/catch
2. Implementar `PlanButtonSkeleton`
3. Refactorizar `PlanButton` a Client Component que recibe `user` como prop
4. Usar `<Suspense>` en `SubscriptionPlanCard`
5. Agregar `SectionFallbackProvider` para errores

**Archivos a modificar:**
- `src/components/academia/subscription-plans-card.tsx`

---

## 🔧 Traducciones i18n necesarias

### Agregar en `log-ui-ts/i18n/{locale}/common.json`:

```json
{
  "errors": {
    "predefined": {
      "loadUserRole": {
        "title": "Error al verificar permisos",
        "description": "No se pudo verificar tu acceso al contenido"
      },
      "loadPlanStatus": {
        "title": "Error al cargar planes",
        "description": "No se pudo verificar tu suscripción actual"
      }
    }
  }
}
```

---

## 📊 Comparación Admin-Next vs Agora-Next

| Aspecto | Admin-Next | Agora-Next |
|---------|------------|------------|
| **Componentes con Server Actions** | 6 (auth + user management) | 2 (subscription + content protection) |
| **Prioridad ALTA** | UserFormDialog | Callout |
| **Prioridad MEDIA** | DeleteUserButton, VerificacionEmailAlert | SubscriptionPlanCard |
| **Prioridad BAJA** | SolicitudRoleButton | - |
| **Componentes compartidos** | log-ui-ts (todos) | log-ui-ts (todos) |

---

## ✅ Beneficios de la implementación

### Para Agora-Next específicamente:

1. **Protección de contenido premium más robusta**
   - Si falla `getCurrentUserUC()` en `Callout`, no expone contenido premium por error
   - Feedback claro al usuario si hay problemas de conexión

2. **Mejor UX en planes de suscripción**
   - Loading state mientras verifica el plan actual del usuario
   - Error handling si falla la verificación de suscripción
   - Evita mostrar botones incorrectos (ej: "Tu plan actual" cuando no cargó el usuario)

3. **Consistencia entre micro-frontends**
   - Mismo patrón de error handling en admin-next, agora-next, profile-next
   - Componentes compartidos de log-ui-ts con manejo unificado

---

## 🚀 Próximos pasos recomendados

1. ✅ **Implementar Callout primero** (contenido premium crítico)
2. ✅ **Implementar SubscriptionPlanCard** (conversión de usuarios)
3. ✅ **Completar componentes de log-ui-ts** (beneficia a todos los micro-frontends)
4. ✅ **Testing con backend apagado** para validar todos los flujos de error

---

## 🔗 Referencias

- Análisis Admin-Next: `admin-next/docs/reports/client-components-server-actions-analysis.md`
- Guía de error handling: `admin-next/log-ui-ts/error-handling-quick-guide.md`
- Patrón implementado: `CustomConnectButton` en `log-ui-ts/components/custom-connect-button.tsx`
