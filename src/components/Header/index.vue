<script setup lang="ts">
import { MoonNight, NoSmoking, Smoking, Sunrise } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { useThemeStore } from '../../stores/theme';
import { useTranslateStore } from '../../stores/translate';
import type { ThemeIcon } from './types';
import { inject } from 'vue';
import { RouterLink } from 'vue-router';

const themeStore = useThemeStore();
const translateStore = useTranslateStore();

const translation: any = inject('app-translation');

const handleSwitchTheme = themeStore.switchTheme;
const handleSwitchTranslation = translateStore.switchLanguage;

const navLinks: { to: string; title: string }[] = [
    {
        title: translation.index,
        to: '/'
    },
    {
        title: translation.about,
        to: '/about'
    }
];

const themeIcon: ThemeIcon = {
    dark: Sunrise,
    light: MoonNight,

    "zh-cn": Smoking,
    'en': NoSmoking
}
</script>

<template>
    <header class="header-container flex items-center justify-between z-10">
        <section class="logo">
            <RouterLink to="/">
                <span class="logo-text transition-all duration-300">Pop</span>
                <span class="text-(--primary-hover-text-color)">Source</span>
            </RouterLink>
        </section>
        <nav class="navigate flex items-center gap-4">
            <RouterLink class="relative link" active-class="active-text" v-for="{ to, title } in navLinks" :to>
                {{ title }}
                <div 
                    class="
                        under-border
                        absolute 
                        -bottom-0.5 
                        left-0 
                        w-0
                        h-0.5 
                        bg-(--primary-hover-text-color) 
                        transition-all 
                        duration-500 
                        ease-in-out
                    "></div>
            </RouterLink>
        </nav>
        <section class="configs flex items-center gap-6">
            <button 
                class="
                    relative
                    after:rounded-full 
                    after:content-[''] 
                    after:absolute 
                    after:top-1/2 
                    after:left-1/2
                    after:-translate-1/2
                    after:w-8
                    after:h-8
                    after:-z-1
                    hover:after:bg-(--btn-bg-color)
                " 
                title="translate: switch language"
                @click="handleSwitchTheme"
            >
                <ElIcon><component :is="themeIcon[themeStore.theme]" /></ElIcon>
            </button>
            <button 
                class="
                    relative
                    after:rounded-full 
                    after:content-[''] 
                    after:absolute 
                    after:top-1/2 
                    after:left-1/2
                    after:-translate-1/2
                    after:w-8
                    after:h-8
                    after:-z-1
                    hover:after:bg-(--btn-bg-color)
                " 
                title="theme: switch theme"
                @click="handleSwitchTranslation"
            >
                <ElIcon><component :is="themeIcon[translateStore.lang]" /></ElIcon>
            </button>
        </section>
    </header>
</template>

<style scoped>
    .header-container {
        position: sticky;
        top: 0px;
        left: 0px;

        background-color: var(--header-bg-color);
        box-shadow: var(--header-shadow) var(--box-shadow-color);
        backdrop-filter: blur(20px);

        padding: 1rem 10rem;
    }

    .logo {
        font-weight: 900;
    }

    .configs button {
        cursor: pointer;
        height: 1.2rem;
        width: 1.2rem;
    }

    .logo-text {
        color: var(--secondary-text-color);
    }

    .link:hover,
    .active-text,
    .logo:hover .logo-text {
        color: var(--primary-hover-text-color);
    }

    .link:hover .under-border {
        width: 100%;
    }
</style>