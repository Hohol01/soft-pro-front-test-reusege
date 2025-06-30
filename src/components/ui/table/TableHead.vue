<template>
  <th :class="twMerge([
      'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
       $props.class])">
  <slot/>
  </th>
</template>

<script setup lang="ts">
import {twMerge} from "tailwind-merge";

defineProps<{ class?: string }>()
</script>
