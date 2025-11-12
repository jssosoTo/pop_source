<template>
    <footer class="p-12 border-t border-(--box-shadow-color)">
        <h2 class="text-center font-bold italic uppercase">{{ translation.motto }}</h2>
        <h4 class="text-center">Copyright © 2025 - present P0PC0RN Su</h4>
    </footer>
</template>

<script setup lang="ts">
import { inject } from 'vue';

    const translation: any = inject('app-translation');
</script>