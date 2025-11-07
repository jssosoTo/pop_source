export const translateOptions = {
    'zh-cn': {
        logoTitle: 'Pop Source',
        index: '首页',
        about: '关于'
    },
    'en': {
        logoTitle: 'Pop Source',
        index: 'Home',
        about: 'About'
    }
}

export default {
    install(app, options) {
        app.provide('translate', options)
    }
}