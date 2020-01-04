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
import { Radio, Button } from 'mint-ui'
Vue.component(Radio.name, Radio)
Vue.component(Button.name, Button)
import { Toast } from 'vant';
import 'vant/lib/toast/style'
Vue.use(Toast);
export default {
    data(){
        return {
            //  选中的门的字段值
            value: "",
            options: [
            ]
        }
    },
    computed: {
    },
    methods: {
        openLock(){
            Toast.loading({
                    message: '开锁中...',
                    forbidClick: true,
                    loadingType: 'spinner',
                    duration: 2500
            });
            this.http.post("/v1/api/terminal/openlock/direct?"+this.$store.getters.apiVerifi, {
                "community_locks": this.value
            }).then(res=> {
                if(res.data.code!=1){
                    Toast('开锁失败，请重试');
                }else {
                    Toast('开锁成功！');
                }
            }, err=> {
                Toast("网络忙，请重试");
            })
        }
    },
    created(){
        this.$store.state.userInfo.community_locks.forEach((item, index)=>{
            let option = {};
            option.label = item.lock_name;
            option.value = item.lock_id;
            this.options.push(option);
        });
    }
}
</script>

<style lang="less" scoped>
#remote_lock{
    text-align: center;
    .selects_wrap{
        margin-top: 30vh;
        margin-bottom: 50px;
            /deep/ .mint-cell:last-child{
                background: none;
            }
            /deep/ .mint-cell-wrapper{
                margin-top: -1px;
            }
    }
    .mint-button--large{
        width: 40vw;
        margin-left: 30vw;
    }
    /deep/ .mint-radiolist-label{
        padding-left: 32vw;
        text-align: left;
    }
}
</style>