import { defineNuxtConfig } from 'nuxt/config'

import MyModule from '../../../src/module'

export default defineNuxtConfig({
    i18n: {
        cookie: {
            name: 'preferred-locale',
        },
        defaultLocale: 'es',
        dir: 'i18n',
        fallbackLocale: 'es',
        locales: [
            {
                code: 'es',
                file: 'es.ts',
                name: 'Espanol',
            },
            {
                code: 'en',
                file: 'en.ts',
                name: 'English',
            },
        ],
        warnOnMissing: true,
    },
    modules: [MyModule],
})
