import { defineStore } from "pinia";
import { ref } from "vue";

type Language = 'zh-cn' | 'en';

export const useTranslateStore = defineStore('translate', () => {
    const lang = ref<Language>(localStorage.getItem('language') as Language || 'zh-cn');

    const switchLanguage = () => {
        const switchLang = lang.value === 'zh-cn' ? 'en' : 'zh-cn';
        lang.value = switchLang;
        localStorage.setItem('language', switchLang);
        window.location.reload();
    };

    return {
        lang,
        switchLanguage
    }
})