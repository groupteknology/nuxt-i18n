import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    compatibilityDate: 'latest',

    devtools: { enabled: true },

    i18n: {
        defaultLocale: 'es',
        dir: 'i18n',
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
    },

    modules: ['@groupteknology/nuxt-i18n'],
})
