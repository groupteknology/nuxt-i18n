import { defineI18nLocale } from '@groupteknology/nuxt-i18n'

export default defineI18nLocale({
    form: {
        label: {
            email: 'Correo electrónico',
            message: 'Mensaje',
            name: 'Nombre',
            surname: 'Apellido',
        },
        placeholder: {
            email: 'Introduce tu correo electrónico',
            message: 'Introduce tu mensaje',
            name: 'Tu nombre es {{name}}',
            surname: 'Introduce tu apellido',
        },
    },
    page: {
        home: {
            description: 'Esta es la página de inicio',
            onlySpanish: 'Solo existe en español',
            title: 'Página de inicio',
        },
    },
})
