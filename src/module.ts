import { addImportsDir, addPlugin, addTemplate, addTypeTemplate, defineNuxtModule } from '@nuxt/kit'

import type { NuxtI18nOptions } from './types'

import { DEFAULT_OPTIONS } from './constants'
import { createContext } from './context'
import { generateMessages, generateTypes } from './genetate'

export type { NuxtI18nLocale, NuxtI18nMessages, NuxtI18nOptions } from './types'

export default defineNuxtModule<NuxtI18nOptions>({
    defaults: DEFAULT_OPTIONS,
    meta: {
        configKey: 'i18n',
        name: '@groupteknology/nuxt-i18n',
    },
    setup(options, nuxt) {
        const ctx = createContext(options, nuxt)

        addTemplate({ filename: 'nuxt-i18n.messages.mjs', getContents: () => generateMessages(ctx), write: true })

        addTypeTemplate({ filename: 'types/nuxt-i18n.d.ts', getContents: () => generateTypes(ctx), write: true })

        addPlugin(ctx.resolver.resolve('./runtime/app/plugins/i18n'))

        addImportsDir(ctx.resolver.resolve('./runtime/app/composables'))
    },
})
