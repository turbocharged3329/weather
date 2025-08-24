<template>
  <div>
    <TheHeader @change-tab="currentTab = $event" />

    <StatsHeading />

    <transition name="fade">
      <SelectedCityMainStats v-if="currentTab === MAIN_TAB_ID" />
      <SelectedCityWeeklyWeatherStats v-else />
    </transition>

    <PopularCitiesWeatherList />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StatsHeading from '@/components/StatsHeading.vue'
import TheHeader from '@/components/TheHeader.vue'
import SelectedCityMainStats from '@/components/SelectedCityMainStats.vue'
import SelectedCityWeeklyWeatherStats from '@/components/selected-city-weekly-weather/SelectedCityWeeklyWeatherStats.vue'
import PopularCitiesWeatherList from '@/components/popular-cities-weather-list/PopularCitiesWeatherList.vue'
import { MAIN_TAB_ID } from '@/constants/constants.ts'
const currentTab = ref<number | undefined>()
</script>
