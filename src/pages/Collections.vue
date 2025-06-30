<script setup lang="ts">
import {ref} from 'vue';
import {
  Layers,
  Plus,
  Settings,
  Database,
  Grid,
  List,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  Copy,
  ExternalLink,
} from 'lucide-vue-next';

import DropdownMenuContent from "@/components/ui/DropdownMenu/DropdownMenuContent.vue";
import DropdownMenuItem from "@/components/ui/DropdownMenu/DropdownMenuItem.vue";
import DropdownMenu from "@/components/ui/DropdownMenu/DropdownMenu.vue";
import DropdownMenuTrigger from "@/components/ui/DropdownMenu/DropdownMenuTrigger.vue";
import DropdownMenuSeparator from "@/components/ui/DropdownMenu/DropdownMenuSeparator.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import Card from "@/components/ui/card/Card.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import Badge from "@/components/ui/Badge.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Button from "@/components/ui/Button.vue";
import TableHeader from "@/components/ui/table/TableHeader.vue";
import Table from "@/components/ui/table/Table.vue";
import TableRow from "@/components/ui/table/TableRow.vue";
import TableHead from "@/components/ui/table/TableHead.vue";
import TableBody from "@/components/ui/table/TableBody.vue";
import TableCell from "@/components/ui/table/TableCell.vue";

const viewMode = ref<'grid' | 'list'>('grid');

const collections = [
  {
    id: 1,
    name: 'Articles',
    description: 'Blog posts and articles',
    count: 12,
    fields: 8,
    lastModified: '2 hours ago',
    status: 'active'
  },
  {
    id: 2,
    name: 'Products',
    description: 'E-commerce product catalog',
    count: 45,
    fields: 15,
    lastModified: '1 day ago',
    status: 'active'
  },
  {
    id: 3,
    name: 'Events',
    description: 'Upcoming events and webinars',
    count: 8,
    fields: 12,
    lastModified: '3 days ago',
    status: 'draft'
  },
  {
    id: 4,
    name: 'Team Members',
    description: 'Company team and staff',
    count: 23,
    fields: 10,
    lastModified: '1 week ago',
    status: 'active'
  },
  {
    id: 5,
    name: 'Testimonials',
    description: 'Customer reviews and testimonials',
    count: 34,
    fields: 6,
    lastModified: '2 weeks ago',
    status: 'active'
  },
  {
    id: 6,
    name: 'Portfolio',
    description: 'Project showcase and case studies',
    count: 18,
    fields: 14,
    lastModified: '3 weeks ago',
    status: 'draft'
  }
];

function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
    case 'draft':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600';
  }
}
</script>

<template>
  <div class="w-full max-w-7xl mx-auto p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Collections</h1>
        <p class="text-slate-600 dark:text-slate-300">Manage your content collections and data structures.</p>
      </div>
      <div class="flex items-center gap-3">
        <div
            class="flex items-center bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-1">
          <Button
              :class="viewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-transparent hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300'"
              class="h-8 w-8 p-0"
              :size="'sm'"
              :variant="viewMode === 'grid' ? 'default' : 'ghost'"
              @click="viewMode = 'grid'">
            <Grid class="w-4 h-4"/>
          </Button>
          <Button
              :class="viewMode === 'list' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-transparent hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300'"
              class="h-8 w-8 p-0"
              :size="'sm'"
              :variant="viewMode === 'list' ? 'default' : 'ghost'"
              @click="viewMode = 'list'">
            <List class="w-4 h-4"/>
          </Button>
        </div>
        <Button
            class="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
          <Plus class="w-4 h-4 mr-2"/>
          New Collection
        </Button>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="collection in collections" :key="collection.id"
            class="shadow-lg border-0 bg-white dark:bg-slate-800 backdrop-blur-sm hover:shadow-xl transition-all duration-200 transform hover:scale-105">
        <CardHeader
            class="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 dark:from-slate-800 to-white dark:to-slate-800">
          <div class="flex items-center justify-between">
            <CardTitle class="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center">
              <Layers class="w-5 h-5 mr-2 text-blue-600"/>
              {{ collection.name }}
            </CardTitle>
            <Badge variant="secondary" :class="getStatusColor(collection.status)">{{ collection.status }}</Badge>
          </div>
        </CardHeader>
        <CardContent class="p-6">
          <p class="text-slate-600 dark:text-slate-300 mb-4">{{ collection.description }}</p>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-slate-500 dark:text-slate-400">Entries</span>
              <span class="font-semibold text-slate-800 dark:text-slate-100">{{ collection.count }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-slate-500 dark:text-slate-400">Fields</span>
              <span class="font-semibold text-slate-800 dark:text-slate-100">{{ collection.fields }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-slate-500 dark:text-slate-400">Last Modified</span>
              <span class="text-sm text-slate-600 dark:text-slate-300">{{ collection.lastModified }}</span>
            </div>
          </div>
          <div class="flex gap-2 mt-6">
            <Button variant="outline" size="sm"
                    class="flex-1 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600">
              <Database class="w-4 h-4 mr-1"/>
              View
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline" size="sm"
                        class="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600">
                  <Settings class="w-4 h-4"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-48">
                <DropdownMenuItem class="cursor-pointer">
                  <Edit2 class="w-4 h-4 mr-2"/>
                  Edit Collection
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer">
                  <Settings class="w-4 h-4 mr-2"/>
                  Configure Fields
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer">
                  <Copy class="w-4 h-4 mr-2"/>
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer">
                  <ExternalLink class="w-4 h-4 mr-2"/>
                  Export Data
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem class="cursor-pointer text-red-600 focus:text-red-600 hover:text-red-700">
                  <Trash2 class="w-4 h-4 mr-2"/>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- List View -->
    <Card v-if="viewMode === 'list'"
          class="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <CardContent class="p-0">
        <div class="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow
                  :class="'bg-slate-50/50 dark:bg-slate-700/50 hover:bg-slate-50/80 dark:hover:bg-slate-700/80 transition-colors'">
                <TableHead :class="'font-semibold text-slate-700 dark:text-slate-300 min-w-[200px]'">
                  <div class="flex items-center">
                    <Layers class="w-4 h-4 mr-2"/>
                    Collection Name
                  </div>
                </TableHead>
                <TableHead :class="'font-semibold text-slate-700 dark:text-slate-300 min-w-[250px]'">Description
                </TableHead>
                <TableHead :class="'font-semibold text-slate-700 dark:text-slate-300 text-center'">Entries</TableHead>
                <TableHead :class="'font-semibold text-slate-700 dark:text-slate-300 text-center'">Fields</TableHead>
                <TableHead :class="'font-semibold text-slate-700 dark:text-slate-300'">Status</TableHead>
                <TableHead :class="'font-semibold text-slate-700 dark:text-slate-300'">Last Modified</TableHead>
                <TableHead :class="'font-semibold text-slate-700 dark:text-slate-300 text-center'">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                  v-for="collection in collections"
                  :key="collection.id"
                  :class="'transition-all duration-200 hover:bg-slate-50/60 dark:hover:bg-slate-700/60'"
              >
                <TableCell class="'font-medium text-slate-800 dark:text-white'">
                  <div class="flex items-center">
                    <Layers class="w-5 h-5 mr-3 text-blue-600"/>
                    <div>
                      <div class="font-semibold">{{ collection.name }}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell :class="'text-slate-600 dark:text-slate-400'">
                  {{ collection.description }}
                </TableCell>

                <TableCell :class="'text-center'">
                  <Badge :variant="'outline'"
                         :class="'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300'">
                    {{ collection.count }}
                  </Badge>
                </TableCell>

                <TableCell :class="'text-center'">
                  <Badge :variant="'outline'"
                         :class="'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300'">
                    {{ collection.fields }}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                      :variant="'secondary'"
                      :class="getStatusColor(collection.status)"
                  >
                    {{ collection.status }}
                  </Badge>
                </TableCell>

                <TableCell :class="'text-slate-600 dark:text-slate-400'">
                  {{ collection.lastModified }}
                </TableCell>

                <TableCell>
                  <div class="flex items-center justify-center gap-1">
                    <Button
                        :variant="'outline'"
                        :size="'sm'"
                        class="h-8 w-8 p-0 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 hover:border-blue-300 dark:hover:border-slate-500 hover:text-blue-600 dark:hover:text-slate-200 transition-all duration-200 shadow-sm"
                        :title="'View'"
                    >
                      <Eye class="w-4 h-4"/>
                    </Button>

                    <Button
                        :variant="'outline'"
                        :size="'sm'"
                        class="h-8 w-8 p-0 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-green-50 dark:hover:bg-slate-600 hover:border-green-300 dark:hover:border-slate-500 hover:text-green-600 dark:hover:text-slate-200 transition-all duration-200 shadow-sm"
                        :title="'Edit'"
                    >
                      <Edit2 class="w-4 h-4"/>
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                            :variant="'outline'"
                            :size="'sm'"
                            class="h-8 w-8 p-0 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-200 shadow-sm"
                        >
                          <MoreVertical class="w-4 h-4"/>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" :class="'w-48'">
                        <DropdownMenuItem
                            :class="'cursor-pointer'"
                        >
                          <Settings class="w-4 h-4 mr-2"/>
                          Configure Fields
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            :class="'cursor-pointer'"
                        >
                          <Copy class="w-4 h-4 mr-2"/>
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            :class="'cursor-pointer'"
                        >
                          <ExternalLink class="w-4 h-4 mr-2"/>
                          Export Data
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            :class="'cursor-pointer text-red-600 focus:text-red-600 hover:text-red-700'"
                        >
                          <Trash2 class="w-4 h-4 mr-2"/>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

    <Card class="shadow-lg border-0 bg-white dark:bg-slate-800 backdrop-blur-sm border-2 border-dashed border-slate-300 dark:border-slate-600">
      <CardContent class="p-12 text-center">
        <Layers class="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-slate-500" />
        <h3 class="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">Create Your First Collection</h3>
        <p class="text-slate-500 dark:text-slate-400 mb-6">Collections help you organize and structure your content efficiently.</p>
        <Button class="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus class="w-4 h-4 mr-2" />
          Create Collection
        </Button>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
</style>
