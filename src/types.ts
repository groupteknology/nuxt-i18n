export type NuxtI18nLocale = {
    code: string
    file: `${string}.ts`
    name: string
}

export interface NuxtI18nOptions {
    defaultLocale?: string
    dir?: string
    locales?: NuxtI18nLocale[]
}
