import type { RuntimeMessages, RuntimeOptions } from './types'

import { interpolate } from '../helpers/interpolate'
import { getMessageValue } from './messages'

export type TranslationResult = {
    missing: boolean
    value: string
}

export function translate(messages: RuntimeMessages, options: RuntimeOptions, locale: string, path: string, params?: Record<string, unknown>): TranslationResult {
    const currentValue = getMessageValue(messages[locale], path)
    const fallbackValue = locale === options.fallbackLocale ? currentValue : getMessageValue(messages[options.fallbackLocale], path)
    const value = currentValue ?? fallbackValue

    if (typeof value !== 'string') {
        return {
            missing: true,
            value: path,
        }
    }

    return {
        missing: false,
        value: interpolate(value, params),
    }
}
