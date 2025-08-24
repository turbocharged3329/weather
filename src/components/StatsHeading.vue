<template>
  <section class="w-stats-heading">
    <h4 class="w-text-h4 w-stats-heading__location-text">
      Погода в городе {{ selectedCityName }}
    </h4>
    <p class="w-text-p1 w-stats-heading__date-text">{{ dateString }}</p>
  </section>
</template>

<script setup lang="ts">
import { useSelectedCityStore } from '@/components/stores/selected-city.store.ts'
import { storeToRefs } from 'pinia'

const selectedCityStore = useSelectedCityStore()
const { selectedCityName } = storeToRefs(selectedCityStore)

const today = new Date()
const dateString = today.toLocaleDateString('ru-RU', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})
</script>

<style scoped lang="scss">
.w-stats-heading {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 3rem;

  &__location-text {
    color: $color-primary;
  }

  &__date-text {
    color: rgba($color-primary, 0.6);
  }
}
</style>
