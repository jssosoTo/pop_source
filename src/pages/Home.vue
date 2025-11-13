<template>
    <section
        class="min-full-screen"
    >
        <div class="carousel-container">
            <Carousel :desc-list="descList" />
        </div>
    </section>
</template>

<script setup lang="ts">
    import Carousel, { type CarouselItem } from '../components/Carousel/index.vue'

    const descList: CarouselItem[] = [
        {
            title: '“冬蛾扑火，涅槃重生”',
            subTitle: '#李昊新歌冬蛾#  #李昊早安合作曲冬蛾#  #李昊早安桃子军团#  #李昊[超话]#李昊超话 ',
            img: 'https://gimg3.baidu.com/yule/src=http%3A%2F%2Fgips1.baidu.com%2Fit%2Fu%3D2149797794%2C160396331%26fm%3D3007%26app%3D3007%26f%3DJPEG%3Fw%3D480%26h%3D480&refer=http%3A%2F%2Fwww.baidu.com&app=2019&size=w931&n=0&g=0n&q=75&fmt=auto?sec=1763053200&t=52e57b476e472f7621f56932e4ff4471',
            url: 'https://i2.y.qq.com/n3/other/pages/playsong/index.html?hosteuin=owEA7iCkowosoc**&sharefrom=&from_id=77712169&from_idtype=10002&from_name=JUU1JTg2JUFDJUMyJUI3JUU4JTlCJUJF&songid=614882176&songmid=&type=0&platform=(10rpl)&appsongtype=(11rpl)&_wv=1&source=qq&appshare=iphone&media_mid=001wv0cs1VEgb0&ADTAG=ffshare'
        },
        {
            title: '【上海】李昊「LOST IN TIME」巡回演唱会2025上海站',
            subTitle: '点击跳转大麦抢票',
            img: 'https://img.alicdn.com/bao/uploaded/https://img.alicdn.com/imgextra/i2/2251059038/O1CN01NmxQXJ2GdSjugUYlT_!!2251059038.jpg_q60.jpg_.webp',
            url: 'https://detail.damai.cn/item.htm?spm=a2oeg.search_category.0.0.36a760149WomoC&id=986290953019&clicktitle=%E6%9D%8E%E6%98%8A%E3%80%8CLOST%20IN%20TIME%E3%80%8D%E5%B7%A1%E5%9B%9E%E6%BC%94%E5%94%B1%E4%BC%9A2025%E4%B8%8A%E6%B5%B7%E7%AB%99'
        },
        {
            title: '新歌速递📪第十五届全运会宣传曲《候鸟说》（容祖儿/李昊)',
            subTitle: '[点击跳转微博链接]一起收听🎵把一场关于相遇与奔赴的故事，藏进未唱完的旋律里',
            img: 'https://t7.baidu.com/it/u=1345516372,294620714&fm=217&app=126&size=re3,2&q=75&n=0&g=4n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=B6EAFD04F0EA10A72700A07803008010',
            url: 'https://weibo.com/u/1774840083'
        },
    ]
</script>

<style scoped>
    .carousel-container {
        padding: 2rem;
    }
</style>