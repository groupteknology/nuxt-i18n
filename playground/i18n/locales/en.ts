import type { LocaleInput } from '@groupteknology/nuxt-i18n'

export default {
    form: {
        label: {
            email: 'Email',
            message: 'Message',
            name: 'Name',
            surname: 'Surname',
        },
        placeholder: {
            email: 'Enter your email',
            message: 'Enter your message',
            name: 'Your name is {{name}}',
            surname: 'Enter your surname',
        },
    },
    page: {
        home: {
            description: 'This is the home page',
            title: 'Home page',
        },
    },
} satisfies LocaleInput
