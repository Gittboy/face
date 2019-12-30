<template>
    <div class="root">
        <!-- <van-row>
            <van-col span="16" offset="4">
                <div class="login_wrap">
                    <van-cell-group>
                        <van-field v-model="tempid"></van-field>
                    </van-cell-group>
                </div>
            </van-col>
        </van-row> -->
        <!-- <div class="login_wrap">
            <mt-field label="请输入开锁码"></mt-field>
            <van-button type="primary" class="mybtn">临时开锁</van-button>
            <nav>
                <router-link></router-link>
            </nav>
        </div> -->
        <div class="login_wrap">
            <myInput :holder="tip"/>
            <!-- <mt-field placeholder="请输入开锁码" id="field_id" v-model="tempid"></mt-field> -->
            <mt-button type="primary" class="mybtn" @click="tempopen">临时开锁</mt-button>
            <nav class="navs">
                <!-- <router-link to="login/system" class="left">进入系统</router-link> -->
                <router-link to="index/registry" class="right">用户注册</router-link>
            </nav>
            <router-view name="registry"></router-view>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import myInput from '../components/myInput.vue'
export default {
    components: {
        myInput,
    },
    data(){
        return {
            tip: "请输入开锁码",
            tempid: "",
            links: [
            ]
        }
    },
    methods: {
        tempopen(){
            this.http.post(`/v1/api/terminal/openlock/code?${this.$store.getters.apiVerifi}`,
            {"auth_code":this.tempid}).then(res=>{
                if(res.data.code!=1){
                    Toast(res.data.reason)
                }else{
                    Toast('开锁成功')
                }
            }, err=>{
                Toast({
                    message: err
                    // icon font 的class名
                    // icon图表类  icon- 具体的图标类型
                    // iconClass: 'icon icon-success'  
                })
            })
        }
        
    },
    created(){
        console.log('主页加载ok');
        this.http.get(officalcount/getToken).then(res=>{
            this.$store.commit('saveVerification', res.data);
            if(res.data.isRegistered){
                this.$router.replace('/system');
            }
        })
    }
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