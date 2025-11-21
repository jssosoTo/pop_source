<template>
    <section class=" w-62">
        <div class="header flex items-center">
            <button 
                @click="selectDate = selectDate.subtract(1, 'M')" 
                class="
                    w-6 
                    p-1 
                    rounded 
                    cursor-pointer 
                    transition 
                    shadow 
                    hover:bg-(--secondary-bg-color) 
                    border 
                    border-solid 
                    border-transparent 
                    hover:border-(--secondary-text-color)
                "
            >
                <ElIcon><ArrowLeftBold /></ElIcon>
            </button>
            <div class="flex-1 text-center">{{ selectDate.format('MMM YYYY') }}</div>
            <button 
                @click="selectDate = selectDate.add(1, 'M')" 
                class="
                    w-6 
                    p-1 
                    rounded 
                    cursor-pointer 
                    transition 
                    shadow 
                    hover:bg-(--secondary-bg-color) 
                    border 
                    border-solid 
                    border-transparent 
                    hover:border-(--secondary-text-color)
                "
            >
                <ElIcon><ArrowRightBold /></ElIcon>
            </button>
        </div>
        <div class="grid grid-cols-7 text-center text-(--sub-text-color)">
            <div v-for="day in days">{{ day }}</div>
            <div 
                v-for="date in daysOfMonth" 
                @click="selectDate = dayjs(date)" 
                :key="date"
                class="aspect-square flex items-center justify-center cursor-pointer transition-all duration-300"
                :class="{
                    active: date === selectDate.format('YYYY-MM-DD'),
                    today: now.format('YYYY-MM-DD') === date,
                    thisMonth: date.split('-')[1] === selectDate.format('MM')
                }"
            >
                {{ date.split('-').at(-1) }}
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { ElIcon } from 'element-plus';
import { computed, ref } from 'vue';

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const now = ref(dayjs());
const selectDate = ref(dayjs());
const daysOfMonth = computed<string[]>(() => {
    const lastDateOfLastMonth = dayjs(selectDate.value).subtract(1, 'M').endOf('month').date();
    const firstDayOfMonth = selectDate.value.startOf('month').day();
    const lastDateOfMonth = selectDate.value.endOf('month').date();

    return Array.from({ length: 42 }).map((_, i) => {
        const now = dayjs(selectDate.value.valueOf());
        console.log(now.format('YYYY-MM-DD'))
        if (firstDayOfMonth > i) return now.subtract(1, 'M').set('date', lastDateOfLastMonth - firstDayOfMonth + i + 1).format('YYYY-MM-DD');
        if (firstDayOfMonth <= i && (lastDateOfMonth + firstDayOfMonth) >= (i + 1)) return now.set('date', i - firstDayOfMonth + 1).format('YYYY-MM-DD');
        return now.add(1, 'M').set('date', i - firstDayOfMonth - lastDateOfMonth + 1).format('YYYY-MM-DD');
    })
})
</script>

<style scoped>
    .today {
        background-color: var(--secondary-hover-text-color);
        color: white;
        border-radius: 50%;
    }
    .thisMonth {
        color: var(--primary-text-color);
    }
    .active {
        background-color: var(--primary-hover-text-color);
        color: white;
        border-radius: 50%;
    }
</style>