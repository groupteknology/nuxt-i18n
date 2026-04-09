import { relative, resolve } from 'pathe'

import type { NuxtI18nContext } from '../core/context'

import { normalizeImportPath, TAB, toTypeIdentifier } from './utils'

export function generateMessages(ctx: NuxtI18nContext) {
    const locales = ctx.options.locales
    const lines: string[] = []

    if (locales.length > 0) {
        const localeEntries = locales.map((locale, index) => {
            const alias = `messages_${toTypeIdentifier(locale.code)}_${index}`
            const path = normalizeImportPath(relative(ctx.buildDir, resolve(ctx.rootDir, ctx.options.dir, 'locales', locale.file)))

            return {
                alias,
                code: locale.code,
                path: path.startsWith('.') ? path : `./${path}`,
            }
        })

        localeEntries.forEach((locale) => {
            lines.push(`import ${locale.alias} from '${locale.path}'`)
        })

        lines.push('')
        lines.push('export const messages = {')

        localeEntries.forEach((locale) => {
            lines.push(`${TAB}'${locale.code}': ${locale.alias},`)
        })

        lines.push('}')
    } else {
        lines.push('export const messages = {}')
    }

    return lines.join('\n')
}
