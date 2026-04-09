# Arquitectura

Este documento está pensado para mantenedores. Explica cómo está conectado el módulo, qué se genera en tiempo de build y qué partes son más sensibles al cambio.

## Resumen

El proyecto tiene tres capas principales:

1. configuración del módulo en `src/module.ts`
2. generadores de build en `src/generator/*`
3. código de runtime en `src/runtime/*`

A grandes rasgos:

1. el usuario configura `i18n` en `nuxt.config.ts`
2. el módulo resuelve y valida esas opciones
3. el módulo genera archivos dentro del directorio de build de Nuxt
4. el plugin de runtime consume esos archivos generados
5. el plugin inyecta `$t`, `$locale`, `$locales` y `$setLocale`

## Estructura Del Código

### `src/module.ts`

Punto de entrada del módulo de Nuxt.

Responsabilidades:

- exporta los tipos públicos desde `src/types.ts`
- exporta `defineI18nLocale()` para preservar strings literales en los mensajes
- crea un contexto normalizado del módulo
- registra los templates generados
- registra el plugin de runtime
- registra los composables desde `src/runtime/app/composables`

### `src/core/*`

Lógica compartida de setup usada antes de la generación.

- `context.ts`: crea el objeto de contexto usado por los generadores
- `options.ts`: aplica defaults y produce `ResolvedNuxtI18nOptions`
- `validate.ts`: valida la configuración de locales y la existencia de archivos

### `src/generator/*`

Se encarga de escribir los archivos de los que dependen el runtime y el editor.

- `messages.ts`: genera `#build/nuxt-i18n.messages.mjs`
- `options.ts`: genera `#build/nuxt-i18n.options.mjs`
- `types.ts`: genera `.nuxt/types/nuxt-i18n.d.ts`
- `utils.ts`: utilidades auxiliares para normalizar imports y aliases de tipos

### `src/runtime/*`

Código de runtime que se distribuye a los proyectos consumidores.

- `app/plugins/i18n.ts`: plugin que resuelve el estado del locale e inyecta helpers
- `app/composables/useI18n.ts`: wrapper sobre las propiedades inyectadas en la app
- `internal/translator.ts`: búsqueda de traducciones y comportamiento de fallback
- `internal/messages.ts`: acceso profundo a mensajes por rutas con puntos
- `helpers/interpolate.ts`: reemplazo de placeholders `{name}` y `{{name}}`

## Archivos Generados

El módulo genera tres artefactos importantes durante `nuxt prepare` o durante el build del módulo:

### `#build/nuxt-i18n.messages.mjs`

Contiene un objeto con una forma como esta:

```ts
export const messages = {
    es: messages_es_0,
    en: messages_en_1,
}
```

Cada archivo de locale se importa desde el directorio `i18n/locales` de la app consumidora.

### `#build/nuxt-i18n.options.mjs`

Contiene las opciones de runtime ya resueltas:

- configuración de cookie
- `defaultLocale`
- `fallbackLocale`
- `detectLocale`
- locales configurados
- `warnOnMissing`
- `onMissing` serializado

Restricción importante:

- `onMissing` se emite usando `Function.prototype.toString()`
- debe mantenerse puro y autocontenido
- no debe depender de cierres definidos en `nuxt.config.ts`

### `.nuxt/types/nuxt-i18n.d.ts`

Amplía:

- `@groupteknology/nuxt-i18n`
- `#app`
- `nuxt/app`
- `vue`

Este archivo habilita:

- códigos de locale tipados
- rutas de traducción tipadas
- inferencia de params de interpolación
- tipado para `$t`, `$locale`, `$locales` y `$setLocale`

## Estrategia De Inferencia De Tipos

El locale por defecto es la fuente de verdad para los tipos.

`generateTypes()` importa cada archivo de locale y construye:

- `LocaleMap`
- `LocaleDefault`
- `LocalePath`
- `LocaleMessage<Path>`
- `LocaleParams<Path>`

Los params de interpolación se infieren a partir de placeholders en strings:

- `{name}`
- `{{name}}`

Eso significa que:

- el locale por defecto debería usar `defineI18nLocale(...)`
- los locales secundarios pueden usar `satisfies LocaleInput`
- si los strings literales se ensanchan demasiado pronto, la inferencia de params se debilita

## Flujo De Runtime

El plugin en `src/runtime/app/plugins/i18n.ts` hace lo siguiente:

1. lee `messages` y `runtimeOptions` generados
2. resuelve un locale inicial
3. persiste el estado del locale en una cookie
4. expone `locale` como un computed escribible
5. inyecta `t()` y los helpers de locale en la app de Nuxt

Orden de resolución del locale inicial:

1. valor existente en cookie
2. locale detectado si `detectLocale` está habilitado
3. `defaultLocale`

Fuentes para la detección:

- SSR: `Accept-Language`
- cliente: `navigator.languages`, luego `navigator.language`

Flujo de traducción:

1. intenta el locale activo
2. intenta `fallbackLocale` salvo que ya se esté usando
3. si sigue faltando, devuelve la ruta como fallback
4. si está configurado, llama a `onMissing(path, locale, fallbackLocale)`
5. si está configurado, registra un warning con `warnOnMissing`

## Reglas De Validación

`validateOptions()` exige:

- `code` de locale obligatorio
- `name` de locale obligatorio
- el archivo del locale debe terminar en `.ts`
- los códigos de locale deben ser únicos
- los archivos de locale deben existir en `<root>/<dir>/locales`
- `defaultLocale` debe existir dentro de los locales configurados
- `fallbackLocale` debe existir dentro de los locales configurados

## Notas De Build

En este repositorio existen dos contextos distintos de TypeScript.

### `tsconfig.json`

Se usa para el desarrollo con Nuxt. Extiende `./.nuxt/tsconfig.json`.

Este archivo debería seguir enfocado en desarrollo local y tooling del editor.

### `tsconfig.build.json`

Se usa solo para las comprobaciones del paquete en `npm run prepack`.

Este archivo existe porque la validación del build debe funcionar incluso cuando `.nuxt` no está presente.

Restricción importante:

- no reintroducir `src/runtime/tsconfig.json` ni `src/runtime/server/tsconfig.json`
- esos archivos pueden interferir con el desarrollo local y con la resolución del editor

## Limitaciones Conocidas

- no hay localización de rutas
- no hay SEO ni `hreflang`
- no hay motor ICU ni pluralización
- no hay estrategia de carga lazy por archivo de locale
- `onMissing` debe poder serializarse como texto fuente
- se espera que los mensajes de locale provengan de archivos `.ts`

## Checklist Para Cambios

Cuando cambies comportamiento, revisa estas áreas:

- `src/types.ts` para cambios en opciones públicas
- `src/core/options.ts` para resolución de defaults
- `src/core/validate.ts` para restricciones de configuración
- `src/generator/options.ts` si el runtime necesita una nueva opción
- `src/generator/types.ts` si cambia el tipado público
- `src/runtime/app/plugins/i18n.ts` si cambia el comportamiento en runtime
- `README.md` y `CHANGELOG.md` si el cambio es visible para usuarios
