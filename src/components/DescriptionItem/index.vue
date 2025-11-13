<template>
    <div class="text-center">
        <div class="inline-block">
            <div class="header-title text-left uppercase">{{ title }}</div>
            <p class="text-left show-link-color" v-html="marked.parse(content)"></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { marked } from 'marked';
    defineProps<{
        title: string;
        content: string;
    }>()
</script>

<style scoped>
    .header-title {
        border-left: .24rem solid var(--primary-hover-text-color);
        padding-left: 1rem;
        font-size: 1.6rem;
        line-height: 1;
        margin-bottom: 1.2rem;
    }
</style>