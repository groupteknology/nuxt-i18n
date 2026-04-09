import MyModule from '../../../src/module'

export default defineNuxtConfig({
  i18n: {
    defaultLocale: 'es',
    dir: 'i18n',
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
  },
  modules: [
    MyModule,
  ],
})
