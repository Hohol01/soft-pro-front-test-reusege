import { ref, watchEffect } from 'vue'

export type Theme = 'light' | 'dark'

let initialTheme: Theme = 'light'
const saved = localStorage.getItem('theme') as Theme | null
if (saved === 'light' || saved === 'dark') {
    initialTheme = saved
}
const theme = ref<Theme>(initialTheme)

watchEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme.value)
    localStorage.setItem('theme', theme.value)
})

export function useTheme() {
    function toggleTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    return {
        theme,
        toggleTheme
    }
}