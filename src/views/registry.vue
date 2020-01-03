<template>
    <div id="registry" class="new_page">
        <mt-header title="">
            <router-link to="/index" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="search" slot="right"></mt-button>
        </mt-header>
        
        <div class="field_wrap">
            <div class="id_wrap">
                <label for="inp_id" class="regLabel">手机号：</label>
                <!-- 用户输入的手机号  phone 字段 -->
                <input type="text" id="inp_id" placeholder="请输入手机号" v-model="phone" class="myinput myInput">
            </div>
            <div class="pwd_wrap">
                <label for="inp_pwd" class="regLabel">验证码：</label>
                <!-- 用户获取后输入的验证码  captcha_code 字段 -->
                <input type="text" id="inp_pwd" placeholder="请输入验证码" v-model="captcha_code" class="myinput myInput">
                <!-- 获取验证码按钮，点击60s后重新获取验证码 getVerification 方法 -->
                <!-- <mt-button type="default" size="small" id="get_pwd" @click="getVerification">{{text}}</mt-button> -->
                <button id="get_pwd" @click="getVerification">{{text}}</button>
            </div>
            <!-- 提交手机号和验证码验证登录信息 submit 方法 -->
            <mt-button type="primary" class="mybtn" @click="submit">提交并完善信息</mt-button>
        </div>
        <router-view name="uploadInfo"></router-view>
    </div>
</template>

<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'
import {Toast, Button, Header} from 'mint-ui'
Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
import myInput from '../components/myInput'
export default {
    components: {
        myInput,
    },
    data(){
        return {
            timer: null,
            counter: 59,
            text: '获取验证码',
            phone: '',
            captcha_code: '',
        }
    },
    methods: {
        getVerification(){
            let _this = this;
            if(this.phone){
                if(this.timer){
                    return ;
                } else {
                    this.http.get("/v1/api/sendsms?phone="+this.phone).then(res=>{
                        if(res.data.code!=1){
                            Toast(res.reason);
                        }else {
                            Toast("获取验证码成功");
                        }
                    });
                    this.timer = setInterval(function(){
                        _this.text = _this.counter + "秒后刷新";
                        _this.counter--;
                        if(_this.counter==0){
                            clearInterval(_this.timer);
                            _this.timer = null;
                            _this.counter=59;
                            _this.text = '获取验证码';
                        }
                    }, 1000)
                }
            }else {
                Toast("请输入手机号");
            }
            
        },
        submit(){
            if(this.phone && this.captcha_code){
                this.http.post(`/v1/api/terminal/community/signin?${this.apiVerifi}`, 
                {
                    "phone": this.phone,
                    "captcha_code": this.captcha_code
                }).then(res=>{
                    if(res.data.code!=1){
                        Toast(res.data.reason)
                    }else{
                        this.$router.push({
                            path: '/index/registry/uploadInfo',
                            query: {
                                from: 'uploadInfo',
                                phone: this.phone
                            }
                        })
                    }
                })
            }else{
                Toast("请输入完整信息");
            }
            
        }
    },
    computed: {
        ...mapGetters(['apiVerifi'])
    }
}
</script>

<style lang="less" scope>
    #registry{
        // position: fixed;
        // top: 0;
        // left: 0;
        // width: 100%;
        // min-height: 100%;
        // background-color: #fff;
        .mint-header{
            // display: block;
            width: 100%;
            padding: 0 5%;
        }
        .field_wrap{
            margin-top: 20vh;
            padding: 0 10vw;
            .regLabel{
                line-height: 20px;
            }
            .id_wrap{
                display: flex;
                align-items: center;
            }
            .pwd_wrap{
                padding-top: 15px;
                display: flex;
                align-items: center;
                #get_pwd{
                    height: 24px;
                    margin-left: 5px;
                    min-width: 70px;
                    box-sizing: content-box;
                    text-align: center;
                    line-height: 24px;
                    color: #fff;
                    background-color: #07C160;
                    border: none;
                    outline: none;
                    border-radius: 4px;
                }
                .mint-button-text{
                    font-size: 16px;
                }
            }
        }
        .myinput{
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            padding: 4px 2px;
            flex: 1 1;
            flex-shrink: 1;
            min-width: 0;
            text-indent: 5px;
            vertical-align: middle;
        }
        .myinput::placeholder{
            font-size: 14px;
        }
        .mybtn{
            width: 100%;
            margin-top: 10vh;
        }
    }
    
</style>