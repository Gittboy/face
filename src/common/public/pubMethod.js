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

/**
 * 
 * @param {需要在指定周期只能执行一次的函数} fn 
 * @param {事件间隔周期} wait 
 * 时间戳节流
 */
// function throttle(fn, wait) {
//     var pre = Date.now();
//     return function() {
//         var context = this;
//         var args = arguments;
//         var now = Date.now();
//         if (now - pre >= wait) {
//             fn.apply(context, args);
//             pre = Date.now();
//         }
//     }
// }

/**
 * 
 * @param {节流的函数} fn 
 * @param {等待的时间周期} wait 
 * 定时器节流 ????
 */
function throttle(fn, wait) {
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function() {
                fn.apply(context, args);
                timer = null;
            }, wait)
        }
    }
}

function getAjax() {
    var ajax;
    try {
        ajax = new XMLHttpRequest();
    } catch (e) {
        ajax = new ObjectXObject(Microsoft.XMLHTTP);
    }
    return ajax;
}

export { checkRes, debounce, throttle, getAjax }