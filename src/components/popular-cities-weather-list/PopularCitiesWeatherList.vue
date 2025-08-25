<template>
  <div class="w-popular-cities-weather-list">
    <section class="w-popular-cities-weather-list__title">
      <h4 class="w-text-h4">Погода в популярных городах</h4>
      <div class="w-popular-cities-weather-list__hint" title="Подсказка">
        <IconQuestion />
      </div>
    </section>

    <section v-if="!isLoading" class="w-popular-cities-weather-list__wrapper">
      <PopularCitiesWeatherListItem
        v-for="city in citiesList"
        :key="city.id"
        :data="city"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { WeatherService } from '@/services/weather-service.ts'
import {
  POPULAR_CITIES_COORDINATES_MAP,
  ResponseStatus,
} from '@/constants/constants.ts'
import { onMounted } from 'vue'
import type { PopularCityWeatherResponseData } from '@/interfaces/interfaces.ts'
import PopularCitiesWeatherListItem from '@/components/popular-cities-weather-list/PopularCitiesWeatherListItem.vue'
import { v4 as uuidv4 } from 'uuid'
import IconQuestion from '@/components/icons/IconQuestion.vue'

const weatherData = ref<Array<PopularCityWeatherResponseData>>([])
const isLoading = ref<boolean>(false)

const citiesList = computed(() => {
  if (!weatherData.value.length) {
    return []
  }

  const citiesNames = Object.keys(POPULAR_CITIES_COORDINATES_MAP)

  return weatherData.value
    .map((data, i) => {
      return {
        id: uuidv4(),
        city: citiesNames[i] || null,
        temperature: Math.round(data.current.temperature_2m) || null,
        humidity: data.current.relative_humidity_2m || null,
        weatherCode: data.current.weather_code || null,
        windSpeed: data.current.wind_speed_10m || null,
      }
    })
    .filter(city => city !== null)
})

onMounted(async () => {
  try {
    isLoading.value = true

    const { data, status } = await WeatherService.getPopularCitiesWeather(
      POPULAR_CITIES_COORDINATES_MAP
    )

    if (status === ResponseStatus.SUCCESS && data) {
      weatherData.value = [...data]
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped lang="scss">
.w-popular-cities-weather-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: $color-primary;

  &__title {
    margin-bottom: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.1vw;
  }

  &__hint {
    cursor: help;
  }

  &__wrapper {
    display: flex;
    gap: 2.6vw;
  }
}
</style>
