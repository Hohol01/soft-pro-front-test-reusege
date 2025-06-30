<template>
  <div
      class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100"
      :class="{ 'pl-8': inset }"
      role="menuitem"
      @click="$emit('click')"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
defineProps<{ inset?: boolean }>();
</script>