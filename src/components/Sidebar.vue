<template>
  <div :class="[
'h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 shadow-lg transition-all duration-300 ease-in-out flex flex-col',
       isCollapsed ? 'w-16' : 'w-64'
       ]
  ">

    <!--Header-->
    <div class="p-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex-shrink-0">
      <div class="flex items-center justify-between">

        <div class="flex items-center space-x-2" v-if="!isCollapsed">
          <template v-if="isSettingsView">
            <Button
                v-if="isSettingsView"
                :variant="'ghost'"
                :size="'sm'"
                @click="handleBackToMain()"
                :class="'h-8 px-2 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 border-0 text-sm font-medium dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-slate-100'"
            >
              <ArrowLeft class="w-4 h-4 mr-1"/>
              Back
            </Button>
          </template>
          <template v-else>
            <div
                class="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Database class="w-5 h-5 text-white"/>
            </div>
            <div>
              <h1 class="text-lg font-bold text-slate-800 dark:text-slate-100">CMS Pro</h1>
              <p class="text-xs text-slate-500 dark:text-slate-400">Content Management</p>
            </div>
          </template>
        </div>
        <div class="flex items-center space-x-2">
          <ThemeToggle v-if="!isCollapsed"/>
          <Button
              :variant="'ghost'"
              :size="'sm'"
              @click="isCollapsed = !isCollapsed"
              class="h-8 w-8 p-0 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 border-0 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-slate-100"
          >
            <ChevronRight class="w-4 h-4" v-if="isCollapsed"/>

            <ChevronLeft class="w-4 h-4" v-if="!isCollapsed"/>

          </Button>
        </div>
      </div>

    </div>

    <!--Search Bar-->
    <div class="p-3 border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex-shrink-0"
         v-if="!isCollapsed && !isSettingsView">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500"/>
        <input
            type="text"
            placeholder="Search..."
            class="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
        />
      </div>
    </div>

    <!--Settings Header-->
    <div class="p-3 border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex-shrink-0"
         v-if="!isCollapsed && isSettingsView ">
      <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">Settings</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400">Manage your CMS configuration</p>
    </div>

    <!--Navigation Menu-->
    <nav class="flex-1 p-2 overflow-y-auto bg-white dark:bg-slate-800">
      <MenuItem
          v-for="item in currentMenuItems"
          :key="item.id"
          :item="item"
          :level="0"
          :is-collapsed="isCollapsed"
          :active-view="activeView"
          :expanded-items="expandedItems"
          @toggle-expanded="toggleExpanded"
          @menu-click="handleMenuClick"
      />
    </nav>

    <!--User Info Section-->
    <div class="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex-shrink-0">
      <template v-if="!isCollapsed">
        <div class="p-3 bg-white dark:bg-slate-800">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button
                  class="w-full flex items-center space-x-3 p-2 rounded-lg bg-white hover:bg-slate-50 transition-colors group text-slate-700 hover:text-slate-900 border-0 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:hover:text-slate-100">
                <div class="relative">
                  <Avatar class="w-9 h-9 border-2 border-white dark:border-slate-600 shadow-sm">
                    <AvatarImage :src="currentUser.avatar" :alt="currentUser.name"/>
                    <AvatarFallback class="bg-blue-600 text-white font-semibold">
                      {{ currentUser.name.split(' ').map(n => n[0]).join('') }}
                    </AvatarFallback>
                  </Avatar>
                  <div
                      :class="[
                  'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-600',
                  getStatusColor(currentUser.status)
                ]"
                  />
                </div>

                <div class="flex-1 text-left">
                  <p
                      class="font-semibold text-slate-800 dark:text-slate-100 text-sm group-hover:text-slate-900 dark:group-hover:text-slate-50"
                  >
                    {{ currentUser.name }}
                  </p>
                  <p
                      class="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                  >
                    {{ currentUser.role }}
                  </p>
                </div>

                <!-- Notification Bell -->
                <div class="relative">
                  <Bell
                      class="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"/>
                  <div
                      v-if="notificationCount > 0"
                      class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {{ notificationCount > 9 ? '9+' : notificationCount }}
                  </div>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                class="'w-56 shadow-lg bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600'"
            >
              <DropdownMenuLabel class="font-normal">
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {{ currentUser.name }}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ currentUser.email }}</p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator class="bg-slate-200 dark:bg-slate-600"/>

              <DropdownMenuItem
                  class="cursor-pointer text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100 focus:bg-slate-50 dark:focus:bg-slate-600"
              >
                <Bell class="w-4 h-4 mr-2"/>
                Notifications
                <Badge
                    v-if="notificationCount > 0"
                    class="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] h-4 flex items-center justify-center"
                >
                  {{ notificationCount > 9 ? '9+' : notificationCount }}
                </Badge>
              </DropdownMenuItem>

              <DropdownMenuItem
                  class="cursor-pointer text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100 focus:bg-slate-50 dark:focus:bg-slate-600"
              >
                <User class="w-4 h-4 mr-2"/>
                Profile Settings
              </DropdownMenuItem>

              <DropdownMenuItem
                  class="cursor-pointer text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100 focus:bg-slate-50 dark:focus:bg-slate-600"
              >
                <Settings class="w-4 h-4 mr-2"/>
                Account Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator class="bg-slate-200 dark:bg-slate-600"/>

              <DropdownMenuItem
                  class="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 hover:text-red-700 dark:hover:text-red-300 focus:bg-red-50 dark:focus:bg-red-900/20"
              >
                <LogOut class="w-4 h-4 mr-2"/>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </template>

      <template v-else>
        <div class="p-2 flex justify-center bg-white dark:bg-slate-800">
          <div class="flex flex-col items-center space-y-2">
            <ThemeToggle/>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                    class="relative p-2 rounded-lg bg-white hover:bg-slate-50 transition-colors border-0 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  <Avatar class="w-8 h-8 border-2 border-white dark:border-slate-600 shadow-sm">
                    <AvatarImage :src="currentUser.avatar" :alt="currentUser.name"/>
                    <AvatarFallback class="bg-blue-600 text-white font-semibold text-xs">
                      {{ currentUser.name.split(' ').map(n => n[0]).join('') }}
                    </AvatarFallback>
                  </Avatar>
                  <div
                      :class="[
                  'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-600',
                  getStatusColor(currentUser.status)
                ]"
                  />
                  <!-- Notification indicator for collapsed state -->
                  <div
                      v-if="notificationCount > 0"
                      class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {{ notificationCount > 9 ? '9+' : notificationCount }}
                  </div>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                  align="end"
                  class="w-56 shadow-lg bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
              >
                <DropdownMenuLabel class="font-normal">
                  <div class="flex flex-col space-y-1">
                    <p class="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {{ currentUser.name }}
                    </p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ currentUser.email }}</p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator class="bg-slate-200 dark:bg-slate-600"/>

                <DropdownMenuItem
                    class="cursor-pointer text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100 focus:bg-slate-50 dark:focus:bg-slate-600"
                >
                  <Bell class="w-4 h-4 mr-2"/>
                  Notifications
                  <Badge
                      v-if="notificationCount > 0"
                      class="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] h-4 flex items-center justify-center"
                  >
                    {{ notificationCount > 9 ? '9+' : notificationCount }}
                  </Badge>
                </DropdownMenuItem>

                <DropdownMenuItem
                    class="cursor-pointer text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100 focus:bg-slate-50 dark:focus:bg-slate-600"
                >
                  <User class="w-4 h-4 mr-2"/>
                  Profile Settings
                </DropdownMenuItem>

                <DropdownMenuItem
                    class="cursor-pointer text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100 focus:bg-slate-50 dark:focus:bg-slate-600"
                >
                  <Settings class="w-4 h-4 mr-2"/>
                  Account Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator class="bg-slate-200 dark:bg-slate-600"/>

                <DropdownMenuItem
                    class="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 hover:text-red-700 dark:hover:text-red-300 focus:bg-red-50 dark:focus:bg-red-900/20"
                >
                  <LogOut class="w-4 h-4 mr-2"/>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </template>
    </div>

  </div>


</template>
<script setup lang="ts">

import {
  Home,
  FileText,
  Users,
  Settings,
  Database,
  Image,
  BarChart3,
  Mail,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Bell,
  Search,
  ArrowLeft,
  Shield,
  Palette,
  Key,
  Globe,
  ChevronDown,
  ChevronUp,
  Layers,
  FileStack,
  File,
  Lock,
  FileImage
} from "lucide-vue-next";
import {type Component, computed, ref} from "vue";
import type {MenuItemType} from "@/types/menu-item-type.ts";
import MenuItem from "@/components/ui/MenuItem.vue";
import ThemeToggle from "@/components/ui/ThemeToggle.vue";
import Button from "@/components/ui/Button.vue";
import DropdownMenuContent from "@/components/ui/DropdownMenu/DropdownMenuContent.vue";
import DropdownMenu from "@/components/ui/DropdownMenu/DropdownMenu.vue";
import DropdownMenuTrigger from "@/components/ui/DropdownMenu/DropdownMenuTrigger.vue";
import Badge from "@/components/ui/Badge.vue";
import DropdownMenuItem from "@/components/ui/DropdownMenu/DropdownMenuItem.vue";
import Avatar from "@/components/ui/Avatar/Avatar.vue";
import AvatarImage from "@/components/ui/Avatar/AvatarImage.vue";
import AvatarFallback from "@/components/ui/Avatar/AvatarFallback.vue";
import DropdownMenuSeparator from "@/components/ui/DropdownMenu/DropdownMenuSeparator.vue";
import DropdownMenuLabel from "@/components/ui/DropdownMenu/DropdownMenuLabel.vue";

interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: 'online' | 'away' | 'offline';
}

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const mainMenuItems: MenuItemType[] = [
  {id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard'},
  {id: 'collections', label: 'Collections', icon: Layers, href: '/collections'},
  {
    id: 'content',
    label: 'Content',
    icon: FileText,
    href: '/content',
    children: [
      {id: 'articles', label: 'Articles', icon: File, href: '/content/articles', badge: '12'},
      {id: 'posts', label: 'Posts', icon: FileStack, href: '/content/posts', badge: '8'},
      {id: 'pages', label: 'Pages', icon: FileImage, href: '/content/pages', badge: '15'}
    ]
  },
  {id: 'media', label: 'Media', icon: Image, href: '/media'},
  {id: 'permissions', label: 'Permissions', icon: Lock, href: '/permissions'},
  {id: 'settings', label: 'Settings', icon: Settings, href: '/settings'},
];


const settingsMenuItems: MenuItemType[] = [
  {id: 'general', label: 'General', icon: Settings, href: '/settings/general'},
  {id: 'users-settings', label: 'Users', icon: Users, href: '/settings/users'},
  {id: 'api-keys', label: 'API Keys', icon: Key, href: '/settings/api-keys'},
  {id: 'appearance', label: 'Appearance', icon: Palette, href: '/settings/appearance'},
  {id: 'security', label: 'Security', icon: Shield, href: '/settings/security'},
  {id: 'localization', label: 'Localization', icon: Globe, href: '/settings/localization'},
];

const currentUser: User = {
  name: 'Alex Johnson',
  email: 'alex.johnson@company.com',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  role: 'Administrator',
  status: 'online'
};
const isCollapsed = ref(false)

const isSettingsView = ref(false)
const expandedItems = ref<string[]>(['content'])
const notificationCount = ref(3) // моковое значение
const currentMenuItems = computed(() =>
    isSettingsView.value ? settingsMenuItems : mainMenuItems
)


const props = defineProps<{ activeView: string }>()

const emit = defineEmits<{ (e: 'view-change', view: string): void }>()

const handleMenuClick = (itemId: string) => {
  if (itemId === 'settings') {
    isSettingsView.value = true
    emit('view-change', itemId)
  } else if (settingsMenuItems.some(item => item.id === itemId)) {
    isSettingsView.value = true
    emit('view-change', itemId)
  } else {
    isSettingsView.value = false
    emit('view-change', itemId)
  }
}


const handleBackToMain = () => {
  emit('view-change', 'collections')
  isSettingsView.value = false
};

const toggleExpanded = (id: string) => {
  if (expandedItems.value.includes(id)) {
    expandedItems.value = expandedItems.value.filter((i) => i !== id)
  } else {
    expandedItems.value.push(id)
  }
}

const getStatusColor = (status: User['status']) => {
  switch (status) {
    case 'online':
      return 'bg-green-500';
    case 'away':
      return 'bg-yellow-500';
    case 'offline':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
};
</script>