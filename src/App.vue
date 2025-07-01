<template>
  <div class="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">

    <Sidebar :active-view="activeView" @view-change="setActiveView" />
    <main class="flex-1 flex flex-col overflow-hidden">
      <div class="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <component :is="currentViewComponent" :active-section="activeView" />
      </div>
    </main>
    </div>



</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Collections from "@/pages/Collections.vue";
import {computed, ref, h} from "vue";
import Settings from "@/pages/Settings.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectPage from "@/pages/SelectPage.vue";

const activeView = ref('collections');

const setActiveView = (view: string) => {
  activeView.value = view;
};

const currentViewComponent = computed(() => {
  switch (activeView.value) {
    case 'dashboard':
      return 'Dashboard';
    case 'collections':
      return Collections;
    case 'articles':
      return ;
    case 'posts':
      return 'Posts';
    case 'pages':
      return 'Pages';
    case 'media':
      return 'Media';
    case 'permissions':
      return 'Permissions';
    case 'select':
      return SelectPage
    case 'settings':
    case 'general':
    case 'users-settings':
    case 'api-keys':
    case 'appearance':
    case 'security':
    case 'localization':
       return () => h(Settings, { activeSection:  activeView.value });
    default:
      return 'Dashboard';
  }
});
</script>

