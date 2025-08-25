<template>
  <div class="w-popular-city-weather-list-item">
    <h6 class="w-popular-city-weather-list-item__city-name w-text-p2">
      {{ data.city }}
    </h6>
    <span
      class="w-popular-city-weather-list-item__weather-title w-text-sm w-weight-500"
      >{{ weatherTitle }}</span
    >
    <WeatherIconStatus
      v-if="weatherKey"
      class="w-popular-city-weather-list-item__weather-icon"
      width="4.2vw"
      height="4.2vw"
      :weather-key="weatherKey"
      :wind-speed="windSpeed"
    />
    <span class="w-popular-city-weather-list-item__temperature w-text-h3"
      >{{ data.temperature }}&deg;</span
    >
    <span
      class="w-popular-city-weather-list-item__humidity w-text-sm w-weight-500"
      >Влажность: {{ data.humidity }}%</span
    >
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import WeatherIconStatus from '@/components/WeatherIconStatus.vue'
import { useWeather } from '@/composables/useWeather.ts'

interface Props {
  data: {
    id: string
    city: string
    temperature: number
    humidity: number
    weatherCode: number
    windSpeed: number
  }
}

const props = defineProps<Props>()
const { weatherCode, windSpeed } = toRefs(props.data)

const { weatherKey, weatherTitle } = useWeather(weatherCode, windSpeed)
</script>

<style scoped lang="scss">
.w-popular-city-weather-list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: radial-gradient(
    163.87% 184.27% at -17.89% -22.86%,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(238, 237, 237, 0.1) 100%
  );
  padding: 1.5625rem;
  border-radius: $border-radius;
  color: $color-primary;
  width: 16.8vw;
  flex-shrink: 0;
  box-sizing: border-box;

  &__city-name {
    margin-bottom: 0.5rem;
    text-align: center;
  }

  &__weather-title {
    margin-bottom: 1rem;
  }

  &__weather-icon {
    margin-bottom: 1rem;
  }

  &__temperature {
    margin-bottom: 1rem;
  }

  &__humidity {
    margin-bottom: 1rem;
  }
}
</style>
