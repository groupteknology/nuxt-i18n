import { join, relative, resolve } from 'pathe'

import type { NuxtI18nContext } from '../core/context'

import { normalizeImportPath, TAB, toTypeIdentifier } from './utils'

export function generateTypes(ctx: NuxtI18nContext) {
    const locales = ctx.options.locales ?? []
    const defaultLocaleCode = ctx.options.defaultLocale || locales[0]?.code || 'es'

    const localeEntries = locales.map((locale, index) => {
        const alias = `Locale_${toTypeIdentifier(locale.code)}_${index}`
        const path = normalizeImportPath(relative(join(ctx.buildDir, 'types'), resolve(ctx.rootDir, ctx.options.dir, 'locales', locale.file)))

        return {
            alias,
            code: locale.code,
            path: path.startsWith('.') ? path : `./${path}`,
        }
    })

    const lines: string[] = []

    for (const locale of localeEntries) {
        lines.push(`import type ${locale.alias} from '${locale.path}'`)
    }

    if (localeEntries.length > 0) {
        lines.push('')
    }

    lines.push('type Primitive = boolean | null | number | string | undefined')
    lines.push('type DeepLeafKeys<T> = T extends Primitive ? never : { [K in keyof T & string]: T[K] extends Primitive ? K : `${K}.${DeepLeafKeys<T[K]>}` }[keyof T & string]')
    lines.push('type Prettify<T> = { [K in keyof T]: T[K] } & {}')
    lines.push('')

    if (localeEntries.length > 0) {
        lines.push('type LocaleMap = {')

        for (const locale of localeEntries) {
            lines.push(`${TAB}'${locale.code}': typeof ${locale.alias}`)
        }

        lines.push('}')
    } else {
        lines.push('type LocaleMap = Record<string, Record<string, unknown>>')
    }

    lines.push('')

    if (defaultLocaleCode && localeEntries.some((locale) => locale.code === defaultLocaleCode)) {
        lines.push(`type LocaleDefault = LocaleMap['${defaultLocaleCode}']`)
    } else {
        lines.push('type LocaleDefault = Record<string, unknown>')
    }

    lines.push('')
    lines.push(`declare module '@groupteknology/nuxt-i18n' {`)
    lines.push(`${TAB}export type LocaleCode = Prettify<keyof LocaleMap>`)
    lines.push(`${TAB}export type LocaleInstance = LocaleDefault`)
    lines.push(`${TAB}export type LocalePath = DeepLeafKeys<LocaleInstance>`)
    lines.push(`${TAB}export type LocaleInfo = { code: LocaleCode, file: \`${'${string}.ts'}\`, name: string }`)
    lines.push(`${TAB}export type Locales = LocaleInfo[]`)
    lines.push('}')
    lines.push('')
    lines.push(`declare module '#app' {`)
    lines.push(`${TAB}interface NuxtApp {`)
    lines.push(`${TAB}${TAB}$locale: import('vue').WritableComputedRef<import('@groupteknology/nuxt-i18n').LocaleCode, import('@groupteknology/nuxt-i18n').LocaleCode>`)
    lines.push(`${TAB}${TAB}$locales: import('@groupteknology/nuxt-i18n').Locales`)
    lines.push(`${TAB}${TAB}$setLocale: (code: import('@groupteknology/nuxt-i18n').LocaleCode) => void`)
    lines.push(`${TAB}${TAB}$t: (path: import('@groupteknology/nuxt-i18n').LocalePath, params?: Record<string, unknown>) => string`)
    lines.push(`${TAB}}`)
    lines.push('}')
    lines.push('')
    lines.push(`declare module 'vue' {`)
    lines.push(`${TAB}interface ComponentCustomProperties {`)
    lines.push(`${TAB}${TAB}$locale: import('@groupteknology/nuxt-i18n').LocaleCode`)
    lines.push(`${TAB}${TAB}$locales: import('@groupteknology/nuxt-i18n').Locales`)
    lines.push(`${TAB}${TAB}$setLocale: (code: import('@groupteknology/nuxt-i18n').LocaleCode) => void`)
    lines.push(`${TAB}${TAB}$t: (path: import('@groupteknology/nuxt-i18n').LocalePath, params?: Record<string, unknown>) => string`)
    lines.push(`${TAB}}`)
    lines.push('}')
    lines.push('')
    lines.push('export {}')
    lines.push('')

    return lines.join('\n')
}
