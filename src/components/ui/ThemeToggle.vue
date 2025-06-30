<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import {useTheme} from "@/utils/theme-util.ts";
import Button from "@/components/ui/Button.vue";

const { theme, toggleTheme } = useTheme()

function handleToggle() {
  toggleTheme()
}
</script>

<template>
  <Button
      @click="handleToggle"
      :variant="'ghost'"
      :size="'sm'"
      :class="'h-8 w-8 p-0 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-all duration-200 border-0'"
      :title="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
  >
    <component :is="theme === 'light' ? Moon : Sun" class="w-4 h-4" />
  </Button>
</template>
