import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        // 初始化 从后台获取的全局验证信息
        verification: {},
        // 对象类型需遵循Vue的响应式规则
        userInfo: {},
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
        getUserInfo(state, userInfo) {
            state.userInfo = {...userInfo };
        }
    },
    actions: {},
    modules: {}
})