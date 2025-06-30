<script setup lang="ts">
import { inject, onMounted, ref, useAttrs } from 'vue'
const attrs = useAttrs()
const el = ref<HTMLElement | null>(null)
const menu = inject<any>('dropdownMenu')

onMounted(() => {
  menu.contentRef.value = el.value
  console.log(menu.triggerRef.value)
  console.log(el.value)
  console.log((menu.triggerRef.value && el.value) as boolean)
  if (menu.triggerRef.value && el.value) {
    const rect = menu.triggerRef.value.getBoundingClientRect()
    menu.position.top = rect.bottom + window.scrollY + 4
    menu.position.left = rect.left + window.scrollX
    console.log(menu?.isOpen)
  }
})
</script>
<template>
  <Teleport to="body" v-if="menu?.isOpen.value">
    <div
        ref="el"
        v-bind="attrs"
        :style="{
        position: 'absolute',
        top: menu.position.top + 'px',
        left: menu.position.left + 'px',
        zIndex:1000
      }"
    >
      <slot />
    </div>
  </Teleport>
</template>