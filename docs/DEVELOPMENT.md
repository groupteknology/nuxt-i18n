# Desarrollo

Este documento resume el flujo práctico para trabajar sobre el módulo.

## Comandos Comunes

Instalar dependencias:

```bash
npm install
```

Preparar el playground y los stubs del módulo:

```bash
npm run dev:prepare
```

Levantar el playground:

```bash
npm run dev
```

Compilar la app del playground:

```bash
npm run dev:build
```

Ejecutar lint del repositorio:

```bash
npm run lint
```

Compilar el paquete:

```bash
npm run prepack
```

## Flujo De Release

La automatización actual de release en `package.json` es:

```bash
npm run release
```

Ese script ejecuta:

1. `npm run lint:fix`
2. `npm run prepack`
3. `changelogen --release`
4. `npm publish`
5. `git push --follow-tags`

En la práctica, los mantenedores normalmente también quieren revisar:

```bash
npm pack --dry-run
git status --short
git log --oneline --decorate -5
```

## Modelo De Trabajo

### Playground

La app `playground/` es la forma más rápida de validar la experiencia de desarrollo:

- registro del módulo
- tipos generados
- autoimport de `useI18n()`
- comportamiento real en runtime dentro de una app Nuxt

### Artefactos De Build

`npm run prepack` valida dos cosas:

1. TypeScript a nivel de paquete con `tsconfig.build.json`
2. el build distribuible real con `nuxt-module-build build`

Esta separación es intencional.

- `tsconfig.json` es para el comportamiento de Nuxt en editor y desarrollo
- `tsconfig.build.json` es para validar el paquete sin depender de `.nuxt`

## Convenciones

### Archivos De Locale

- los archivos de locale viven en `<dir>/locales`
- cada archivo de locale debe ser un módulo `.ts`
- el locale por defecto debería usar `defineI18nLocale(...)`
- los locales secundarios pueden usar `satisfies LocaleInput`

### Cambios En Runtime

Si agregas una nueva opción de runtime:

1. añádela en `src/types.ts`
2. resuélvela en `src/core/options.ts`
3. valídala si hace falta en `src/core/validate.ts`
4. emítela en `src/generator/options.ts`
5. consúmela en `src/runtime/*`
6. documéntala en `README.md`

### Cambios De Tipos

Si cambias el comportamiento del tipado:

1. revisa `src/generator/types.ts`
2. verifica que siga ampliando `#app`, `nuxt/app` y `vue`
3. comprueba la calidad de la inferencia en el playground

## Cosas A Evitar

- no añadir `src/runtime/tsconfig.json`
- no añadir `src/runtime/server/tsconfig.json`
- no hacer que `tsconfig.json` dependa de necesidades exclusivas de build
- no depender de cierres en `onMissing` que no puedan serializarse
- no ensanchar los mensajes del locale por defecto si quieres una inferencia fuerte de params

## Modelo Mental Útil

Si algo se rompe, piensa primero qué capa es la dueña del problema:

- forma de config o defaults: `src/types.ts`, `src/core/*`
- contenido de archivos generados: `src/generator/*`
- comportamiento en runtime: `src/runtime/*`
- comportamiento del editor o la inferencia: tipos generados más playground
