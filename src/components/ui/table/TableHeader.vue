<template>
  <thead :class="twMerge([
        'w-full caption-bottom text-sm',
         $props.class])">
  <slot/>
  </thead>
</template>

<script setup lang="ts">
import {twMerge} from "tailwind-merge";

defineProps<{ class?: string }>()
</script>
