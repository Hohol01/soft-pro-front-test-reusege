<template>
  <div
      class="px-2 py-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400"
      :class="{ 'pl-8': inset }"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
defineProps<{ inset?: boolean }>();
</script>