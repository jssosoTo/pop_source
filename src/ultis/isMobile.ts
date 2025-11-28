export default function isMobile() {
    const userAgent = navigator.userAgent;
    const mobileKeywords = ['Android', 'iPhone', 'iPad', 'iPod', 'Windows Phone'];
    return mobileKeywords.some(keyword => userAgent.includes(keyword));
}