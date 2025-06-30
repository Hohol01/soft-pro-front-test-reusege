<template>
  <td :class="twMerge([
      'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      $props.class])">
  <slot />
  </td>
</template>

<script setup lang="ts">
import {twMerge} from "tailwind-merge";

defineProps<{ class?: string }>()
</script>
