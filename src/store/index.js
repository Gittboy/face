import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 初始化 从后台获取的全局验证信息
        verification: {},
        // 对象类型需遵循Vue的响应式规则
        userInfo: {}
    },
    getters: {
        // url("/v1/api/terminal/openlock/code")}?user_id={$userId}&community_id={$communityId}&timestamp={$timeStamp}&token={$token}&identity={$identity}
        apiVerifi: state => `user_id=${state.verification.userId}&community_id=${state.verification.communityId}
        &timestamp=${state.verification.timeStamp}&token=${state.verification.token}&identity=${state.verification.identity}`,
    },
    mutations: {
        saveVerification(state, verification) {
            state.verification = {...verification }
        },
        getJssdkConfig(state, config) {
            state.jssdkConfig = {...config }
        },
        getUserInfo(state, userInfo) {
            state.userInfo = {...userInfo };
        },
        updateAvatar(state, avatar) {
            state.userInfo.community_info.face_image_url = avatar;
        }
    },
    actions: {},
    modules: {}
})