<template>
  <h3
      :class="twMerge([
    'font-semibold leading-none tracking-tight',
         $attrs.class as string])"
      v-bind="filteredAttrs"
  >
    <slot/>
  </h3>
</template>

<script setup lang="ts">
import {useAttrs, computed} from 'vue';
import {twMerge} from "tailwind-merge";

const attrs = useAttrs();
const filteredAttrs = computed(() => {
  const {class: _, ...rest} = attrs;
  return rest;
});
</script>
