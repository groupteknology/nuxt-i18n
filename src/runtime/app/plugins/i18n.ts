import { computed } from '#imports'

import { defineNuxtPlugin, useCookie, useRequestHeaders } from '#app'
import { messages } from '#build/nuxt-i18n.messages.mjs'
import { runtimeOptions } from '#build/nuxt-i18n.options.mjs'

import type { RuntimeMessages, RuntimeOptions } from '../../internal/types'

import { translate } from '../../internal/translator'

export default defineNuxtPlugin(() => {
    const safeOpts = runtimeOptions as RuntimeOptions
    const safeMsgs = messages as RuntimeMessages

    function findLocale(code: string) {
        return safeOpts.locales.find((localeItem) => localeItem.code.toLowerCase() === code.toLowerCase())
    }

    function detectLocale() {
        if (!safeOpts.detectLocale) return safeOpts.defaultLocale

        const requestedLocales: string[] = []

        if (import.meta.server) {
            const headers = useRequestHeaders(['accept-language'])
            const acceptLanguage = headers['accept-language']

            if (acceptLanguage) {
                requestedLocales.push(
                    ...acceptLanguage
                        .split(',')
                        .map((item) => item.split(';')[0]?.trim())
                        .filter((item): item is string => Boolean(item)),
                )
            }
        }

        if (import.meta.client && typeof navigator !== 'undefined') {
            requestedLocales.push(...navigator.languages)

            if (navigator.language) {
                requestedLocales.push(navigator.language)
            }
        }

        for (const requestedLocale of requestedLocales) {
            const normalizedLocale = requestedLocale.toLowerCase()
            const exactLocale = findLocale(normalizedLocale)

            if (exactLocale) return exactLocale.code

            const baseLocale = normalizedLocale.split('-')[0]

            if (!baseLocale) continue

            const baseMatch = findLocale(baseLocale)

            if (baseMatch) return baseMatch.code
        }

        return safeOpts.defaultLocale
    }

    const storeLocale = useCookie<null | string>(safeOpts.cookie.name, {
        default: () => detectLocale(),
        maxAge: safeOpts.cookie.maxAge,
        sameSite: safeOpts.cookie.sameSite,
        secure: safeOpts.cookie.secure,
    })

    const locale = computed({
        get: () => storeLocale.value || safeOpts.defaultLocale,
        set: (code) => {
            if (!safeOpts.locales.some((localeItem) => localeItem.code === code)) return
            storeLocale.value = code
        },
    })

    function t(path: string, params?: Record<string, unknown>) {
        const result = translate(safeMsgs, safeOpts, locale.value, path, params)

        if (result.missing) {
            const fallbackValue = safeOpts.onMissing?.(path, locale.value, safeOpts.fallbackLocale)

            if (typeof fallbackValue === 'string') {
                return fallbackValue
            }
        }

        if (result.missing && safeOpts.warnOnMissing) {
            console.warn(`[nuxt-i18n] Missing translation for "${path}" in locale "${locale.value}" with fallback "${safeOpts.fallbackLocale}".`)
        }

        return result.value
    }

    function setLocale(code: string) {
        locale.value = code
    }

    return {
        provide: {
            locale,
            locales: safeOpts.locales,
            setLocale,
            t,
        },
    }
})
