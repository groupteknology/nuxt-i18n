import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    compatibilityDate: 'latest',

    devtools: { enabled: true },

    i18n: {
        cookie: {
            name: 'playground-locale',
        },
        defaultLocale: 'es',
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
        warnOnMissing: true,
    },

    modules: ['@groupteknology/nuxt-i18n'],
})
