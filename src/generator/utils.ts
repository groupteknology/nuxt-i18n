export const TAB = '    '

export function normalizeImportPath(value: string) {
    return value.replace(/\\/g, '/')
}

export function toTypeIdentifier(value: string) {
    return value
        .replace(/[^\w$]/g, '_')
        .replace(/^[^a-z_$]/i, '_$&')
        .toUpperCase()
}
