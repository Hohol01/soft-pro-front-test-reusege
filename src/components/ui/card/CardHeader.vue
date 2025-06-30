<template>
  <div
      :class="twMerge([
     'flex flex-col space-y-1.5 p-6',
      $attrs.class as string])"
      v-bind="filteredAttrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, useAttrs, computed } from 'vue';
import {twMerge} from "tailwind-merge";

const attrs = useAttrs();
const filteredAttrs = computed(() => {
  const { class: _, ...rest } = attrs;
  return rest;
});
</script>
