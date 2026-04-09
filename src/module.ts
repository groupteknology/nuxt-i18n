import { addImportsDir, addPlugin, addTemplate, addTypeTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'

import type { NuxtI18nOptions } from './types'

import { createContext } from './core/context'
import { generateMessages } from './generator/messages'
import { generateTypes } from './generator/types'

export type { NuxtI18nLocale, NuxtI18nOptions } from './types'

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

        addTypeTemplate({ filename: 'types/nuxt-i18n.d.ts', getContents: () => generateTypes(ctx), write: true })

        addPlugin(resolver.resolve('./runtime/app/plugins/i18n'))

        addImportsDir(resolver.resolve('./runtime/app/composables'))
    },
})
