<template>
  <div class="relative w-full overflow-auto">
    <table :class="twMerge([
        'w-full caption-bottom text-sm',
         $props.class])">
      <slot/>
    </table>
  </div>
</template>

<script setup lang="ts">
import {twMerge} from "tailwind-merge";

defineProps<{ class?: string }>()
</script>
