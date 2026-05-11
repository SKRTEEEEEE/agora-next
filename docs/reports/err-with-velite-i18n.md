# Error con Velite e i18n en agora-next

Cuando se cambia de idioma en las páginas de artículos usando el sistema de internacionalización, se produce un fallo en la detección de los artículos por parte de Velite. 

El problema radica en cómo se construyen las rutas al cambiar de idioma. Al navegar entre locales en URLs como `/es/ejercicios/[...slug]`, `/ca/exercicis/[...slug]`, `/en/exercises/[...slug]` o `/de/ubungen/[...slug]`, el sistema de rutas no mapea correctamente los parámetros dinámicos entre diferentes idiomas.

Velite genera colecciones de contenido con rutas específicas para cada idioma, pero cuando el sistema de i18n intenta cambiar entre locales, no siempre encuentra la correspondencia exacta del artículo en el nuevo idioma. Esto ocurre porque:

1. Las rutas dinámicas `[...slug]` deben coincidir exactamente entre idiomas
2. El sistema de enrutamiento debe preservar los parámetros durante el cambio de idioma
3. Las colecciones de Velite están organizadas por idioma y deben tener correspondencia exacta

El resultado es que al cambiar de idioma en una página de artículo, no se encuentra el artículo equivalente en el nuevo idioma, causando errores de navegación o páginas vacías. La solución implica asegurar una correspondencia precisa entre artículos traducidos y una correcta manipulación de parámetros durante la conmutación de idiomas.
