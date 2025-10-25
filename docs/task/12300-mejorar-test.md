# Mejorar test
## Objetivo
Aconseguir un mejor test. Actualmente el test de CI no pasa (.github) y tambien he quitado de husky el test, esto es porque muchas veces (algunos test) me obliga a tener el servidor arrancado. Tambien los test pasan sin un minimo de coverage, etc...
## Key points
- [ ] Añadir la obligación de usar standard commits en pre-commit (`commit-msg`)
- [ ] Mejorar separación de comandos quedando claro la parte que necesitara algun tipo de servidor encendido(backend o frontend) y el resto
- [ ] Mejorar uso de coverage y obligación para pasar los test
- [ ] Mejorar husky para que haga como minimo una parte de los test y que esto sea independiente de si el servidor esta encendido o apagado
- [ ] Mejorar husky para que se mire el coverage de los test que se estan haciendo y que tenga un minimo de 80% siempre
- [ ] Mejorar la estructura de los test, añadiendo tantas carpetas como tipos de test creas que pueden ser necesarios, ordenandolos muy bien segun el tipo/categoria al que pertenecen
- [ ] Mejorar los comandos de test, para que sea mas claro cuando se usa coverage etc y documentarlo en ./docs/test.md