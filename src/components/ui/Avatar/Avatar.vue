<template>
  <div
      ref="rootRef"
      :class=" twMerge(['relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', customClass])"
      v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, useAttrs } from 'vue'
import {twMerge} from "tailwind-merge";

const props = defineProps<{ class?: string }>()
const customClass = props.class || ''
const rootRef = ref(null)
</script>