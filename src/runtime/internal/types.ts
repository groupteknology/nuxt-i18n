export type RuntimeCookieOptions = {
    maxAge: number
    name: string
    sameSite: 'lax' | 'none' | 'strict'
    secure: boolean
}

export type RuntimeMessages = Record<string, Record<string, unknown>>

export type RuntimeOnMissing = (path: string, locale: string, fallbackLocale: string) => string | undefined

export type RuntimeOptions = {
    cookie: RuntimeCookieOptions
    defaultLocale: string
    detectLocale: boolean
    dir: string
    fallbackLocale: string
    locales: Array<{
        code: string
        file: `${string}.ts`
        name: string
    }>
    onMissing?: RuntimeOnMissing
    warnOnMissing: boolean
}
