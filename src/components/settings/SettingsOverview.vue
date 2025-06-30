<template>
  <div class="space-y-6">
<!--    {/* Settings Categories */}-->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <Card
          v-for="category in settingsCategories"
          :key="category.id"
          class="shadow-lg border-0 bg-white dark:bg-slate-800 backdrop-blur-sm hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
      >
        <CardHeader class="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 dark:from-slate-800 to-white dark:to-slate-800">
          <CardTitle class="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center">
            <component :is="category.icon" class="w-5 h-5 mr-2" :class="category.color" />
            {{ category.name }}
          </CardTitle>
        </CardHeader>
        <CardContent class="p-6">
          <p class="text-slate-600 dark:text-slate-300 mb-6">{{ category.description }}</p>
          <Button
              :variant="'outline'"
              class="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600"
          >
            Configure
          </Button>
        </CardContent>
      </Card>
    </div>

<!--    {/* Quick Settings */}-->
    <Card class="shadow-lg border-0 bg-white dark:bg-slate-800 backdrop-blur-sm">
      <CardHeader class="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 dark:from-slate-800 to-white dark:to-slate-800">
        <CardTitle class="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
          <Bell class="w-5 h-5 mr-2" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-medium text-slate-800 dark:text-slate-100">Site Information</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-slate-600 dark:text-slate-400">Site Name</span>
                <span class="text-sm font-medium text-slate-800 dark:text-slate-100">CMS Pro</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-slate-600 dark:text-slate-400">Version</span>
                <span class="text-sm font-medium text-slate-800 dark:text-slate-100">2.1.0</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-slate-600 dark:text-slate-400">Environment</span>
                <Badge class="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Production</Badge>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="font-medium text-slate-800 dark:text-slate-100">System Health</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-slate-600 dark:text-slate-400">Database</span>
                <Badge class="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Connected</Badge>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-slate-600 dark:text-slate-400">Cache</span>
                <Badge class="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Active</Badge>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-slate-600 dark:text-slate-400">Storage</span>
                <Badge class="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">78% Used</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">

import {Bell} from "lucide-vue-next";
import type {Component} from "vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Badge from "@/components/ui/Badge.vue";
import Button from "@/components/ui/Button.vue";

const props = defineProps<{
  settingsCategories: {
  id: string,
      name: string,
      description: string,
      icon: Component,
      color: string,
}[] | null;
}>();
</script>