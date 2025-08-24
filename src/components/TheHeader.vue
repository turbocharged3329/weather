<template>
  <header class="w-header">
    <NavbarNavMenu />
    <CitySelect />
  </header>
</template>

<script setup lang="ts">
import NavbarNavMenu from '@/components/NavbarNavMenu.vue'
import CitySelect from '@/components/CitySelect.vue'
</script>

<style scoped lang="scss">
.w-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3.5rem;
}
</style>
