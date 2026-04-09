export type RuntimeCookieOptions = {
    maxAge: number
    name: string
    sameSite: 'lax' | 'none' | 'strict'
    secure: boolean
}

export type RuntimeMessages = Record<string, Record<string, unknown>>

export type RuntimeOptions = {
    cookie: RuntimeCookieOptions
    defaultLocale: string
    dir: string
    fallbackLocale: string
    locales: Array<{
        code: string
        file: `${string}.ts`
        name: string
    }>
    warnOnMissing: boolean
}
