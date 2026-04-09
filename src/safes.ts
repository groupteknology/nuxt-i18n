import type { NuxtI18nMessages, NuxtI18nOptions } from './types'

export function safeMessages(messages?: NuxtI18nMessages) {
    return messages || {}
}

export function safeOptions(options: NuxtI18nOptions) {
    return {
        defaultLocale: options.defaultLocale || 'es',
        dir: options.dir || 'i18n',
        locales: options.locales || [],
    }
}
