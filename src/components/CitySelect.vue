<template>
  <div class="w-city-select w-text-p4">
    <button class="w-city-select__toggler w-text-p4" @click="toggleSelect">
      <span class="w-city-select__toggler-title">{{ currentCity.title }}</span>
      <div class="w-city-select__toggler-icon">
        <IconChevronDown v-if="isOpen" />
        <IconChevronRight v-else />
      </div>
    </button>

    <ul class="w-city-select__list" v-if="isOpen">
      <li
        class="w-city-select__list-item"
        v-for="city in CITIES_LIST"
        :key="city.id"
        @click="onSelectCity(city)"
      >
        {{ city.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import { CITIES_LIST } from '@/constants/constants.js'
import type { City } from '@/interfaces/interfaces.js'

const IconChevronRight = defineAsyncComponent(
  () => import('@/components/icons/IconChevronRight.vue')
)
const IconChevronDown = defineAsyncComponent(
  () => import('@/components/icons/IconChevronDown.vue')
)

const isOpen = ref(false)
const currentCity = ref<City>(CITIES_LIST[0])

function toggleSelect() {
  isOpen.value = !isOpen.value
}

function onSelectCity(city: City) {
  currentCity.value = city
  toggleSelect()
}
</script>

<style scoped lang="scss">
$list-offset: 12px;
$icon-box-width: 22px;

.w-city-select {
  position: relative;
  color: $color-primary;
  width: 17vw;

  &__toggler {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    color: $color-primary;
    width: 100%;
  }

  &__toggler-title {
    flex-grow: 1;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &__toggler-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: $icon-box-width;
    height: $icon-box-width;
  }

  &__list {
    width: 100%;
    position: absolute;
    top: calc(100% + $list-offset);
    right: 0;
    overflow: hidden;
  }

  &__toggler,
  &__list-item {
    background-color: rgba($color-surface-bg, 0.1);
    padding: 0.625rem 1rem;
  }

  &__list,
  &__toggler {
    border-radius: $border-radius;
  }

  &__list-item {
    cursor: pointer;

    &:hover {
      background-color: rgba($color-surface-bg, 0.2);
    }
  }
}
</style>
