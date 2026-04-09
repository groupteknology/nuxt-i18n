import type { NuxtI18nCookieOptions, NuxtI18nLocale, NuxtI18nOptions } from '../types'

export type ResolvedNuxtI18nCookieOptions = Required<NuxtI18nCookieOptions>

export type ResolvedNuxtI18nOptions = {
    cookie: ResolvedNuxtI18nCookieOptions
    defaultLocale: string
    dir: string
    fallbackLocale: string
    locales: NuxtI18nLocale[]
    warnOnMissing: boolean
}

export function resolveOptions(options: NuxtI18nOptions): ResolvedNuxtI18nOptions {
    return {
        cookie: {
            maxAge: options.cookie?.maxAge ?? 60 * 60 * 24 * 365,
            name: options.cookie?.name ?? 'nuxt-i18n-locale',
            sameSite: options.cookie?.sameSite ?? 'lax',
            secure: options.cookie?.secure ?? false,
        },
        defaultLocale: options.defaultLocale || 'es',
        dir: options.dir || 'i18n',
        fallbackLocale: options.fallbackLocale || options.defaultLocale || 'es',
        locales: (options.locales || []) as NuxtI18nLocale[],
        warnOnMissing: options.warnOnMissing ?? false,
    }
}
