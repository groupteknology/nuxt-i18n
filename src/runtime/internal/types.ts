export type RuntimeMessages = Record<string, Record<string, unknown>>

export type RuntimeOptions = {
    defaultLocale: string
    dir: string
    locales: Array<{
        code: string
        file: `${string}.ts`
        name: string
    }>
}
