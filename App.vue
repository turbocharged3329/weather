<template>
  <div>
    <TheHeader />

    <StatsHeading />

    <PopularCitiesWeatherList />
  </div>
</template>

<script setup lang="ts">
import StatsHeading from '@/components/StatsHeading.vue'
import TheHeader from '@/components/TheHeader.vue'
import PopularCitiesWeatherList from '@/components/popular-cities-weather-list/PopularCitiesWeatherList.vue'
</script>
