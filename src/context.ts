import type { Nuxt } from '@nuxt/schema'

import { createResolver } from '@nuxt/kit'
import { fileURLToPath } from 'node:url'
import { dirname } from 'pathe'

import type { NuxtI18nOptions } from './types'

import { safeOptions } from './safes'

const distDir = dirname(fileURLToPath(import.meta.url))
const resolver = createResolver(import.meta.url)
const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

export type NuxtI18nContext = ReturnType<typeof createContext>

export function createContext(options: NuxtI18nOptions, nuxt: Nuxt) {
    const project = nuxt.options._layers[0]!

    const safeOpts = safeOptions(options)

    const buildDir = nuxt.options.buildDir
    const rootDir = project.config.rootDir

    nuxt.options.runtimeConfig.public.i18n = safeOpts

    return {
        buildDir,
        distDir,
        options: safeOpts,
        resolver,
        rootDir,
        runtimeDir,
    }
}
