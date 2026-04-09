import type { Nuxt } from '@nuxt/schema'

import type { NuxtI18nOptions } from '../types'

import { resolveOptions } from './options'
import { validateOptions } from './validate'

export type NuxtI18nContext = ReturnType<typeof createContext>

export function createContext(options: NuxtI18nOptions, nuxt: Nuxt) {
    const project = nuxt.options._layers[0]!
    const resolvedOptions = resolveOptions(options)
    const buildDir = nuxt.options.buildDir
    const rootDir = project.config.rootDir

    validateOptions(resolvedOptions, rootDir)

    nuxt.options.runtimeConfig.public.i18n = resolvedOptions

    return {
        buildDir,
        options: resolvedOptions,
        rootDir,
    }
}
