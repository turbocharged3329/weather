<template>
  <component :is="iconComponent" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { WeatherKey } from '@/components/types/types.ts'
import {
  CLOUDY_WEATHER_KEY,
  RAINY_WEATHER_KEY,
  SUNNY_WEATHER_KEY,
  WINDY_WEATHER_KEY,
} from '@/constants/constants.ts'

interface Props {
  weatherKey?: WeatherKey
  windSpeed?: number | null
}

const sunnyIcon = defineAsyncComponent(
  () => import('@/components/icons/weather/IconWeatherSunny.vue')
)
const cloudyIcon = defineAsyncComponent(
  () => import('@/components/icons/weather/IconWeatherCloudy.vue')
)
const windyIcon = defineAsyncComponent(
  () => import('@/components/icons/weather/IconWeatherWindy.vue')
)
const rainyIcon = defineAsyncComponent(
  () => import('@/components/icons/weather/IconWeatherRainy.vue')
)

const WEATHER_STATUS_COMPONENTS_MAP = {
  [SUNNY_WEATHER_KEY]: sunnyIcon,
  [CLOUDY_WEATHER_KEY]: cloudyIcon,
  [WINDY_WEATHER_KEY]: windyIcon,
  [RAINY_WEATHER_KEY]: rainyIcon,
}

const props = defineProps<Props>()

const iconComponent = computed(() => {
  return WEATHER_STATUS_COMPONENTS_MAP[props.weatherKey as WeatherKey] ?? null
})
</script>
