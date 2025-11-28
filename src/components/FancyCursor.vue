<template>
    <div v-if="enabled" class="floating-cursor-layer">
        <span
            v-for="stripe in stripes"
            :key="stripe.id"
            class="floating-cursor-stripe"
            :style="{
                transform: `translate3d(${stripe.x}px, ${stripe.y}px, 0) rotate(${stripe.angle}rad)`,
                background: stripe.color,
                width: `${stripe.length}px`,
                opacity: stripe.opacity
            }"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';

type Stripe = {
    id: number;
    x: number;
    y: number;
    angle: number;
    length: number;
    color: string;
    opacity: number;
};

const colors = ['linear-gradient(90deg,#ff5f6d,#ffc371)', 'linear-gradient(90deg,#36d1dc,#5b86e5)', 'linear-gradient(90deg,#a1ffce,#faffd1)', 'linear-gradient(90deg,#c471f5,#fa71cd)', 'linear-gradient(90deg,#f6d365,#fda085)'];
const stripeCount = 7;

const pointer = reactive({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
});

const stripes = ref<Stripe[]>(
    Array.from({ length: stripeCount }).map((_, idx) => ({
        id: idx,
        x: pointer.x,
        y: pointer.y,
        angle: 0,
        length: 60 - idx * 5,
        color: colors[idx % colors.length],
        opacity: 0.6 - idx * 0.06,
    }))
);

const enabled = computed(() => !window.matchMedia('(pointer: coarse)').matches);

let frameId: number | null = null;
let storedCursor: string | null = null;

const handleMouseMove = (event: MouseEvent) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
};

const animate = () => {
    stripes.value = stripes.value.map((stripe, index, arr) => {
        const target = index === 0 ? pointer : arr[index - 1];
        const dx = target.x - stripe.x;
        const dy = target.y - stripe.y;
        const easing = 0.25 - index * 0.02;
        const nextX = stripe.x + dx * (easing > 0 ? easing : 0.05);
        const nextY = stripe.y + dy * (easing > 0 ? easing : 0.05);

        return {
            ...stripe,
            x: nextX,
            y: nextY,
            angle: Math.atan2(dy, dx),
        };
    });

    frameId = requestAnimationFrame(animate);
};

onMounted(() => {
    if (!enabled.value) return;
    window.addEventListener('mousemove', handleMouseMove);
    animate();
});

onBeforeUnmount(() => {
    if (frameId) cancelAnimationFrame(frameId);
    window.removeEventListener('mousemove', handleMouseMove);
    if (storedCursor !== null) {
        document.body.style.cursor = storedCursor;
    }
});

</script>

<style scoped>
.floating-cursor-layer {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    mix-blend-mode: normal;
}

.floating-cursor-stripe {
    position: absolute;
    height: 4px;
    border-radius: 999px;
    transition: opacity 0.2s ease;
}
</style>

