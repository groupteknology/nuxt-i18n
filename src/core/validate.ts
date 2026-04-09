import { existsSync } from 'node:fs'
import { resolve } from 'pathe'

import type { ResolvedNuxtI18nOptions } from './options'

export function validateOptions(options: ResolvedNuxtI18nOptions, rootDir: string) {
    if (options.locales.length === 0) {
        return
    }

    const localeCodes = new Set<string>()

    options.locales.forEach((locale) => {
        if (!locale.code) {
            throw new Error('[nuxt-i18n] Each locale must define a non-empty `code`.')
        }

        if (!locale.name) {
            throw new Error(`[nuxt-i18n] Locale \`${locale.code}\` must define a non-empty \`name\`.`)
        }

        if (!locale.file.endsWith('.ts')) {
            throw new Error(`[nuxt-i18n] Locale \`${locale.code}\` must use a \`.ts\` file. Received \`${locale.file}\`.`)
        }

        if (localeCodes.has(locale.code)) {
            throw new Error(`[nuxt-i18n] Duplicate locale code \`${locale.code}\` found in \`i18n.locales\`.`)
        }

        const localeFile = resolve(rootDir, options.dir, 'locales', locale.file)

        if (!existsSync(localeFile)) {
            throw new Error(`[nuxt-i18n] Locale file not found for \`${locale.code}\`: \`${localeFile}\`.`)
        }

        localeCodes.add(locale.code)
    })

    if (!localeCodes.has(options.defaultLocale)) {
        throw new Error(`[nuxt-i18n] \`defaultLocale\` must match one of the configured locales. Received \`${options.defaultLocale}\`.`)
    }

    if (!localeCodes.has(options.fallbackLocale)) {
        throw new Error(`[nuxt-i18n] \`fallbackLocale\` must match one of the configured locales. Received \`${options.fallbackLocale}\`.`)
    }
}
