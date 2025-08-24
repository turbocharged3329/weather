<template>
  <nav class="w-navbar-nav-menu">
    <a
      v-for="item in NAV_MENU_ITEMS"
      :key="item.id"
      class="w-navbar-nav-menu__link w-text-p4"
      :class="{ 'w-navbar-nav-menu__link--active': model === item.id }"
      @click="model = item.id"
      >{{ item.title }}</a
    >
  </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { MAIN_TAB_ID, NAV_MENU_ITEMS } from '@/constants/constants.js'

const model = defineModel<number>()

onMounted(() => {
  model.value = MAIN_TAB_ID
})
</script>

<style scoped lang="scss">
.w-navbar-nav-menu {
  color: rgba($color-primary, 0.4);
  border-radius: $border-radius;
  background: rgba($color-surface-bg, 0.1);
  display: flex;
  width: fit-content;
  overflow: hidden;

  &__link {
    padding: 0.625rem 1rem;

    &:not(:first-of-type) {
      border-left: 1px solid rgba($color-primary, 0.4);
    }

    &--active {
      color: $color-primary;
    }

    &:hover {
      background: rgba($color-surface-bg, 0.2);
      color: $color-primary;
    }
  }
}
</style>
