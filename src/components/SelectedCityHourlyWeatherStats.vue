<template>
  <div class="w-selected-city-hourly-stats">
    <section v-if="selectedCityHourlyWeather">
      <SelectedCityHourlyWeatherStatsRow
        v-for="data in hourlyWeatherData"
        v-bind="data"
        :key="data.id"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSelectedCityStore } from '@/components/stores/selected-city.store.ts'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { CityHourlyWeatherData } from '@/interfaces/interfaces.ts'
import SelectedCityHourlyWeatherStatsRow from '@/components/SelectedCityHourlyWeatherStatsRow.vue'

const selectedCityStore = useSelectedCityStore()
const { selectedCityHourlyWeather } = storeToRefs(selectedCityStore)

const hourlyWeatherData = computed<Array<CityHourlyWeatherData>>(() => {
  const list: Array<CityHourlyWeatherData> = []

  if (!selectedCityHourlyWeather.value) {
    return []
  }

  for (let i = 0; i < selectedCityHourlyWeather.value.time.length; i += 3) {
    list.push({
      id: uuidv4(),
      time: selectedCityHourlyWeather.value.time[i] as string,
      humidity: selectedCityHourlyWeather.value.humidity[i] as number,
      windSpeed: selectedCityHourlyWeather.value.windSpeed[i] as number,
      weatherCode: selectedCityHourlyWeather.value.weatherCode[i] as number,
      temperature: selectedCityHourlyWeather.value.temperature[i] as number,
    })
  }

  return list
})
</script>

<style scoped lang="scss">
.w-selected-city-hourly-stats {
  flex-grow: 1;
}
</style>
