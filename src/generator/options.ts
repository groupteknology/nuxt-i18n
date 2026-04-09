import type { NuxtI18nContext } from '../core/context'

import { TAB } from './utils'

export function generateOptions(ctx: NuxtI18nContext) {
    const lines: string[] = []
    const onMissingSource = typeof ctx.sourceOptions.onMissing === 'function' ? ctx.sourceOptions.onMissing.toString() : 'undefined'

    lines.push(`export const runtimeOptions = {`)
    lines.push(`${TAB}cookie: ${JSON.stringify(ctx.options.cookie)},`)
    lines.push(`${TAB}detectLocale: ${JSON.stringify(ctx.options.detectLocale)},`)
    lines.push(`${TAB}defaultLocale: ${JSON.stringify(ctx.options.defaultLocale)},`)
    lines.push(`${TAB}dir: ${JSON.stringify(ctx.options.dir)},`)
    lines.push(`${TAB}fallbackLocale: ${JSON.stringify(ctx.options.fallbackLocale)},`)
    lines.push(`${TAB}locales: ${JSON.stringify(ctx.options.locales)},`)
    lines.push(`${TAB}onMissing: ${onMissingSource},`)
    lines.push(`${TAB}warnOnMissing: ${JSON.stringify(ctx.options.warnOnMissing)},`)
    lines.push(`}`)
    lines.push('')

    return lines.join('\n')
}
