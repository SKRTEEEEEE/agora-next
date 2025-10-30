# Fix: github action next.js
## Objetivo
Arreglar mi codigo o mi github action para que funcione correctamente el build de next.js
## Error
```bash
https://nextjs.org/telemetry

   ▲ Next.js 15.5.4 (Turbopack)

   Creating an optimized production build ...
 ✓ Finished writing to disk in 174ms
 ✓ Compiled successfully in 26.4s
   Linting and checking validity of types ...
   Collecting page data ...
Error: Client Id not found
    at o.initialize (.next/server/chunks/_aafe9ae8._.js:9:3744)
    at new eY (.next/server/chunks/_aafe9ae8._.js:9:3694)
    at new eZ (.next/server/chunks/_aafe9ae8._.js:9:4466)
    at new o (.next/server/chunks/_aafe9ae8._.js:9:12550)
    at __TURBOPACK__module__evaluation__ (.next/server/chunks/_aafe9ae8._.js:9:13865)
    at instantiateModule (.next/server/chunks/[turbopack]_runtime.js:702:9)
    at getOrInstantiateModuleFromParent (.next/server/chunks/[turbopack]_runtime.js:725:12)
    at Context.esmImport [as i] (.next/server/chunks/[turbopack]_runtime.js:215:20)
    at __TURBOPACK__module__evaluation__ (.next/server/chunks/[root-of-the-server]__355d2f3d._.js:1:129485)
    at instantiateModule (.next/server/chunks/[turbopack]_runtime.js:702:9)

> Build error occurred
[Error: Failed to collect page data for /[locale]/api/webhooks] {
  type: 'Error'
}
Error: Process completed with exit code 1.
```