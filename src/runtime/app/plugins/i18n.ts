import { computed } from '#imports'

import { defineNuxtPlugin, useCookie, useRuntimeConfig } from '#app'
import { messages } from '#build/nuxt-i18n.messages.mjs'

import type { RuntimeMessages, RuntimeOptions } from '../../internal/types'

import { translate } from '../../internal/translator'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const safeOpts = config.public.i18n as RuntimeOptions
    const safeMsgs = messages as RuntimeMessages

    const storeLocale = useCookie<null | string>('nuxt-i18n-locale', { default: () => safeOpts.defaultLocale })

    const locale = computed({
        get: () => storeLocale.value || safeOpts.defaultLocale,
        set: (code) => {
            if (!safeOpts.locales.some((localeItem) => localeItem.code === code)) return
            storeLocale.value = code
        },
    })

    function t(path: string, params?: Record<string, unknown>) {
        return translate(safeMsgs, safeOpts, locale.value, path, params)
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
