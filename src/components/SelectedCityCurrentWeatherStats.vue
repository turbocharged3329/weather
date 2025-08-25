<template>
  <div class="w-selected-city-stats">
    <WeatherIconStatus
      v-if="weatherKey"
      width="12.5vw"
      height="12.5vw"
      :weather-key="weatherKey"
      :wind-speed="windSpeed"
    />

    <span class="w-selected-city-stats__temperature"
      >{{ temperatureRounded }}&deg;</span
    >

    <section
      class="w-selected-city-stats__list w-text-p3"
      v-if="selectedCityTodayWeather"
    >
      <span>{{ weatherTitle }}</span>
      <span>Влажность: {{ selectedCityTodayWeather.humidity }}&nbsp;%</span>
      <span>Ветер: {{ windSpeed }}&nbsp;м/c</span>
    </section>
  </div>
</template>

<script setup lang="ts">
import WeatherIconStatus from '@/components/WeatherIconStatus.vue'
import { useWeather } from '@/composables/useWeather.ts'
import { useSelectedCityStore } from '@/components/stores/selected-city.store.ts'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const selectedCityStore = useSelectedCityStore()
const { selectedCityTodayWeather, weatherCode, windSpeed } =
  storeToRefs(selectedCityStore)

const temperatureRounded = computed(() =>
  Math.round(selectedCityTodayWeather.value?.temperature || 0)
)
const { weatherKey, weatherTitle } = useWeather(weatherCode, windSpeed)
</script>

<style scoped lang="scss">
.w-selected-city-stats {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3vw;
  color: $color-primary;
  width: 43.4vw;

  &__temperature {
    font-size: 6.25rem;
    line-height: 1.1;
    font-weight: bold;
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.75rem;
  }
}
</style>
