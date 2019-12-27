function checkRes(res, Toast, sucessMsg) {
    if (res.code != 1) {
        Toast(res.reason)
    } else {
        Toast(sucessMsg)
    }
}

/**
 * 
 * @param {需要在指定时间内只执行最后一次的函数} fn 
 * @param {设定的时间间隔} wait 
 * 内部维护一个timer
 */
function debounce(fn, wait) {
    var timer = null;
    return function() {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, wait);
    }
}

export { checkRes, debounce }