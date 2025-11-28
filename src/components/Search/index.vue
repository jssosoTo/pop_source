<template>
    <div
        class="rounded-xl shadow-xl border px-6 h-full overflow-hidden flex flex-col"
    >
        <div class="flex items-center border border-(--sub-text-color) rounded mt-4 px-2 py-1 focus-within:border-(--primary-hover-text-color)">
            <button class="w-4 mr-1">
                <ElIcon><Search /></ElIcon>
            </button>
            <input v-model="filterText" class="outline-none flex-1" placeholder="e.g.g egg" />
        </div>
        <div class="flex-1 py-4 overflow-y-scroll flex flex-col gap-2" v-if="filterData.length">
            <TransitionGroup>
                <InfoItem 
                    v-for="({title, detail, url}) in filterData" 
                    :key="url+'infoItem'" 
                    :title
                    :detail
                    :url
                    :keyword="filterText"
                />
            </TransitionGroup>
        </div>
        <div v-else class="text-center m-auto">
            空空如也，请试试别的关键词吧！！(❁´◡`❁)
        </div>
    </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import InfoItem, { type InfoItemType } from '../InfoItem/index.vue';
import { computed, ref } from 'vue';

const filterText = ref<string>('');

const mockData: InfoItemType[] = [
    {
        title: '热烈欢迎',
        detail: '点击右方箭头，直通开发者线上仓库(ps：是需要翻墙的)！！！欢迎你的光临！！',
        url: 'https://github.com/jssosoTo'
    },
    {
        title: '欢迎来到本站！！！',
        detail: '这是来自开发者的问候',
        url: '/'
    },
    {
        title: '关注官媒',
        detail: '李昊百家号 个人账号地址指引',
        url: 'https://author.baidu.com/home/17009'
    },
    {
        title: '关注微博',
        detail: '李昊微博官方账号 @种地吧李昊，点击右方箭头快速指引',
        url: 'https://www.weibo.com/p/1005051774840083/home?from=page_100505&mod=TAB'
    },
    {
        title: '直播回放',
        detail: '2025-11-25场，微博李昊直播回放',
        url: 'https://www.weibo.com/1774840083/QfohYvgDI#comment'
    },
    {
        title: '微博发言',
        detail: '十个勤天[三周年] 李昊转发回复: 灵魂同频就够，就这样一直走 #十个勤天种地三周年#',
        url: 'https://www.weibo.com/1774840083/Qeye5iCkl#comment'
    },
    {
        title: '演唱会 售罄！！!',
        detail: '【Lost In Time】厦门场已经在[大麦]售罄，锁定大麦等候二开！点击右方箭头跳转相关页面',
        url: 'https://m.damai.cn/shows/item.html?itemId=988725559361'
    },
    {
        title: '演唱会 厦门场开售！',
        detail: '【Lost In Time】厦门场已经在[大麦]开售，点击右方箭头跳转相关页面',
        url: 'https://m.damai.cn/shows/item.html?itemId=988725559361'
    },
    {
        title: '李昊 -新歌发布',
        detail: '冬蛾 [冬蛾扑火，涅槃重生] 现已上线QQ音乐，点击右方箭头快速锁定！',
        url: 'https://y.qq.com/n/ryqq/songDetail/614882176?ADTAG=h5_play_song&songtype=0&redirecttag=mn.redirect.custom&mnst=0.88'
    },
    {
        title: '李昊 -演唱会',
        detail: '【Lost In Time】上海场已经在[大麦]开售，点击右方箭头跳转相关页面',
        url: 'https://detail.damai.cn/item.htm?spm=a2oeg.search_category.0.0.36a760149WomoC&id=986290953019&clicktitle=%E6%9D%8E%E6%98%8A%E3%80%8CLOST%20IN%20TIME%E3%80%8D%E5%B7%A1%E5%9B%9E%E6%BC%94%E5%94%B1%E4%BC%9A2025%E4%B8%8A%E6%B5%B7%E7%AB%99'
    },
];

const filterData = computed(() => mockData.filter(({title, detail}) => title.includes(filterText.value) || detail.includes(filterText.value)))
</script>