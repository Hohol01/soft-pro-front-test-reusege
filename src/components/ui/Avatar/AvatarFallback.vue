<template>
  <div
      ref="fallbackRef"
      :class="[
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      customClass
    ]"
      v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{ class?: string }>()
const customClass = props.class || ''
const fallbackRef = ref(null)
</script>