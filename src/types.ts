export type NuxtI18nLocale = {
    code: string
    file: `${string}.ts`
    name: string
}

export type NuxtI18nMessages = Record<string, Record<string, unknown>>

export interface NuxtI18nOptions {
    defaultLocale: string
    dir: string
    locales: NuxtI18nLocale[]
}
