<script setup lang="ts">
    const { locale, locales, setLocale, t } = useI18n()
</script>

<template>
    <div>
        <h1>{{ t('page.home.title') }}</h1>
        <p>{{ t('page.home.description') }}</p>
        <p>{{ t('form.placeholder.name', { name: 'Diego' }) }}</p>
        <p>Fallback: {{ t('page.home.onlySpanish') }}</p>
        <p>Locale actual: {{ locale }}</p>

        <button v-for="item in locales" :key="item.code" @click="setLocale(item.code)">
            {{ item.name }}
        </button>

        <pre>{{ locales }}</pre>
    </div>
</template>
