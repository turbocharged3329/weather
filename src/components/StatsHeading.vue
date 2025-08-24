<template>
  <section class="w-stats-heading">
    <h4 class="w-text-h4 w-stats-heading__location-text">
      Погода в городе {{ cityName }}
    </h4>
    <p class="w-text-p1 w-stats-heading__date-text">{{ dateString }}</p>
  </section>
</template>

<script setup lang="ts">
interface Props {
  cityName: string
}

const { cityName } = defineProps<Props>()

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

  &__location-text {
    color: $color-primary;
  }

  &__date-text {
    color: rgba($color-primary, 0.6);
  }
}
</style>
