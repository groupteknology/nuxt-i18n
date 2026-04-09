import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    compatibilityDate: 'latest',

    devtools: { enabled: true },

    i18n: {
        cookie: {
            name: 'playground-locale',
        },
        defaultLocale: 'es',
        detectLocale: true,
        dir: 'i18n',
        fallbackLocale: 'es',
        locales: [
            {
                code: 'es',
                file: 'es.ts',
                name: 'Español',
            },
            {
                code: 'en',
                file: 'en.ts',
                name: 'English',
            },
        ],
        onMissing: (path, locale) => `[missing:${locale}] ${path}`,
        warnOnMissing: true,
    },

    modules: ['@groupteknology/nuxt-i18n'],
})
