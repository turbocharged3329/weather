<template>
  <div class="w-city-select w-text-p4" v-click-outside="closeSelect">
    <button class="w-city-select__toggler w-text-p4" @click="toggleSelect">
      <span class="w-city-select__toggler-title">{{ selectedCityName }}</span>
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
import { onMounted, ref, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { CITIES_LIST } from '@/constants/constants.js'
import type { CitiesSelectListItem } from '@/interfaces/interfaces.js'
import { useSelectedCityStore } from '@/components/stores/selected-city.store.ts'

const IconChevronRight = defineAsyncComponent(
  () => import('@/components/icons/IconChevronRight.vue')
)
const IconChevronDown = defineAsyncComponent(
  () => import('@/components/icons/IconChevronDown.vue')
)

const selectedCityStore = useSelectedCityStore()
const { selectedCityName, selectedCityCoordinates } =
  storeToRefs(selectedCityStore)

const isOpen = ref(false)

function toggleSelect() {
  isOpen.value = !isOpen.value
}

function closeSelect() {
  isOpen.value = false
}

function onSelectCity(city: CitiesSelectListItem) {
  selectedCityName.value = city.title
  selectedCityCoordinates.value = city.coordinates
  closeSelect()
}

onMounted(() => {
  selectedCityName.value = CITIES_LIST[0]?.title || null
  selectedCityCoordinates.value = CITIES_LIST[0]?.coordinates || null
})
</script>

<style scoped lang="scss">
$list-offset: 12px;
$icon-box-width: 22px;
$list-item-bg: #2e73a5;
$list-item-bg-hover: #4481ae;

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

    &:hover {
      background-color: $list-item-bg-hover;
    }
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
    z-index: 1;
  }

  &__toggler,
  &__list-item {
    background-color: $list-item-bg;
    padding: 0.625rem 1rem;
  }

  &__list,
  &__toggler {
    border-radius: $border-radius;
  }

  &__list-item {
    cursor: pointer;

    &:hover {
      background-color: $list-item-bg-hover;
    }
  }
}
</style>
