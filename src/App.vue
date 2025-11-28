<script setup lang="ts">
import { inject, provide } from 'vue';
import Header from './components/Header/index.vue';
import { useTranslateStore } from './stores/translate';
import Footer from './components/Footer.vue';
import FancyCursor from './components/FancyCursor.vue';

const translateStore = useTranslateStore();

const i18n: any = inject('translate');
const translation = i18n[translateStore.lang];

provide('app-translation', translation);
</script>

<template>
    <div class="page">
      <Header />
      <main>
        <RouterView />
      </main>
      <Footer />
      <FancyCursor />
    </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
