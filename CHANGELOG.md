# Changelog

## v0.0.2

### Features

- configurable `fallbackLocale`
- configurable locale cookie options
- optional warnings for missing translations
- improved fallback and missing-key coverage in tests and playground

## v0.0.1

Initial public release of `@groupteknology/nuxt-i18n`.

### Features

- lightweight Nuxt i18n module with `useI18n()`
- typed translation keys derived from the default locale
- cookie-based locale persistence
- nested message lookup with fallback to `defaultLocale`
- string interpolation support for `{name}` and `{{name}}`
