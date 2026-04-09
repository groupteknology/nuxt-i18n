# @groupteknology/nuxt-i18n

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Lightweight i18n module for Nuxt with:

- typed translation keys from your default locale
- SSR-safe locale resolution with cookie persistence
- simple `useI18n()` API without route strategies or SEO overhead

## Features

- nested messages from local `.ts` files
- `$t(path, params?)` interpolation with typed params from `{name}` and `{{name}}`
- `$locale`, `$locales` and `$setLocale(code)`
- optional initial locale detection from `Accept-Language` / `navigator.language`
- fallback to `fallbackLocale` when a key is missing in the active locale
- configurable locale cookie, `onMissing()` and optional missing-key warnings
- generated types for locale codes, translation paths and interpolation params

## Quick Setup

Install the module:

```bash
pnpm add @groupteknology/nuxt-i18n
```

Register it in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
    modules: ['@groupteknology/nuxt-i18n'],
    i18n: {
        cookie: {
            name: 'locale',
            sameSite: 'lax',
        },
        detectLocale: true,
        defaultLocale: 'es',
        dir: 'i18n',
        fallbackLocale: 'es',
        locales: [
            { code: 'es', file: 'es.ts', name: 'Espanol' },
            { code: 'en', file: 'en.ts', name: 'English' },
        ],
        onMissing: (path, locale) => `[missing:${locale}] ${path}`,
        warnOnMissing: true,
    },
})
```

Create locale files in `i18n/locales`:

```ts
// i18n/locales/es.ts
import { defineI18nLocale } from '@groupteknology/nuxt-i18n'

export default defineI18nLocale({
    page: {
        home: {
            title: 'Inicio',
            welcome: 'Hola {{name}}',
        },
    },
})
```

```ts
// i18n/locales/en.ts
import { defineI18nLocale } from '@groupteknology/nuxt-i18n'
import type { LocaleInput } from '@groupteknology/nuxt-i18n'

export default defineI18nLocale({
    page: {
        home: {
            title: 'Home',
            welcome: 'Hello {{name}}',
        },
    },
} satisfies LocaleInput)
```

`defineI18nLocale()` preserves literal message strings, so the generated types can infer interpolation params from your default locale. For example, `t('page.home.welcome', { name: 'Ada' })` is accepted, while missing or misspelled params are caught by TypeScript.

If you enable `detectLocale: true`, the module will try to match the first request language against your configured locales on SSR and `navigator.language` on the client. When a translation is missing in every locale, `onMissing(path, locale, fallbackLocale)` lets you return a custom fallback string before `warnOnMissing` logs anything.

Use it in components:

```vue
<script setup lang="ts">
    const { locale, locales, setLocale, t } = useI18n()
</script>

<template>
    <div>
        <h1>{{ t('page.home.title') }}</h1>
        <p>{{ t('page.home.welcome', { name: 'Ada' }) }}</p>

        <button v-for="item in locales" :key="item.code" @click="setLocale(item.code)">
            {{ item.name }}
        </button>

        <pre>{{ locale }}</pre>
    </div>
</template>
```

## Scope

This module is intentionally small. It does include:

- messages loaded from local TypeScript files
- cookie-based locale persistence
- optional initial locale detection
- typed keys based on the default locale
- configurable fallback locale, `onMissing()` and missing-key warnings

It does not include:

- localized routing
- browser language detection
- SEO tags or `hreflang`
- domain-based locale strategies

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@groupteknology/nuxt-i18n/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@groupteknology/nuxt-i18n
[npm-downloads-src]: https://img.shields.io/npm/dm/@groupteknology/nuxt-i18n.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/@groupteknology/nuxt-i18n
[license-src]: https://img.shields.io/npm/l/@groupteknology/nuxt-i18n.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@groupteknology/nuxt-i18n
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com
