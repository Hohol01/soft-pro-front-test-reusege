<template>
  <tr :class="twMerge([
    'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
       $props.class])">
  <slot />
  </tr>
</template>

<script setup lang="ts">
import {twMerge} from "tailwind-merge";

defineProps<{ class?: string }>()
</script>
