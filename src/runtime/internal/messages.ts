export function getMessageValue(messages: Record<string, unknown> | undefined, path: string) {
    return path.split('.').reduce<unknown>((value, key) => {
        if (value == null || typeof value !== 'object') return undefined

        return (value as Record<string, unknown>)[key]
    }, messages)
}
