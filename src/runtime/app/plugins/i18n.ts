import { computed } from '#imports'

import { defineNuxtPlugin, useCookie, useRuntimeConfig } from '#app'
import { messages } from '#build/nuxt-i18n.messages.mjs'

import { interpolate } from '../../helpers/interpolate'

type RuntimeLocale = {
    code: string
    file: `${string}.ts`
    name: string
}

type RuntimeMessages = Record<string, Record<string, unknown>>

type RuntimeOptions = {
    defaultLocale: string
    dir: string
    locales: RuntimeLocale[]
}

function getMessageValue(messages: Record<string, unknown> | undefined, path: string) {
    return path.split('.').reduce<unknown>((value, key) => {
        if (value == null || typeof value !== 'object') return undefined
        return (value as Record<string, unknown>)[key]
    }, messages)
}

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
        const currentValue = getMessageValue(safeMsgs[locale.value], path)
        const fallbackValue = locale.value === safeOpts.defaultLocale ? currentValue : getMessageValue(safeMsgs[safeOpts.defaultLocale], path)
        const value = currentValue ?? fallbackValue

        if (typeof value !== 'string') return path

        return interpolate(value, params)
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
