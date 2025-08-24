<template>
  <div class="w-selected-city-hourly-stats-row">
    <section
      class="w-selected-city-hourly-stats-row__time-section w-text-sm w-weight-400"
    >
      <span>{{ time }}</span>
      <span>{{ timeTitle }}</span>
    </section>

    <section
      class="w-selected-city-hourly-stats-row__temperature-section w-text-h3"
    >
      {{ temperature }}&deg;
    </section>

    <section class="w-selected-city-hourly-stats-row__weather-section">
      <WeatherIconStatus
        v-if="weatherKey && windSpeed !== null"
        :weather-key="weatherKey"
        :wind-speed="windSpeed"
      />
      <span class="w-text-sm w-weight-400">{{ weatherTitle }}</span>
    </section>

    <section
      class="w-selected-city-hourly-stats-row__wind-section w-text-sm w-weight-500"
    >
      {{ windSpeed }} м/с
    </section>
    <section
      class="w-selected-city-hourly-stats-row__humidity-section w-text-sm w-weight-500"
    >
      {{ humidity }}%
    </section>
  </div>
</template>

<script setup lang="ts">
import type { CityHourlyWeatherData } from '@/interfaces/interfaces.ts'
import { computed, toRefs } from 'vue'
import {
  DAYTIME_TIME_TITLE,
  EVENING_TIME_TITLE,
  MORNING_TIME_TITLE,
  NIGHT_TIME_TITLE,
} from '@/constants/constants.ts'
import { useWeather } from '@/composables/useWeather.ts'
import WeatherIconStatus from '@/components/WeatherIconStatus.vue'

const props = defineProps<CityHourlyWeatherData>()
const { weatherCode, windSpeed } = toRefs(props)

const { weatherTitle, weatherKey } = useWeather(weatherCode, windSpeed)

const timeTitle = computed(() => {
  const hours = parseInt(props.time)

  if (hours >= 22 || hours < 6) {
    return NIGHT_TIME_TITLE
  } else if (hours >= 6 && hours < 12) {
    return MORNING_TIME_TITLE
  } else if (hours >= 12 && hours < 18) {
    return DAYTIME_TIME_TITLE
  } else {
    return EVENING_TIME_TITLE
  }
})
</script>

<style scoped lang="scss">
.w-selected-city-hourly-stats-row {
  display: flex;
  align-items: center;
  color: $color-primary;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba($color-primary, 0.1);
  width: 100%;
  gap: 0.6vw;

  &__time-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    gap: 0.5rem;
    flex-basis: 17.6%;
  }

  &__temperature-section {
    flex-basis: 22.5%;
    text-align: center;
  }

  &__weather-section {
    flex-basis: 31.9%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.83vw;
  }

  &__humidity-section {
    flex-basis: 13.7%;
    text-align: center;
  }

  &__wind-section {
    flex-basis: 14.3%;
    text-align: center;
  }
}
</style>
