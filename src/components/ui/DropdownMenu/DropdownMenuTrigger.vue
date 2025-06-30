<script setup lang="ts">
import { inject, ref, onMounted } from 'vue'
const menu = inject<any>('dropdownMenu')
const el = ref<HTMLElement | null>(null)
function toggle() {
  menu.isOpen.value ? menu.close() : menu.open()
  console.log('menu.isOpen ' +  menu.isOpen.value)
}
onMounted(() => {
  menu.triggerRef.value = el.value
})
</script>
<template>
  <div ref="el" @click="toggle"><slot /></div>
</template>