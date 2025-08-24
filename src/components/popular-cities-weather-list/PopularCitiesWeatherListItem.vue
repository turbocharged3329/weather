<template>
  <div class="w-popular-city-weather-list-item">
    <h6 class="w-popular-city-weather-list-item__city-name w-text-p2">
      {{ data.city }}
    </h6>
    <span class="w-popular-city-weather-list-item__weather-title">{{
      weatherTitle
    }}</span>
    <WeatherIconStatus
      class="w-popular-city-weather-list-item__weather-icon"
      :weather-key="weatherKey"
      :wind-speed="data.windSpeed"
    />
    <span class="w-popular-city-weather-list-item__temperature w-text-h3"
      >{{ data.temperature }}&deg;</span
    >
    <span class="w-popular-city-weather-list-item__humidity"
      >Влажность: {{ data.humidity }}%</span
    >
  </div>
</template>

<script setup lang="ts">
import WeatherIconStatus from '@/components/WeatherIconStatus.vue'
import { useWeather } from '@/composables/useWeather.ts'

interface Props {
  data: {
    id: string
    city: string
    temperature: number | null
    humidity: number | null
    weatherCode: number | null
    windSpeed: number | null
  }
}

const props = defineProps<Props>()

const { weatherKey, weatherTitle } = useWeather(
  props.data.weatherCode && props.data.windSpeed
)
</script>

<style scoped lang="scss">
.w-popular-city-weather-list-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background: radial-gradient(
    163.87% 184.27% at -17.89% -22.86%,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(238, 237, 237, 0.1) 100%
  );
  padding: 1.5625rem;
  border-radius: $border-radius;
  color: $color-primary;

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

  &__weather-title,
  &__humidity {
    font-size: 1.125rem;
    line-height: 1.2;
    font-weight: 500;
  }
}
</style>
