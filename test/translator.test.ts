import { describe, expect, it } from 'vitest'

import { translate } from '../src/runtime/internal/translator'

describe('translate', () => {
    const options = {
        cookie: {
            maxAge: 60,
            name: 'locale',
            sameSite: 'lax' as const,
            secure: false,
        },
        defaultLocale: 'es',
        dir: 'i18n',
        fallbackLocale: 'es',
        locales: [
            { code: 'es', file: 'es.ts' as const, name: 'Espanol' },
            { code: 'en', file: 'en.ts' as const, name: 'English' },
        ],
        warnOnMissing: true,
    }

    const messages = {
        en: {
            page: {
                home: {
                    title: 'Home',
                },
            },
        },
        es: {
            page: {
                home: {
                    subtitle: 'Subtitulo',
                    title: 'Inicio',
                },
            },
        },
    }

    it('falls back to the configured fallback locale', () => {
        const result = translate(messages, options, 'en', 'page.home.subtitle')

        expect(result.missing).toBe(false)
        expect(result.value).toBe('Subtitulo')
    })

    it('returns the key when the translation is missing in every locale', () => {
        const result = translate(messages, options, 'en', 'page.home.missing')

        expect(result.missing).toBe(true)
        expect(result.value).toBe('page.home.missing')
    })
})
