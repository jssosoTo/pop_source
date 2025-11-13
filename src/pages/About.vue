<template>
    <div>
        <section class="full-screen pt-12">
            <div class="mx-auto wave-animation-fast border-(--primary-hover-text-color) border-2 avatar-container animate__animated animate__fadeInDown">
                <img
                    class="header-avatar wave-animation"
                    src="./../assets/lihao.png"
                />
            </div>
            <div>
                <DescriptionItem class="mt-24" :title="translation.basicInfo" :content="basicInfo" />
            </div>
        </section>
        <section 
            class="
                text-(--primary-bg-color)
                bg-(--reverse-bg-color)
                py-20
            "    
        >
            <h2 class="text-center font-bold text-2xl tracking-widest">{{ translation.portal }}</h2>
            <div>
                <ul class="flex items-center justify-center gap-8 mt-8">
                    <li v-for="({ title, link, icon }) in links" :key="title">
                        <a 
                            :href="link" 
                            target="_blank"
                            class="
                                    relative
                                    after:content-['']
                                    after:absolute
                                    after:top-1/2
                                    after:left-1/2
                                    after:-translate-x-1/2
                                    after:-translate-y-1/2
                                    after:w-12
                                    after:h-12
                                    after:rounded-full
                                    after:bg-(--primary-text-color)
                            "
                        >
                            <component 
                                class="w-8 h-8 relative z-1 hover:scale-110 transition-all duration-300" 
                                :is="icon" 
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import DescriptionItem from './../components/DescriptionItem/index.vue';
import text from './../markdoc/basicInfo.txt';
import { inject, onMounted, ref } from 'vue';
// @ts-ignore: no declaration file for this .vue module
import RedBook from '../assets/RedBook.vue';
// @ts-ignore: no declaration file for this .vue module
import Weibo from '../assets/Weibo.vue';
// @ts-ignore: no declaration file for this .vue module
import Douyin from '../assets/Douyin.vue';

const translation: any = inject('app-translation');

const basicInfo = ref<string>('');
console.log(RedBook);
const links = ref<{ title: string; icon: SVGAElement; link: string }[]>([
    {
        title: '小红书',
        icon: RedBook,
        link: 'https://xhslink.com/m/9jF13c3aJE'
    },
    {
        title: '微博',
        icon: Weibo,
        link: 'https://weibo.com/u/1774840083'
    },
    {
        title: '抖音',
        icon: Douyin,
        link: 'https://www.douyin.com/user/MS4wLjABAAAAr2yX6joDlLB5Yt8xwXvSFr16sXKa3sktj5nrEsQCtePuM3kRhV235_CCfM_C9mM9'
    }
])

onMounted(() => {
    fetch(text)
        .then(response => response.text())
        .then(data => {
            console.log(data)
            basicInfo.value = data;
        })
})
</script>

<style scoped>
    @keyframes wave {
        0%,
        100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }
        50% {
            border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
        }
    }

    .wave-animation-fast {
        animation: wave 5s ease-in infinite;

        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        animation-delay: 1s;

        width: 15rem;
        height: 15rem;
        padding: .8rem;

        /* overflow-clip-margin: content-box;
        overflow: clip; */
    }

    .wave-animation {
        animation: wave 5s ease-out infinite;
        overflow-clip-margin: content-box;
        overflow: clip;
    }

    .header-avatar {
        object-fit: cover;
        object-position: 0%;
        width: 100%;
        height: 100%;

        overflow-clip-margin: content-box;
        overflow: clip;
    }
</style>