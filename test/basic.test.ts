import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

describe('ssr', async () => {
    await setup({
        rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    })

    it('renders the default locale on the server', async () => {
        const html = await $fetch('/')
        expect(html).toContain('Inicio')
        expect(html).toContain('Hola Ada')
        expect(html).toContain('Subtitulo ES')
        expect(html).toContain('[missing:es] page.home.missing')
        expect(html).toContain('es')
    })

    it('uses the custom locale cookie and fallback locale on the server', async () => {
        const html = await $fetch('/', {
            headers: {
                cookie: 'preferred-locale=en',
            },
        })

        expect(html).toContain('Home')
        expect(html).toContain('Hello Ada')
        expect(html).toContain('Subtitulo ES')
        expect(html).toContain('[missing:en] page.home.missing')
        expect(html).toContain('en')
    })

    it('detects the initial locale from the request headers when there is no cookie', async () => {
        const html = await $fetch('/', {
            headers: {
                'accept-language': 'en-US,en;q=0.9,es;q=0.8',
            },
        })

        expect(html).toContain('Home')
        expect(html).toContain('Hello Ada')
        expect(html).toContain('[missing:en] page.home.missing')
        expect(html).toContain('en')
    })
})
