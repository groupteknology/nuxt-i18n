<template>
    <div>
        <p>{{ $t('page.home.title') }}</p>
        <p>{{ $t('page.home.greeting', { name: 'Ada' }) }}</p>
        <p>{{ $t('page.home.subtitle') }}</p>
        <p>{{ $t('page.home.missing') }}</p>
        <p>{{ $locale }}</p>
    </div>
</template>

<script setup></script>
