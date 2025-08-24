<template>
  <div>
    <h1>{{ message }}</h1>
    <CitySelect />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CitySelect from '@/components/CitySelect.vue'

const message = ref('Hello World')
</script>
