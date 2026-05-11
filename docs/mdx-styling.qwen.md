# Estilos de Artículos MDX con Velite en agora-next

## Introducción
En agora-next, los artículos y contenido de blog se gestionan mediante Velite, un generador de contenido estático que convierte archivos MDX en datos consumibles por la aplicación Next.js. El sistema de estilos para estos artículos combina Tailwind CSS con estilos específicos para elementos MDX, integrándose con el sistema de tokens definido en log-ui-ts.

## Configuración de Velite
Velite se configura en `velite.config.ts` donde se definen colecciones de contenido. Los archivos MDX se almacenan en el directorio `/content` y se procesan durante el build para generar componentes MDX listos para renderizar.

## Integración con log-ui-ts
El sistema de estilos de agora-next se basa en log-ui-ts, que implementa un sistema de tokens de diseño compatible con shadcn/ui. Esto afecta a los estilos MDX de la siguiente manera:
- Las clases como `text-foreground`, `bg-card`, `border-border` provienen directamente del sistema de tokens
- Los colores y estilos se definen en el archivo `log-ui-ts/lib/globals.css` importado en `globals.css`
- Los componentes MDX heredan los estilos de diseño coherentes con el resto de la aplicación

## Procesamiento de Estilos MDX
1. **Transformación de Markdown**: Los archivos MDX se convierten a componentes React mediante el pipeline de Velite
2. **Aplicación de Tailwind**: Se utilizan clases de Tailwind con el sistema `prose` para estilos base
3. **Estilos personalizados**: Se aplican estilos específicos a través de `mdx.css` para elementos como bloques de código

## Sistema de Estilos Prose
El sistema `prose` de Tailwind proporciona estilos base para contenido generado. En agora-next se personaliza con clases como:
- `prose-headings:text-foreground` - Estilo para encabezados (usa token de log-ui-ts)
- `prose-p:text-foreground` - Estilo para párrafos (usa token de log-ui-ts)
- `prose-pre:bg-muted` - Fondo para bloques de código (usa token de log-ui-ts)
- `prose-a:text-primary` - Enlaces (usa token de log-ui-ts)

## Estilos de Código
Los bloques de código (```) se procesan con `rehype-pretty-code` que agrega atributos de datos como `[data-rehype-pretty-code-figure]`. Los estilos se definen en `mdx.css` para controlar:
- Fondo y padding de bloques de código usando tokens como `hsl(var(--muted))`
- Scroll horizontal para contenido largo
- Colores de sintaxis
- Números de línea

## Personalización de Componentes
Los componentes MDX se renderizan a través de `MDXContent` en `/src/components/academia/mdx-components.tsx`, permitiendo integrar componentes personalizados como `Callout` con estilos específicos que respetan el sistema de tokens de log-ui-ts.

## Gestión de Contenido
- Los artículos se almacenan en `/content/ejercicios/{locale}/`
- Se generan rutas dinámicas con `generateMetadata`
- El contenido se transforma y se aplica el esquema definido en la configuración de Velite

## Buenas Prácticas
- Uso de tokens de log-ui-ts como `text-foreground`, `bg-card`, `border-border` para mantener coherencia
- Estilos responsivos con Tailwind
- Scroll horizontal manejado adecuadamente para bloques de código largos
- Integración coherente con el sistema de diseño basado en tokens de log-ui-ts
