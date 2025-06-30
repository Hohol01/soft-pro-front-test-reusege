<template>
  <div
      :class="twMerge([
          'p-6 pt-0',
           $attrs.class as string])"
      v-bind="filteredAttrs"
  >
    <slot/>
  </div>
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
