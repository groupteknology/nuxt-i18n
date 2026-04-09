<script setup lang="ts"></script>

<template>
    <div>
        <p>Test: {{ $t('form.label.surname') }}</p>
        <p>Test: {{ $t('form.label.message') }}</p>
        <p>Test: {{ $t('form.placeholder.name') }}</p>
        <p>Test: {{ $t('form.label.surname') }}</p>

        <button @click="$setLocale('en')">English</button>
        <button @click="$setLocale('es')">Spanish</button>
        <pre>{{ $locales }}</pre>
    </div>
</template>
