<template>
    <div class="root">
        <div class="login_wrap">
            <myInput :holder="tip" @delivery="receive"/>
            <!-- <mt-field placeholder="请输入开锁码" id="field_id" v-model="tempid"></mt-field> -->
            <mt-button type="primary" class="mybtn" @click="deopen">临时开锁</mt-button>
            <nav class="navs">
                <!-- <router-link to="index/system" class="left">进入系统</router-link> -->
                <router-link to="index/registry" class="right">用户注册</router-link>
            </nav>
            <router-view name="registry"></router-view>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {Toast, Button} from 'mint-ui'
Vue.component(Button.name, Button)
import myInput from '../components/myInput.vue'
import http from 'axios'
export default {
    components: {
        myInput,
    },
    data(){
        return {
            tip: "请输入开锁码",
            tempid: ""
        }
    },
    methods: {
        receive(value){
            this.tempid = value;
            console.log(this.tempid);
        },
        tempopen(){
            alert('ok');
            this.http.post(`/v1/api/terminal/openlock/code?${this.$store.getters.apiVerifi}`,
            {"auth_code":this.tempid}).then(res=>{
                if(res.data.code!=1){
                    Toast('开锁码错误或已失效，请重试');
                }else{
                    Toast('开锁成功');
                }
                // switch (res.data.code) {
                //     case 1: {
                //         Toast('开锁成功！');
                //         break;
                //     }
                //     case 0: {
                //         Toast('开锁失败, 请重试');
                //         break;
                //     }
                //     case -1: {
                //         Toast('回话已过期，请重新扫描');
                //         break;
                //     }
                //     case -2: {
                //         Toast('开锁码已失效，请重新获取开锁码');
                //         break;
                //     }
                // }
            }, err=>{
                Toast({
                    message: '服务器忙, 请重试'
                    // icon font 的class名
                    // icon图表类  icon- 具体的图标类型
                    // iconClass: 'icon icon-success'  
                })
            })
        }
        
    },
    computed: {
        deopen(){
            return this.debounce(this.tempopen, 300);
        }
    },
    // created(){
    //     this.http.get('http://facerke.epplink.net/officalcount/getToken').then(res=>{
    //         console.log(res, res.data);
    //         //  保存验证信息
    //         this.$store.commit('saveVerification', res.data);
    //         if(res.data.isSignIn == 'true'){
    //             if (res.data.status != 'true') {
    //                 this.$router.replace("/submit");
    //             }else {
    //                 this.$router.replace('/system');
    //             }
    //         }else {

    //         }
    //     });
    // },
    created(){
        let _this = this;
        let ajax = this.getAjax();
        ajax.open('get', 'http://facerke.epplink.net/officalcount/getToken', false);
        ajax.onreadstatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200) {
                // 可以通过通过ajax.responseText和ajax.responseXML来获取返回的数据
                var info = JSON.parse(ajax.responseText);
                console.log(ajax.responseText, info);
                _this.$store.commit('saveVerification', info);
                if(info.isSignIn == 'true'){
                    if (info.status != 'true') {
                        _this.$router.replace("/submit");
                    }else {
                        _this.$router.replace('/system');
                    }
                }
            }else {
                console.log(ajax.readyState, ajax.status);
            }
        }
    },
    // beforeRouteEnter (to, from, next) {
    //     next(vm=> {
    //         vm.http.get('http://facerke.epplink.net/officalcount/getToken').then(res=>{
    //             console.log(res, res.data);
    //             //  保存验证信息
    //             vm.$store.commit('saveVerification', res.data);
    //             if(res.data.isSignIn == 'true'){
    //                 if (res.data.status != 'true') {
    //                     vm.$router,replace("/submit");
    //                 }else {
    //                     vm.$router.replace('/system');
    //                 }
    //             }
    //         });
    //     })
    // }
}
</script>

<style lang="less" scoped>
    .root{
        display: flex;
        justify-content: center;
    }
    .login_wrap{
        flex: 0 1 80%;
        text-align: center;
        margin-top: 33vh;
        #field_id{
            display: block;
            border: 1px solid skyblue;
        }
        .mybtn{
            margin-top: 20px;
            width: 100%;
        }
        .navs{
            margin-top: 50px;
            width: 80%;
            display: inline-block;
            .left{
                float: left;
            }
            .right{
                float: right;
            }
        }
    }
</style>