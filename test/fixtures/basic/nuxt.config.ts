import { defineNuxtConfig } from 'nuxt/config'

import MyModule from '../../../src/module'

export default defineNuxtConfig({
    i18n: {
        cookie: {
            name: 'preferred-locale',
        },
        defaultLocale: 'es',
        detectLocale: true,
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
        onMissing: (path, locale) => `[missing:${locale}] ${path}`,
        warnOnMissing: true,
    },
    modules: [MyModule],
})
