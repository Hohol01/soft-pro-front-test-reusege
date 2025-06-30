<template>
  <img
      ref="imgRef"
      :class="['aspect-square h-full w-full', customClass]"
      v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{ class?: string }>()
const customClass = props.class || ''
const imgRef = ref(null)
</script>