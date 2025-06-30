<script setup lang="ts">
import { ref, provide, reactive } from 'vue'

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const position = reactive({ top: 0, left: 0 })

function open() {
  isOpen.value = true
}
function close() {
  isOpen.value = false
}

provide('dropdownMenu', {
  isOpen,
  open,
  close,
  triggerRef,
  contentRef,
  position,
})
</script>
<template>
  <div><slot /></div>
</template>