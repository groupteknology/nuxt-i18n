# Changelog

## v0.0.6

[compare changes](https://github.com/groupteknology/nuxt-i18n/compare/v0.0.5...v0.0.6)

### 📖 Documentation

- improve the README with clearer setup, API and maintainer references
- add internal maintainer docs for architecture and development workflow
- translate internal project docs in `docs/` to Spanish

### 🏡 Chore

- update the playground example translation params

### ❤️ Contributors

- Diego Otayza <xpedition.dev@outlook.com>

## v0.0.5

[compare changes](https://github.com/groupteknology/nuxt-i18n/compare/v0.0.4...v0.0.5)

### 🏡 Chore

- Remove runtime tsconfig ([9e96d84](https://github.com/groupteknology/nuxt-i18n/commit/9e96d84))

### ❤️ Contributors

- Diego Otayza <xpedition.dev@outlook.com>

## v0.0.4

### Features

- dedicated `tsconfig.build.json` for package checks during `prepack`

### Chore

- removed test scripts, dependencies, fixtures and CI test job
- removed `src/runtime/server/tsconfig.json` to avoid interfering with local development

## v0.0.3

### Features

- typed interpolation params inferred from the default locale message strings via `defineI18nLocale()`
- optional initial locale detection from request/browser language
- `onMissing(path, locale, fallbackLocale)` for custom missing-translation fallbacks

## v0.0.2

### Features

- configurable `fallbackLocale`
- configurable locale cookie options
- optional warnings for missing translations
- improved fallback and missing-key coverage in the playground

## v0.0.1

Initial public release of `@groupteknology/nuxt-i18n`.

### Features

- lightweight Nuxt i18n module with `useI18n()`
- typed translation keys derived from the default locale
- cookie-based locale persistence
- nested message lookup with fallback to `defaultLocale`
- string interpolation support for `{name}` and `{{name}}`
