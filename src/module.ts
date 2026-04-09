import { addImportsDir, addPlugin, addTemplate, addTypeTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'

import type { NuxtI18nOptions } from './types'

import { createContext } from './core/context'
import { generateMessages } from './generator/messages'
import { generateOptions } from './generator/options'
import { generateTypes } from './generator/types'

export type { NuxtI18nCookieOptions, NuxtI18nLocale, NuxtI18nOnMissing, NuxtI18nOptions } from './types'

export function defineI18nLocale<const T extends Record<string, unknown>>(locale: T): T {
    return locale
}

const resolver = createResolver(import.meta.url)

export default defineNuxtModule<NuxtI18nOptions>({
    defaults: {
        defaultLocale: 'es',
        dir: 'i18n',
        locales: [],
    },
    meta: {
        configKey: 'i18n',
        name: '@groupteknology/nuxt-i18n',
    },
    setup(options, nuxt) {
        const ctx = createContext(options, nuxt)

        addTemplate({ filename: 'nuxt-i18n.messages.mjs', getContents: () => generateMessages(ctx), write: true })
        addTemplate({ filename: 'nuxt-i18n.options.mjs', getContents: () => generateOptions(ctx), write: true })

        addTypeTemplate({ filename: 'types/nuxt-i18n.d.ts', getContents: () => generateTypes(ctx), write: true })

        addPlugin(resolver.resolve('./runtime/app/plugins/i18n'))

        addImportsDir(resolver.resolve('./runtime/app/composables'))
    },
})
