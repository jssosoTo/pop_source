export const translateOptions = {
    'zh-cn': {
        // 导航栏
        logoTitle: '李 昊',
        index: '首页',
        about: '关于',

        // 底部
        motto: '热爱一切，总会见一面的',

        // 关于页面
        portal: '传送门',
        basicInfo: '基础信息',

        // 日历组件
        schedule: '日程安排',
        weekList: ['日', '一', '二', '三', '四', '五', '六'],
    },
    'en': {
        // Navigator
        logoTitle: 'Kaho Lee',
        index: 'Home',
        about: 'About',

        // footer
        motto: 'to be or not to be',

        // about page
        portal: 'Portal',
        basicInfo: 'Basic Information',

        // Calendar Component
        schedule: 'Schedule',
        weekList: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    }
}

export default {
    install(app, options) {
        app.provide('translate', options)
    }
}