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

export type NuxtI18nOnMissing = (path: string, locale: string, fallbackLocale: string) => string | undefined

export interface NuxtI18nOptions {
    cookie?: NuxtI18nCookieOptions
    defaultLocale?: string
    detectLocale?: boolean
    dir?: string
    fallbackLocale?: string
    locales?: NuxtI18nLocale[]
    onMissing?: NuxtI18nOnMissing
    warnOnMissing?: boolean
}
