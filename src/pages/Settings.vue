<template>
  <div class="w-full max-w-7xl mx-auto p-6 space-y-6">
<!--    {/* Header */}-->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{{ getSectionTitle() }}</h1>
      <p class="text-slate-600 dark:text-slate-300">
        {{activeSection === 'settings'
        ? 'Configure your CMS settings and preferences.'
        : `Manage your ${getSectionTitle().toLowerCase()} configuration.`
        }}
      </p>
    </div>

    <component :is="currentViewComponent" :settingsCategories="settingsCategories" />
  </div>
</template>

<script setup lang="ts">
import { Bell, Globe, Shield, Key, Palette, Users, Settings as SettingsIcon } from 'lucide-vue-next';
import Badge from "@/components/ui/Badge.vue";
import {computed, h} from "vue";
import Collections from "@/pages/Collections.vue";
import SettingsOverview from "@/components/settings/SettingsOverview.vue";
const settingsCategories = [
  {
    id: 'general',
    name: 'General Settings',
    description: 'Basic site configuration and preferences',
    icon: SettingsIcon,
    color: 'text-blue-600'
  },
  {
    id: 'users-settings',
    name: 'User Management',
    description: 'Manage user accounts and profiles',
    icon: Users,
    color: 'text-green-600'
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Security settings and authentication',
    icon: Shield,
    color: 'text-red-600'
  },
  {
    id: 'api-keys',
    name: 'API Keys',
    description: 'Manage API keys and integrations',
    icon: Key,
    color: 'text-purple-600'
  },
  {
    id: 'appearance',
    name: 'Appearance',
    description: 'Customize the look and feel',
    icon: Palette,
    color: 'text-pink-600'
  },
  {
    id: 'localization',
    name: 'Localization',
    description: 'Language and regional settings',
    icon: Globe,
    color: 'text-orange-600'
  }
];

const props = defineProps<{
  activeSection: string | null;
}>();

const getSectionTitle = () => {
  const section = settingsCategories.find(cat => cat.id === props.activeSection);
  return section ? section.name : 'Settings';
};

const currentViewComponent = computed(() => {
  switch (props.activeSection) {
    case 'general':
      return '';
    case 'users-settings':
      return '';
    case 'security':
      return '';
    case 'api-keys':
      return '';
    case 'appearance':
      return '';
    case 'localization':
      return '';
    default:
      return SettingsOverview;
  }
});
</script>
