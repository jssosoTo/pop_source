<template>
    <div
        ref="rootRef"
        class="absolute min-w-36 bg-(--primary-bg-color) rounded-xl py-2"
        style="top: 0; left: 0;"
        :style="[
            !isFollowRef ? { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
            : { transform: 'translate(15%, 5%)' }
        ]"
    >
        <div v-if="headerTitle" class="flex justify-between items-center px-4 pb-2 border-b border-(--secondary-text-color) mb-2">
            <div>{{ headerTitle }}</div>
            <div class="w-4 cursor-pointer" @click="emits('closeModal')">
                <ElIcon><Close /></ElIcon>
            </div>
        </div>
        <div v-if="content" class="max-h-92 overflow-y-scroll py-6 px-12">
            {{ content }}
        </div>
        <div v-else>
            <slot name="content"></slot>
        </div>
        <div v-if="!disableBtn" class="border-t border-(--secondary-text-color) pt-4 pb-2 px-4 flex items-center justify-end gap-4">
            <button class="pop-btn" @click="cancel">取消</button>
            <button class="pop-primary-btn" @click="confirm">确认</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Close } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';

    defineProps<{
        headerTitle?: string;
        isFollowRef?: boolean,
        content?: string
        disableBtn?: boolean
    }>()

    const emits = defineEmits<{
        (e: 'cancel'): void;
        (e: 'confirm'): void;
        (e: 'closeModal'): void;
    }>();

    const rootRef = ref<HTMLDivElement | null>(null);

    defineExpose({
        rootEl: rootRef,
    });

    const cancel = () => {
        emits('cancel');
        emits('closeModal');
    }

    const confirm = () => {
        emits('confirm');
        emits('closeModal');
    }
</script>

<style>
    .position_top {
        transform: translate(15%, -85%)!important;
    }
</style>