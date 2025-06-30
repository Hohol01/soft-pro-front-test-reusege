<template>
  <tbody :class="twMerge([
     '[&_tr:last-child]:border-0',
       $props.class])">
  <slot/>
  </tbody>
</template>

<script setup lang="ts">
import {twMerge} from "tailwind-merge";

defineProps<{ class?: string }>()
</script>
