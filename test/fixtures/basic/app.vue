<template>
  <div>
    <p>{{ $t('page.home.title') }}</p>
    <p>{{ $t('page.home.greeting', { name: 'Ada' }) }}</p>
    <p>{{ $locale }}</p>
  </div>
</template>

<script setup>
</script>
