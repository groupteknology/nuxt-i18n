import type { NuxtI18nLocale, NuxtI18nOptions } from '../types'

export type ResolvedNuxtI18nOptions = {
    defaultLocale: string
    dir: string
    locales: NuxtI18nLocale[]
}

export function resolveOptions(options: NuxtI18nOptions): ResolvedNuxtI18nOptions {
    return {
        defaultLocale: options.defaultLocale || 'es',
        dir: options.dir || 'i18n',
        locales: (options.locales || []) as NuxtI18nLocale[],
    }
}
