<template>
    <div class="relative carousel">
        <div 
            v-for="({ title, img, url, subTitle }, i) in descList" 
            class="absolute top-0 left-1/2 h-full -translate-x-1/2 w-2/4 rounded-2xl overflow-hidden transition-all duration-300"
            :class="[getClass(i)]"
        >
            <div 
                class="img-container cursor-pointer relative w-full h-full bg-amber-950" 
                :class="acitveIndex !== i && 'mask'"
                :key="url"
                @click="acitveIndex === i ? navigate(url) : acitveIndex = i"
            >
                <img :src="img" class=" h-full w-full object-contain" />
                <div class="title absolute -bottom-full left-0 w-full p-4 bg-[rgba(0,0,0,.5)] text-white">
                    <h2>{{ title }}</h2>
                    <p class="text-xs text-gray-400">{{ subTitle }}</p>
                </div>
            </div>
        </div>
        <button 
            class="
                switch-btn 
                absolute 
                left-8 
                top-1/2 
                -translate-y-1/2 
                bg-(--primary-bg-color) 
                border-(--primary-text-color) 
                text-(--primary-text-color)
            "
            @click="acitveIndex = getNextNum(acitveIndex, descList)"
        >
            <ElIcon>
                <ArrowLeft />
            </ElIcon>
        </button>
        <button 
            class="
                switch-btn 
                absolute 
                right-8 
                top-1/2 
                -translate-y-1/2
                bg-(--primary-bg-color) 
                border-(--primary-text-color) 
                text-(--primary-text-color)
            "
            @click="acitveIndex = getLastNum(acitveIndex, descList)"
        >
            <ElIcon>
                <ArrowRight />
            </ElIcon>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { ref } from 'vue';
import { getLastNum, getNextNum } from '../../ultis/handleNum';

    export interface CarouselItem {
        title: string; 
        subTitle: string;
        img: string; 
        url: string
    }

    const props = defineProps<{
        descList: CarouselItem[]
    }>()

    const acitveIndex = ref<number>(0);


    const navigate = (url: string) => window.open(url, '_blank');
    
    const getClass = (i: number) => {
        if (getNextNum(acitveIndex.value, props.descList) === 0 && i === 0) return "next-img";
        if (getLastNum(acitveIndex.value, props.descList) === props.descList.length - 1 && i === props.descList.length - 1) return "last-img";

        return acitveIndex.value === i 
            ? 'active' 
            : acitveIndex.value - 1 === i
            ? 'last-img'
            : acitveIndex.value + 1 === i
            ? 'next-img'
            : 'inactive';

    }
</script>

<style scoped>
    .carousel {
        height: 25rem;
        width: 100%;
    }

    .switch-btn {
        cursor: pointer;

        width: 2.4rem;
        height: 2.4rem;
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

    .active {
        z-index: 1;
    }

    .inactive {
        scale: .5;
    }

    .next-img {
        transform: translateX(50%);
        scale: .9;
    }

    .last-img {
        transform: translateX(-50%);
        scale: .9;
    }

    .title {
        transition: all .5s;
    }

    .img-container:not(.mask):hover .title {
        display: inline-block;
        bottom: 0;
    }

    .mask::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background-color: rgba(0, 0, 0, .4);
    }
</style>