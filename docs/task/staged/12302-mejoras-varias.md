# Mejoras varias
## Key points
- [ ] Asegurar-se de que si no se le pasa variable de entorno(la que es por default en next), se ponga en el puerto 3002 por defecto, si ese no esta disponible que busque uno disponible como hace next de normal
- [ ] Incluir el desplegable de 'Apps' como esta en ../profile-next
### Desplegable
```ts
<NavigationMenuItem>
            <NavigationMenuTrigger>Apps</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <LinkLocale
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium">
                        Web, IIoT & PLC
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        desarrollador.tech
                      </p>
                    </LinkLocale>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="https://profile-skrt.vercel.app/es/academia"
                  title="Blog"
                >
                  Blog y formación para desarrolladores. SaaS de muestra.
                </ListItem>
                <ListItem
                  href="https://profile-skrt.vercel.app/es/admin"
                  title="Dashboard Admin"
                >
                  Panel de administración para gestionar la página y sus
                  contenidos.
                </ListItem>
                <li>
                  <NavigationMenuLink asChild>
                    <LinkLocale href="/">
                      <div className="text-sm leading-none font-medium">
                        Desarrollador
                      </div>
                      <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        Información sobre el desarrollador y su experiencia.
                      </p>
                    </LinkLocale>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
```
- Con la diferencia de que ahora '/' sera Blog, y la otra tendra que llevar a dev.desarollador.tech