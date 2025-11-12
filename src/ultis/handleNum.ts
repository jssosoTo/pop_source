export function getNextNum(cur: number, arr: Array<any>) {
    const lastIndex = arr.length - 1;
    return cur === lastIndex ? 0 : cur + 1;
} 

export function getLastNum(cur: number, arr: Array<any>) {
    const lastIndex = arr.length - 1;
    return cur === 0 ? lastIndex : cur - 1;
}