export type NuxtI18nCookieOptions = {
    maxAge?: number
    name?: string
    sameSite?: 'lax' | 'none' | 'strict'
    secure?: boolean
}

export type NuxtI18nLocale = {
    code: string
    file: `${string}.ts`
    name: string
}

export interface NuxtI18nOptions {
    cookie?: NuxtI18nCookieOptions
    defaultLocale?: string
    dir?: string
    fallbackLocale?: string
    locales?: NuxtI18nLocale[]
    warnOnMissing?: boolean
}
