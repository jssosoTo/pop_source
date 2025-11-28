<template>
    <div class="
        cursor-pointer 
        flex 
        gap-2 
        justify-between 
        items-center 
        py-2 
        px-4 
        border 
        rounded 
        border-(--primary-hover-text-color) 
        bg-(--primary-bg-color) 
        text-xs 
        transition 
        hover:-translate-y-1 
        hover:shadow-xl
    ">
        <div class="text-container">
            <h2 class="border-l-2 border-(--primary-hover-text-color) pl-2 text-sm mb-1"><div v-html="title"></div></h2>
            <p class="text-(--sub-text-color) text-ellipsis"><div v-html="detail"></div></p>
        </div>
        <div>
            <button
                @click="navigate(url)"
                class="
                    switch-btn 
                    bg-(--primary-bg-color) 
                    border-(--primary-text-color) 
                    text-(--primary-text-color)
                "
            >
                <ElIcon>
                    <ArrowRight />
                </ElIcon>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { computed } from 'vue';

export interface InfoItemType {
    title: string;
    detail: string;
    url: string;
    keyword?: string;
}

const props = defineProps<InfoItemType>()

const highLightText = (keyword: string | undefined, filterText: string) => {
    if (!keyword || !filterText.includes(keyword)) return filterText;
    let formatTitleArr = filterText.split(keyword);
    return formatTitleArr.join(`<span style="color: var(--primary-hover-text-color)">${keyword}</span>`)
}

const title = computed(() => highLightText(props.keyword, props.title));
const detail = computed(() => highLightText(props.keyword, props.detail));

const navigate = (url: string) => window.open(url, '_blank');
</script>

<style scoped>
    .switch-btn {
        cursor: pointer;

        width: 1.8rem;
        aspect-ratio: 1;
        border: 1px solid;
        border-radius: 50%;
        padding: .4rem;
    }

    .switch-btn svg {
        transition: all .3s;
    }

    .switch-btn:hover svg {
        transform: scale(1.2);
    }
</style>