<template>
  <div :class="badgeClass" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import {computed, useAttrs} from "vue";
import {twMerge} from "tailwind-merge";

const props = defineProps<{
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'

}>()

const attrs = useAttrs();

const baseClasses =
    'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'

const variantClasses = {
  default: 'border-transparent bg-blue-600 text-white shadow hover:bg-blue-500',
  secondary: 'border-transparent bg-gray-200 text-gray-900 hover:bg-gray-300',
  destructive: 'border-transparent bg-red-600 text-white shadow hover:bg-red-500',
  outline: 'border border-gray-300 text-gray-800',
}

const badgeClass = computed(() => {
  const variant = props.variant || 'default'
  return twMerge( [baseClasses, variantClasses[variant],  attrs.class as string])
})
</script>
