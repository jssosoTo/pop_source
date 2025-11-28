<template>
    <section class=" w-62">
        <div class="header flex items-center">
            <button 
                @click="showDate = showDate.subtract(1, 'M')" 
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
            <div class="flex-1 text-center">{{ showDate.format(translateStore.lang === 'en' ? 'MMM YYYY' : 'YYYY年 MM月') }}</div>
            <button 
                @click="showDate = showDate.add(1, 'M')" 
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
                :ref="(el) => {
                    if (!el) return;
                    dateRefs[date] = el as HTMLDivElement;
                }"
                v-for="date in daysOfMonth" 
                @click="handleCheckDate(date)" 
                :key="date"
                class="aspect-square flex items-center justify-center cursor-pointer transition-all duration-300"
                :class="{
                    active: date === selectDate.format('YYYY-MM-DD'),
                    today: now.format('YYYY-MM-DD') === date,
                    thisMonth: date.split('-')[1] === showDate.format('MM')
                }"
            >
                {{ date.split('-').at(-1) }}
            </div>
        </div>
        <Teleport to="#app">
            <Mask v-if="isModalShow" @click="closeModal" class="bg-transparent">
                <template #modal>
                    <Modal
                        ref="modalRef"
                        :header-title="translation.schedule" 
                        disable-btn
                        is-follow-ref
                        @click.stop
                        @close-modal="closeModal"
                        @cancel="modalCancel"
                        @confirm="confirmModal"
                        class="w-64"
                    >
                        <template #content>
                            <ul v-if="false">
                                <li></li>
                            </ul>
                            <div v-else class="px-4">暂未获取到活动。¯\(°_o)/¯ssssss</div>
                        </template>
                    </Modal>
                </template>
            </Mask>
        </Teleport>
    </section>
</template>

<script setup lang="ts">
import Mask from '../Mask/index.vue'
import Modal from '../Modal/index.vue'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';
import dayjs, { Dayjs } from 'dayjs';
import { ElIcon } from 'element-plus';
import { computed, inject, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { useTranslateStore } from '../../stores/translate';

const translateStore = useTranslateStore();
const translation: any = inject('app-translation');

const days = translation.weekList;
const now = ref<Dayjs>(dayjs());
const showDate = ref<Dayjs>(dayjs());
const selectDate = ref<Dayjs>(dayjs());
const daysOfMonth = computed<string[]>(() => {
    const lastDateOfLastMonth = dayjs(showDate.value).subtract(1, 'M').endOf('month').date();
    const firstDayOfMonth = showDate.value.startOf('month').day();
    const lastDateOfMonth = showDate.value.endOf('month').date();

    return Array.from({ length: 42 }).map((_, i) => {
        const now = dayjs(showDate.value.valueOf());
        console.log(now.format('YYYY-MM-DD'))
        if (firstDayOfMonth > i) return now.subtract(1, 'M').set('date', lastDateOfLastMonth - firstDayOfMonth + i + 1).format('YYYY-MM-DD');
        if (firstDayOfMonth <= i && (lastDateOfMonth + firstDayOfMonth) >= (i + 1)) return now.set('date', i - firstDayOfMonth + 1).format('YYYY-MM-DD');
        return now.add(1, 'M').set('date', i - firstDayOfMonth - lastDateOfMonth + 1).format('YYYY-MM-DD');
    })
})

const isModalShow = ref<boolean>(false);
const dateRefs = ref<Record<string, HTMLDivElement>>({});
const modalRef = ref(null);
const toggleBodyScroll = (locked: boolean) => {
    document.body.style.overflow = locked ? 'hidden' : '';
};

watch(isModalShow, (visible) => {
    toggleBodyScroll(visible);
});

onBeforeUnmount(() => {
    toggleBodyScroll(false);
});

const closeModal = () => isModalShow.value = false;
const openModal = () => isModalShow.value = true;

const modalCancel = () => {
    closeModal();
}

const confirmModal = () => {
    closeModal();
}

const setElPosition = () => {
    const dateEl = dateRefs.value[selectDate.value.format('YYYY-MM-DD')];
    (modalRef.value as any).rootEl.style.top = dateEl?.offsetTop + 'px';
    (modalRef.value as any).rootEl.style.left = dateEl?.offsetLeft + 'px';

    if (document.documentElement.clientHeight * .9 < (dateEl?.offsetTop! + dateEl?.offsetHeight!)) (modalRef.value as any).rootEl.classList.add('position_top')
    else (modalRef.value as any).rootEl.classList.remove('position_top')
}

const handleCheckDate = async (date: string) => {
    selectDate.value = dayjs(date);
    showDate.value = dayjs(date);
    openModal()
    await nextTick();

    setElPosition();
}

watch(
    selectDate,
    () => {
        if (!isModalShow.value) return;
        setElPosition();
    },
    { flush: 'post' }
)
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