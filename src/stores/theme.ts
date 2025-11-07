import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore('theme', () => {
    const time: number = new Date().getHours();
    const body: HTMLElement = document.body;
    const theme = ref<'dark' | 'light'>(time > 17 || time < 6 ? 'dark' : 'light');

    const switchTheme = () => theme.value = theme.value === 'dark' ? 'light' : 'dark';

    watch(
        theme,
        () => {
            body.dataset.theme = theme.value;
        },
        { immediate: true, flush: 'post' }
    )

    return {
        theme,
        switchTheme
    }
})