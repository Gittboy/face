function checkRes(res, Toast, sucessMsg) {
    if (res.code != 1) {
        Toast(res.reason)
    } else {
        Toast(sucessMsg)
    }
}

export { checkRes }