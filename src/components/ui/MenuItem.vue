<template>
  <div>
    <button
        @click="hasChildren ? $emit('toggle-expanded', item.id) : $emit('menu-click', item.id)"
        :class="[
        'w-full flex items-center',
        level === 0 ? 'px-3' : 'px-6',
        ' space-x-3 py-2.5 mb-1 rounded-lg text-left transition-all duration-200 group border-0',
         isActive
          ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-slate-700 dark:text-slate-100'
          : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100',

        isCollapsed ? 'justify-center' : '',
        level > 0 ? 'text-sm' : '',
       ]"
        :title="isCollapsed ? item.label : undefined"
    >
      <component :is="item.icon"
                 class="w-5 h-5 transition-colors"
                 :class="isActive
          ? 'text-blue-600 dark:text-slate-100'
          : 'text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200'"/>

      <template v-if="!isCollapsed">
        <span class="font-medium flex-1">{{ item.label }}</span>

        <Badge
            v-if="item.badge"
            variant="secondary"
            class="text-xs px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center bg-blue-100 text-blue-700 border-blue-200 dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500">
          {{ item.badge }}
        </Badge>

        <div v-if="hasChildren" class="ml-auto">
          <ChevronUp v-if="isExpanded" class="w-4 h-4 text-slate-400 dark:text-slate-500"/>
          <ChevronDown v-else class="w-4 h-4 text-slate-400 dark:text-slate-500"/>
        </div>
      </template>
    </button>

    <div v-if="hasChildren && isExpanded && !isCollapsed" class="ml-2 border-l border-slate-200 dark:border-slate-600">
      <MenuItem
          v-for="child in item.children"
          :key="child.id"
          :item="child"
          :level="level + 1"
          :is-collapsed="isCollapsed"
          :active-view="activeView"
          :expanded-items="expandedItems"
          @toggle-expanded="$emit('toggle-expanded', $event)"
          @menu-click="$emit('menu-click', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {ChevronDown, ChevronUp} from 'lucide-vue-next'
import MenuItem from './MenuItem.vue'
import type {MenuItemType} from "@/types/menu-item-type.ts";
import Badge from "@/components/ui/Badge.vue";
import Button from "@/components/ui/Button.vue";

const props = defineProps<{
  item: MenuItemType
  level: number
  isCollapsed: boolean
  activeView: string
  expandedItems: string[]
}>()

defineEmits<{
  (e: 'toggle-expanded', id: string): void
  (e: 'menu-click', id: string): void
}>()

const isActive = computed(() => props.activeView === props.item.id)
const hasChildren = computed(() => props.item.children?.length && props.item.children?.length > 0)
const isExpanded = computed(() => props.expandedItems.includes(props.item.id))
</script>
