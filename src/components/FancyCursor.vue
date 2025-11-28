<template>
    <div v-if="enabled" class="floating-cursor-layer">
        <div
            class="cursor-circle"
            :style="{
                left: `${pointer.x}px`,
                top: `${pointer.y}px`,
                background: circleColor
            }"
        ></div>
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
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';

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
const circleColor = ref('rgba(0, 0, 0, 0.8)');
const shouldSampleColor = ref(true);

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
let isActive = false;
const cursorHiddenClass = 'custom-cursor-hidden';

const parseRGB = (value: string) => {
    const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return null;
    const [, r, g, b, a] = match;
    return {
        r: Number(r),
        g: Number(g),
        b: Number(b),
        a: a !== undefined ? Number(a) : 1,
    };
};

const blendColor = (base: { r: number; g: number; b: number }, inverted: { r: number; g: number; b: number }, ratio: number) => {
    return {
        r: Math.round(base.r * (1 - ratio) + inverted.r * ratio),
        g: Math.round(base.g * (1 - ratio) + inverted.g * ratio),
        b: Math.round(base.b * (1 - ratio) + inverted.b * ratio),
    };
};

const updateCircleColor = () => {
    if (!shouldSampleColor.value) return;
    const element = document.elementFromPoint(pointer.x, pointer.y) as HTMLElement | null;
    if (!element) return;
    const styles = window.getComputedStyle(element);
    const background = styles.backgroundColor || 'rgba(255, 255, 255, 1)';
    const parsed = parseRGB(background);
    if (!parsed) {
        circleColor.value = 'rgba(0, 0, 0, 0.8)';
        return;
    }

    const inverted = {
        r: 255 - parsed.r,
        g: 255 - parsed.g,
        b: 255 - parsed.b,
    };

    const blended = blendColor(parsed, inverted, 0.45);

    circleColor.value = `rgba(${blended.r}, ${blended.g}, ${blended.b}, 0.85)`;
};

const handleMouseMove = (event: MouseEvent) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    updateCircleColor();
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

const enableCursor = () => {
    if (isActive) return;
    isActive = true;
    shouldSampleColor.value = true;
    storedCursor = document.body.style.cursor;
    document.documentElement.classList.add(cursorHiddenClass);
    document.body.style.cursor = 'none';
    window.addEventListener('mousemove', handleMouseMove);
    updateCircleColor();
    animate();
};

const disableCursor = () => {
    if (!isActive) return;
    isActive = false;
    if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
    }
    window.removeEventListener('mousemove', handleMouseMove);
    document.documentElement.classList.remove(cursorHiddenClass);
    if (storedCursor !== null) {
        document.body.style.cursor = storedCursor;
    }
    circleColor.value = 'rgba(0, 0, 0, 0.8)';
};

onMounted(() => {
    if (enabled.value) {
        enableCursor();
    }
});

onBeforeUnmount(() => {
    disableCursor();
});

watch(
    enabled,
    (value) => {
        shouldSampleColor.value = value;
        if (value) {
            enableCursor();
        } else {
            disableCursor();
        }
    },
    { immediate: true }
);

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

.cursor-circle {
    position: fixed;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.9);
    background: rgba(0, 0, 0, 0.8);
    mix-blend-mode: difference;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: background 0.2s ease, border-color 0.2s ease;
}
</style>

