// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import perfectionist from 'eslint-plugin-perfectionist'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
    dirs: {
        src: ['./playground', './src', './test'],
    },
    features: {
        tooling: true,
        typescript: true,
    },
})
    .append({
        rules: {
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    })
    .append({
        plugins: { perfectionist },
        rules: {
            'perfectionist/sort-export-attributes': ['error'],
            'perfectionist/sort-exports': ['error'],
            'perfectionist/sort-imports': [
                'error',
                {
                    customGroups: [
                        {
                            elementNamePattern: ['^#imports'],
                            groupName: 'vue',
                        },
                        {
                            elementNamePattern: ['^#runtime'],
                            groupName: 'runtime',
                        },
                    ],
                    groups: ['vue', 'runtime', 'type-import', ['value-builtin', 'value-external'], 'type-internal', 'value-internal', ['type-parent', 'type-sibling', 'type-index'], ['value-parent', 'value-sibling', 'value-index'], 'ts-equals-import', 'unknown'],
                    internalPattern: ['^@/', '^#'],
                    newlinesBetween: 1,
                },
            ],
            'perfectionist/sort-interfaces': ['error'],
            'perfectionist/sort-modules': [
                'error',
                {
                    fallbackSort: {
                        order: 'asc',
                        type: 'natural',
                    },
                    groups: ['declare-enum', 'enum', ['declare-interface', 'declare-type'], ['interface', 'type'], 'declare-class', 'class', 'declare-function', 'function', 'export-enum', ['export-interface', 'export-type'], 'export-class', 'export-function'],
                    type: 'usage',
                },
            ],
            'perfectionist/sort-named-exports': ['error'],
            'perfectionist/sort-named-imports': ['error'],
            'perfectionist/sort-object-types': [
                'error',
                {
                    customGroups: [
                        {
                            elementNamePattern: '^(?:id)$',
                            groupName: 'top',
                            selector: 'property',
                        },
                        {
                            elementNamePattern: '^(?:createdAt|updatedAt)$',
                            groupName: 'bottom',
                            selector: 'property',
                        },
                    ],
                    groups: ['top', 'unknown', ['bottom']],
                },
            ],
            'perfectionist/sort-objects': [
                'error',
                {
                    customGroups: [
                        {
                            elementNamePattern: '^(?:id)$',
                            groupName: 'top',
                            selector: 'property',
                        },
                        {
                            elementNamePattern: '^(?:createdAt|updatedAt)$',
                            groupName: 'bottom',
                            selector: 'property',
                        },
                    ],
                    groups: ['top', 'unknown', ['bottom']],
                },
            ],
            'perfectionist/sort-union-types': ['error'],
            'perfectionist/sort-variable-declarations': ['error'],
        },
        settings: {
            perfectionist: {
                order: 'asc',
                partitionByComment: true,
                type: 'natural',
            },
        },
    })
