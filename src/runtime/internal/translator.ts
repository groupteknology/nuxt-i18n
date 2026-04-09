import type { RuntimeMessages, RuntimeOptions } from './types'

import { interpolate } from '../helpers/interpolate'
import { getMessageValue } from './messages'

export function translate(
    messages: RuntimeMessages,
    options: RuntimeOptions,
    locale: string,
    path: string,
    params?: Record<string, unknown>,
) {
    const currentValue = getMessageValue(messages[locale], path)
    const fallbackValue = locale === options.defaultLocale ? currentValue : getMessageValue(messages[options.defaultLocale], path)
    const value = currentValue ?? fallbackValue

    if (typeof value !== 'string') return path

    return interpolate(value, params)
}
