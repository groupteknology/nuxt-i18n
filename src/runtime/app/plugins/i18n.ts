import { computed } from '#imports'

import { defineNuxtPlugin, useCookie, useRuntimeConfig } from '#app'
import { messages } from '#build/nuxt-i18n.messages.mjs'

import type { RuntimeMessages, RuntimeOptions } from '../../internal/types'

import { translate } from '../../internal/translator'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const safeOpts = config.public.i18n as RuntimeOptions
    const safeMsgs = messages as RuntimeMessages

    const storeLocale = useCookie<null | string>(safeOpts.cookie.name, {
        default: () => safeOpts.defaultLocale,
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
