<script setup>

import { ref } from 'vue'
import Select from "@/components/ui/select/Select.vue";

const single = ref(null)
const multi = ref([])

const options = [
  { label: 'Purple', value: 'purple' },
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green1' },
  { label: 'Purple', value: 'purple1' },
  { label: 'Red', value: 'red1' },
  { label: 'Green', value: 'green2' },
  { label: 'Purple', value: 'purple2' },
  { label: 'Red', value: 'red2' },
  { label: 'Green', value: 'green3' },
  { label: 'Purple', value: 'purple3' },
  { label: 'Red', value: 'red3' },
  { label: 'Green', value: 'green4' },
  { label: 'Purple', value: 'purple4' },
  { label: 'Red', value: 'red4' },
  { label: 'Green', value: 'green5' },
  { label: 'Purple', value: 'purple5' },
  { label: 'Red', value: 'red5' },
  { label: 'Green', value: 'green6' },
]


</script>

<template>
  <div class="p-10 space-y-6">

    <div>
      <h2 class="font-bold text-lg mb-2">Single Select</h2>
      <Select v-model="single" :options="options" placeholder="Select..." />
    </div>
    {{single}}
    <div>
      <h2 class="font-bold text-lg mb-2">Multi Select</h2>
      <Select v-model="multi" :options="options" placeholder="Pick many" multiple />
    </div>
    {{multi}}
  </div>
</template>

