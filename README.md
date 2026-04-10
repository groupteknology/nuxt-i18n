# @groupteknology/nuxt-i18n

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A small Nuxt i18n module focused on typed translations, simple setup, and SSR-safe locale persistence.

It is a good fit when you want:

- typed translation keys from your default locale
- typed interpolation params from message placeholders
- cookie-based locale persistence that works on SSR and client
- a minimal `useI18n()` API without routing, SEO, or domain strategies

## Features

- messages from local TypeScript files
- nested key lookup like `page.home.title`
- `t(path, params?)` with inferred params from `{name}` and `{{name}}`
- `locale`, `locales`, and `setLocale(code)` from `useI18n()`
- fallback to `fallbackLocale` when a key is missing
- optional locale detection from `Accept-Language` and `navigator.language`
- configurable cookie options
- `onMissing(path, locale, fallbackLocale)` for custom fallback text
- generated types for locale codes, translation paths, and params

## Install

```bash
pnpm add @groupteknology/nuxt-i18n
```

## Quick Setup

Register the module in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
    modules: ['@groupteknology/nuxt-i18n'],
    i18n: {
        defaultLocale: 'es',
        fallbackLocale: 'es',
        dir: 'i18n',
        detectLocale: true,
        warnOnMissing: true,
        cookie: {
            name: 'locale',
            sameSite: 'lax',
        },
        locales: [
            { code: 'es', file: 'es.ts', name: 'Español' },
            { code: 'en', file: 'en.ts', name: 'English' },
        ],
        onMissing: (path, locale) => `[missing:${locale}] ${path}`,
    },
})
```

Create your locale files in `i18n/locales`:

```ts
// i18n/locales/es.ts
import { defineI18nLocale } from '@groupteknology/nuxt-i18n'

export default defineI18nLocale({
    form: {
        placeholder: {
            name: 'Tu nombre es {{name}}',
        },
    },
    page: {
        home: {
            description: 'Esta es la página de inicio',
            title: 'Página de inicio',
        },
    },
})
```

```ts
// i18n/locales/en.ts
import type { LocaleInput } from '@groupteknology/nuxt-i18n'

export default {
    form: {
        placeholder: {
            name: 'Your name is {{name}}',
        },
    },
    page: {
        home: {
            description: 'This is the home page',
            title: 'Home page',
        },
    },
} satisfies LocaleInput
```

Use it in components:

```vue
<script setup lang="ts">
    const { locale, locales, setLocale, t } = useI18n()
</script>

<template>
    <div>
        <h1>{{ t('page.home.title') }}</h1>
        <p>{{ t('page.home.description') }}</p>
        <p>{{ t('form.placeholder.name', { name: 'Diego' }) }}</p>

        <button v-for="item in locales" :key="item.code" @click="setLocale(item.code)">
            {{ item.name }}
        </button>

        <pre>{{ locale }}</pre>
    </div>
</template>
```

## Typed Messages

The default locale is the source of truth for generated translation types.

- translation paths are inferred from the default locale object
- interpolation params are inferred from placeholders like `{{name}}`
- secondary locales can be partial by using `satisfies LocaleInput`

`defineI18nLocale()` helps preserve literal strings so TypeScript can infer params correctly. For example:

```ts
t('form.placeholder.name', { name: 'Ada' })
```

This is valid, while missing or misspelled params are caught by TypeScript.

## Locale Resolution

The active locale is resolved in this order:

1. cookie value
2. detected locale, if `detectLocale: true`
3. `defaultLocale`

When detection is enabled, the module checks:

- `Accept-Language` during SSR
- `navigator.languages` and `navigator.language` on the client

If a translation is missing in the active locale, the module tries `fallbackLocale`. If the key is still missing, `onMissing()` can return a custom string before `warnOnMissing` logs a warning.

## API

`useI18n()` returns:

- `locale`: current locale ref
- `locales`: configured locale list
- `setLocale(code)`: change the active locale
- `t(path, params?)`: translate a message

The plugin also injects:

- `$locale`
- `$locales`
- `$setLocale`
- `$t`

## Options

```ts
type NuxtI18nOptions = {
    cookie?: {
        maxAge?: number
        name?: string
        sameSite?: 'lax' | 'none' | 'strict'
        secure?: boolean
    }
    defaultLocale?: string
    detectLocale?: boolean
    dir?: string
    fallbackLocale?: string
    locales?: Array<{
        code: string
        file: `${string}.ts`
        name: string
    }>
    onMissing?: (path: string, locale: string, fallbackLocale: string) => string | undefined
    warnOnMissing?: boolean
}
```

## Scope

This module intentionally stays small.

Included:

- typed local messages
- cookie persistence
- SSR/client locale detection
- fallback locale support
- missing-key customization

Not included:

- localized routing
- SEO tags or `hreflang`
- domain-based locale strategies
- advanced message formatting or ICU syntax

## Local Development

```bash
npm install
npm run dev:prepare
npm run dev
```

Useful commands:

- `npm run dev:build`
- `npm run lint`
- `npm run prepack`
- `npm run release`

## Maintainer Docs

For internal project context:

- [`docs/ARCHITECTURE.md`](https://github.com/groupteknology/nuxt-i18n/blob/main/docs/ARCHITECTURE.md)
- [`docs/DEVELOPMENT.md`](https://github.com/groupteknology/nuxt-i18n/blob/main/docs/DEVELOPMENT.md)

These internal docs are currently written in Spanish.

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@groupteknology/nuxt-i18n/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@groupteknology/nuxt-i18n
[npm-downloads-src]: https://img.shields.io/npm/dm/@groupteknology/nuxt-i18n.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/@groupteknology/nuxt-i18n
[license-src]: https://img.shields.io/npm/l/@groupteknology/nuxt-i18n.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@groupteknology/nuxt-i18n
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com
