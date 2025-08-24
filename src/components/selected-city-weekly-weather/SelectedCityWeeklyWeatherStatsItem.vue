<template>
  <div class="w-selected-city-weekly-weather-stats-item">
    <span class="w-text-sm w-weight-400">{{ day }}</span>
    <WeatherIconStatus
      v-if="weatherKey"
      :weather-key="weatherKey"
      :wind-speed="windSpeed"
    />
    <span>{{ temperature }}&deg;</span>
  </div>
</template>

<script setup lang="ts">
import type { CityWeekdayWeatherData } from '@/interfaces/interfaces.ts'
import { toRefs } from 'vue'
import WeatherIconStatus from '@/components/WeatherIconStatus.vue'
import { useWeather } from '@/composables/useWeather.ts'

const props = defineProps<CityWeekdayWeatherData>()
const { weatherCode, windSpeed } = toRefs(props)

const { weatherKey } = useWeather(weatherCode, windSpeed)
</script>

<style scoped lang="scss">
.w-selected-city-weekly-weather-stats-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: $color-primary;
  width: 8.5vw;
  gap: 0.5rem;
}
</style>
