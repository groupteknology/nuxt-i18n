/* eslint-disable perfectionist/sort-modules */

import type { LocaleParams } from '@groupteknology/nuxt-i18n'

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false

type Expect<T extends true> = T

type GreetingParams = LocaleParams<'form.placeholder.name'>
type TitleParams = LocaleParams<'page.home.title'>

type _GreetingParamsAreTyped = Expect<Equal<GreetingParams, { name: boolean | null | number | string | undefined }>>
type _TitleHasNoParams = Expect<Equal<TitleParams, never>>

export {}
