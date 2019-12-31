<template>
    <div id="remote_lock">
        <div class="selects_wrap">
            <mt-radio
                v-model="value"
                align="left"
                :options="options">
            </mt-radio>
        </div>
        <mt-button type="primary" size="large" @click="openLock">远程开锁</mt-button>
    </div>
</template>

<script>
import Vue from 'vue'
import {Radio, Button, Toast} from 'mint-ui'
Vue.component(Radio.name, Radio)
Vue.component(Button.name, Button) 
export default {
    data(){
        return {
            //  选中的门的字段值
            value: "东门",
            options: [
            ]
        }
    },
    methods: {
        openLock(){

        }
    },
    created(){
        this.$store.state.userInfo.community_locks.forEach((item, index)=>{
            let option = {};
            option.label = item.lock_name;
            option.value = item.lock_id;
            this.options.push(option);
        })
    }
}
</script>

<style lang="less" scoped>
#remote_lock{
    text-align: center;
    .selects_wrap{
        margin-top: 30vh;
        margin-bottom: 50px;
    }
    .mint-button--large{
        width: 40vw;
        margin-left: 30vw;
    }
    /deep/ .mint-radiolist-label{
        padding-left: 35vw;
        text-align: left;
    }
}
</style>