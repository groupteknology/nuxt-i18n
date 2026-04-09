import { useNuxtApp } from '#app'

export function useI18n() {
    const { $locale, $locales, $setLocale, $t } = useNuxtApp()

    return {
        locale: $locale,
        locales: $locales,
        setLocale: $setLocale,
        t: $t,
    }
}
