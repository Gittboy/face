function testLength(target, minimum, maximun, Toast) {
    if (target.length > maximun) {
        Toast("不能超过" + maximun + "个字符！");
        return false;
    } else if (target.length < minimum) {
        Toast("不能少于" + maximun + "个字符！");
        return false;
    } else {
        return true;
    }
}