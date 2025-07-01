<!-- CustomSelect.vue -->
<script setup>
import {ref, computed, onMounted, onBeforeUnmount, nextTick} from 'vue'
import {onClickOutside} from "@vueuse/core";

const props = defineProps({
  options: Array, // [{ label: 'Purple', value: 'purple' }, ...]
  modelValue: [Array, Object, null],
  multiple: Boolean,
  placeholder: {type: String, default: 'Select...'}
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const search = ref('')
const root = ref(null)
const inputRef = ref(null)
const inputFocus = ref(false)


const filteredOptions = computed(() => {
  if (!search.value) return props.options
  return props.options.filter((opt) =>
      opt.label.toLowerCase().includes(search.value.toLowerCase())
  )
})

const isSelected = (option) => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.some((item) => item.value === option.value)
  }
  return props.modelValue?.value === option.value
}

const toggleDropdown = () => {
  isOpen.value = true
  inputFocus.value = !inputFocus.value
  inputRef.value?.focus()
  if (isOpen.value) nextTick(() => inputRef.value?.focus())
}

const closeDropdown = () => {
  isOpen.value = false
  search.value = ''
}

const selectOption = (option) => {
  if (props.multiple) {
    const selected = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = selected.findIndex((item) => item.value === option.value)
    if (index === -1) {
      selected.push(option)
    }
    else {
      selected.splice(index, 1)
    }
    emit('update:modelValue', selected)

    inputRef.value?.focus()
  } else {
    emit('update:modelValue', option)
    closeDropdown()
  }
}

const removeTag = (option) => {
  const newValue = props.modelValue.filter((item) => item.value !== option.value)
  emit('update:modelValue', newValue)
}

const handleClickOutside = (e) => {
  if (!root.value.contains(e.target)) {
    closeDropdown()
  }
}

const onInputBlur = () => {
  inputFocus.value = false
  search.value = ''
}

const onInputFocus = () => {
  inputFocus.value = true
  search.value = ''
}

onClickOutside(root, () => (isOpen.value = false))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div ref="root" class="select-container">
    <!-- A11y live region -->
    <span id="react-select-live-region" class="a11yText"></span>
    <span aria-live="polite" aria-atomic="false" aria-relevant="additions text" role="log"
          class="a11yText"></span>

    <!-- Control -->

    <!--    single select-->
    <template v-if="!multiple">
      <div
          :class="inputFocus ? 'select-control-focus':'select-control'"
          role="combobox" :aria-expanded="isOpen" aria-haspopup="true">
        <div class="css-hlgwow" @click="toggleDropdown" style="display: grid">
          <!-- Single value -->

          <template v-if="modelValue && search ===''">
            <div class="singleValue">{{ modelValue.label }}</div>
          </template>

          <!-- Placeholder -->
          <template v-if="(!search && !modelValue)">
            <div class="placeholder">{{ placeholder }}</div>
          </template>


          <!-- Input -->
          <div class="input-container" :data-value="search">
            <input
                v-if="inputFocus"
                ref="inputRef"
                @focus="onInputFocus"
                @blur="onInputBlur"
                autocapitalize="none"
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                type="text"
                tabindex="0"
                aria-autocomplete="list"
                role="combobox"
                v-model="search"

            />
          </div>


        </div>
        <div class="right-side">
          <div
              v-if="modelValue"
              @click="emit('update:modelValue', multiple ? [] : null)"
              :class="isOpen ? 'indicatorContainer-open' : 'indicatorContainer'"  aria-hidden="true">
            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="side-icon">
              <path
                  d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
            </svg>
          </div>
          <span class="indicatorSeparator"></span>
          <div :class="isOpen ? 'indicatorContainer-open' : 'indicatorContainer'"  aria-hidden="true">
            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="side-icon">
              <path
                  d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </div>
        </div>

      </div>
    </template>

    <!--    multi select-->

    <template v-if="multiple">
      <div
          :class="isOpen ? 'select-control-focus':'select-control'"
          @click="toggleDropdown">
        <div class="select-area" :style="{display: modelValue.length === 0 ? 'grid': ''}">

            <div class="multiValue"
                 :key="i"
                 v-for="(item, i) in modelValue">
              <div
                  class="multiValue-label">
                {{ item.label }}

              </div>
              <div role="button" class="remove-tag" :aria-label="'Remove ' + item.label"
              @click="removeTag(item)">
                <svg height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false"
                     class="side-icon">
                  <path
                      d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                </svg>
              </div>
            </div>
          <template v-if="(!search && modelValue.length === 0)">
            <div class="placeholder">{{ placeholder }}</div>
          </template>
          <div class="input-container" :data-value="search">
            <input
                ref="inputRef"
                @focus="onInputFocus"
                @blur="onInputBlur"
                autocapitalize="none"
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                type="text"
                tabindex="0"
                aria-autocomplete="list"
                role="combobox"
                v-model="search"
                :placeholder="multiple || modelValue ? '' : placeholder"

            />
          </div>


        </div>



        <div class="right-side">
          <div
              v-if="modelValue.length !== 0"
              @click="emit('update:modelValue', multiple ? [] : null)"
              :class="isOpen ? 'indicatorContainer-open' : 'indicatorContainer'" aria-hidden="true">
            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="side-icon">
              <path
                  d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
            </svg>
          </div>
          <span class="indicatorSeparator"></span>
          <div :class="isOpen ? 'indicatorContainer-open' : 'indicatorContainer'"  aria-hidden="true">
            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="side-icon">
              <path
                  d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </div>
        </div>
      </div>
    </template>
    <!-- Dropdown -->
    <div v-if="isOpen" class="dropdown-menu">
      <div class="menu-container">
        <template v-if="!multiple"
                  >
          <div v-for="(option, i) in filteredOptions"
              :class=" isSelected(option) ? 'single-option-active' :'single-option'"

              @click="selectOption(option)"
              aria-disabled="false" id="react-select-3-option-0" tabindex="-1" role="option"
          >
            {{ option.label }}

          </div>
          <div class="option-no-value" v-if="filteredOptions.length === 0">
            No options
          </div>
        </template>
        <template v-if="multiple">
          <template
              v-for="(option, i) in filteredOptions">
            <div
                class="single-option"
                v-if="!isSelected(option)"

                @click="selectOption(option)"
                aria-disabled="false" id="react-select-3-option-0" tabindex="-1" role="option"
            >
              {{ option.label }}

            </div>
          </template>
          <div class="option-no-value" v-if="filteredOptions.length===0||filteredOptions.length === modelValue.length">
            No options
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-container {
  position: relative;
  box-sizing: border-box;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
}

.a11yText {
  z-index: 9999;
  border: 0px;
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  width: 1px;
  position: absolute;
  overflow: hidden;
  padding: 0px;
  white-space: nowrap;
}


.select-control {
  -webkit-box-align: center;
  align-items: center;
  cursor: default;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
  min-height: 38px;
  position: relative;
  transition: 100ms;
  background-color: rgb(255, 255, 255);
  border-color: rgb(204, 204, 204);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  outline: 0px !important;
}

.singleValue {
  grid-area: 1 / 1 / 2 / 3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(51, 51, 51);
  margin-left: 2px;
  margin-right: 2px;
  box-sizing: border-box;
}


.indicatorSeparator {
  width: 1px;
  background: #ccc;
  margin: 0 4px;
}

.indicatorContainer {
  display: flex;
  align-items: center;
  padding: 0 4px;
}

.input-container {
  visibility: visible;
  transform: translateZ(0px);
  flex: 1 1 auto;
  display: inline-grid
;
  grid-area: 1 / 1 / 2 / 3;
  grid-template-columns: 0px min-content;
  margin: 2px;
  padding-bottom: 2px;
  padding-top: 2px;
  color: rgb(51, 51, 51);
  box-sizing: border-box;
}

.css-hlgwow {
  -webkit-box-align: center;
  align-items: center;
  display: grid;
  flex: 1 1 0%;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  padding: 2px 8px;
  box-sizing: border-box;
}

.placeholder {
  grid-area: 1 / 1 / 2 / 3;
  color: rgb(128, 128, 128);
  margin-left: 2px;
  margin-right: 2px;
  box-sizing: border-box;
}

.input-container input {
  color: inherit;
  background: 0px center;
  opacity: 1;
  grid-area: 1 / 2;
  font: inherit;
  min-width: 2px;
  border: 0px;
  margin: 0px;
  outline: 0px;
  padding: 0px;
  width: 100%;
}

.right-side {
  -webkit-box-align: center;
  align-items: center;
  align-self: stretch;
  display: flex;
  flex-shrink: 0;
  box-sizing: border-box;
}

.indicatorContainer {
  display: flex;
  transition: color 150ms;
  color: rgb(204, 204, 204);
  padding: 8px;
  box-sizing: border-box;
}

.indicatorSeparator {
  align-self: stretch;
  width: 1px;
  background-color: rgb(204, 204, 204);
  margin-bottom: 8px;
  margin-top: 8px;
  box-sizing: border-box;
}

.side-icon {
  display: inline-block;
  fill: currentcolor;
  line-height: 1;
  stroke: currentcolor;
  stroke-width: 0;
}

.indicatorContainer {
  display: flex;
  transition: color 150ms;
  color: rgb(204, 204, 204);
  padding: 8px;
  box-sizing: border-box;
}

.indicatorContainer:hover {
  color: rgb(153, 153, 153);
}

.select-control-focus {
  -webkit-box-align: center;
  align-items: center;
  cursor: default;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
  min-height: 38px;
  position: relative;
  transition: 100ms;
  background-color: rgb(255, 255, 255);
  border-color: rgb(38, 132, 255);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  box-shadow: rgb(38, 132, 255) 0px 0px 0px 1px;
  box-sizing: border-box;
  outline: 0px !important;
}

.select-control:hover {
  border-color: rgb(179, 179, 179);
}

.select-control-focus:hover {
  border-color: rgb(38, 132, 255);
}

.select-control-focus:hover {
  border-color: rgb(38, 132, 255);
}

.dropdown-menu {
  top: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;
  margin-bottom: 8px;
  margin-top: 8px;
  box-sizing: border-box;
}

.single-option {
  cursor: default;
  display: block;
  font-size: inherit;
  width: 100%;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-color: transparent;
  color: inherit;
  padding: 8px 12px;
  box-sizing: border-box;
  line-height: 19px;
}

.single-option:hover {
  cursor: default;
  display: block;
  font-size: inherit;
  width: 100%;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-color: rgb(222, 235, 255);
  color: inherit;
  padding: 8px 12px;
  box-sizing: border-box;
}

.single-option-active {
  cursor: default;
  display: block;
  font-size: inherit;
  width: 100%;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-color: rgb(38, 132, 255);
  color: rgb(255, 255, 255);
  padding: 8px 12px;
  box-sizing: border-box;
  line-height: 19px;
}

.menu-container {
  max-height: 300px;
  overflow-y: auto;
  position: relative;
  padding-bottom: 4px;
  padding-top: 4px;
  box-sizing: border-box;
}

.select-area {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex: 1 1 0%;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  padding: 2px 8px;
  box-sizing: border-box;
}

.multiValue {
  display: flex;
  min-width: 0px;
  background-color: rgb(230, 230, 230);
  border-radius: 2px;
  margin: 2px;
  box-sizing: border-box;
}

.multiValue-label {
  transition: none;
  transform: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  color: rgb(51, 51, 51);
  font-size: 85%;
  padding: 3px 3px 3px 6px;
  box-sizing: border-box;
  line-height: 16px;
}


.remove-tag {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  border-radius: 2px;
  padding-left: 4px;
  padding-right: 4px;
  box-sizing: border-box;
}

.remove-tag:hover {
  background-color: rgb(255, 189, 173);
  color: rgb(222, 53, 11);
}

.option-no-value {
  text-align: center;
  color: rgb(153, 153, 153);
  padding: 8px 12px;
  box-sizing: border-box;
}

.input-container::after {
  content: attr(data-value) " ";
  visibility: hidden;
  white-space: pre;
  grid-area: 1 / 2;
  font: inherit;
  min-width: 2px;
  border: 0px;
  margin: 0px;
  outline: 0px;
  padding: 0px;
}

.indicatorContainer-open {
  display: flex;
  transition: color 150ms;
  color: rgb(102, 102, 102);
  padding: 8px;
  box-sizing: border-box;
}
</style>
