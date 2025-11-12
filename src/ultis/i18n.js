export const translateOptions = {
    'zh-cn': {
        // 导航栏
        logoTitle: '李 昊',
        index: '首页',
        about: '关于',

        // 底部
        motto: '热爱一切，总会见一面的'
    },
    'en': {
        // Navigator
        logoTitle: 'Kaho Lee',
        index: 'Home',
        about: 'About',

        // footer
        motto: 'to be or not to be'
    }
}

export default {
    install(app, options) {
        app.provide('translate', options)
    }
}