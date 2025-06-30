<template>
  <button
      v-if="!asChild"
      ref="buttonRef"
      :class="computedClass"
      v-bind="attrs"
      @click="$emit('click', $event)"
  >
    <slot />
  </button>
  <slot v-else />
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import {twMerge} from "tailwind-merge";

const props = defineProps<{
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}>()


const emit = defineEmits(['click'])

const attrs = useAttrs()
const buttonRef = ref<HTMLElement | null>(null)

const base =
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'

const variants: Record<string, string> = {
  default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
  outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
}

const sizes: Record<string, string> = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-10 rounded-md px-8',
  icon: 'h-9 w-9',
}

const computedClass = computed(() =>
    twMerge( [base, variants[props.variant || 'default'], sizes[props.size || 'default'], attrs.class as string])


)
</script>
