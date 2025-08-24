<template>
  <div class="w-selected-city-weekly-weather-stats">
    <transition name="fade">
      <section
        v-if="!isLoading"
        class="w-selected-city-weekly-weather-stats__list"
      >
        <SelectedCityWeeklyWeatherStatsItem
          v-for="day in weeklyWeatherData"
          :key="day.id"
          v-bind="day"
        />
      </section>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSelectedCityStore } from '@/components/stores/selected-city.store.ts'
import { storeToRefs } from 'pinia'
import { WeatherService } from '@/services/weather-service.ts'
import { computed, watch } from 'vue'
import { ResponseStatus } from '@/constants/constants.ts'
import type { CityWeekdayWeatherData } from '@/interfaces/interfaces.ts'
import { v4 as uuidv4 } from 'uuid'
import SelectedCityWeeklyWeatherStatsItem from '@/components/selected-city-weekly-weather/SelectedCityWeeklyWeatherStatsItem.vue'
const selectedCityStore = useSelectedCityStore()

const { selectedCityCoordinates, selectedCityWeeklyWeather } =
  storeToRefs(selectedCityStore)

const isLoading = ref<boolean>(true)

const weeklyWeatherData = computed<Array<CityWeekdayWeatherData>>(() => {
  const list: Array<CityWeekdayWeatherData> = []

  if (!selectedCityWeeklyWeather.value) {
    return []
  }

  for (let i = 0; i < selectedCityWeeklyWeather.value.day.length; i++) {
    list.push({
      id: uuidv4(),
      day: selectedCityWeeklyWeather.value.day[i] as string,
      windSpeed: selectedCityWeeklyWeather.value.windSpeed[i] as number,
      weatherCode: selectedCityWeeklyWeather.value.weatherCode[i] as number,
      temperature: selectedCityWeeklyWeather.value.temperature[i] as number,
    })
  }

  return list
})

async function setSelectedCityWeeklyWeather() {
  try {
    isLoading.value = true

    if (!selectedCityCoordinates.value) {
      return
    }

    const { data, status } =
      await WeatherService.getSelectedCityWeatherForecast(
        selectedCityCoordinates.value
      )

    if (status === ResponseStatus.SUCCESS && data) {
      selectedCityWeeklyWeather.value = {
        temperature: data.daily.temperature_2m_max.map(temperature =>
          Math.round(temperature)
        ),
        weatherCode: data.daily.weather_code,
        windSpeed: data.daily.wind_speed_10m_max,
        day: data.daily.time.map(dateString => {
          const weekdayName = new Date(dateString).toLocaleDateString('ru-RU', {
            weekday: 'long',
          })

          return weekdayName.charAt(0).toUpperCase() + weekdayName.slice(1)
        }),
      }
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

watch(selectedCityCoordinates, setSelectedCityWeeklyWeather, {
  immediate: true,
})
</script>

<style scoped lang="scss">
.w-selected-city-weekly-weather-stats {
  margin-bottom: 3.5rem;
  min-height: 7.5rem;

  &__list {
    display: flex;
    justify-content: flex-start;
    gap: 1.4vw;
  }
}
</style>
