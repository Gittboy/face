<template>
    <div id="system" class="new_page">
            <mt-header :title="links[selected].title?links[selected].title:links[selected].text">
            <!-- <router-link to="/login" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link> -->
            </mt-header>

            <router-view name="tab"></router-view> 
        
        <ul id="navs_wrap">
            <li class="nav_item" v-for="(item, index) in links" :key="index" :data-index="index" @click.capture="changeTab($event)">
                <router-link :to="item.path" class="text_item">{{item.text}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import {Header} from 'mint-ui'
Vue.component(Header.name, Header)
import tempUnlock from '../components/tempUnlock'
import remoteUnlock from '../components/remoteUnlock'
import selfInfo from '../components/selfInfo'
export default {
    components: {
        tempUnlock,
        remoteUnlock,
        selfInfo,
    },
    data(){
        return {
            selected: 0,
            links: [
                {
                    text: '开锁码生成',
                    title: '临时开锁',
                    path: '/system/tempUnlock'
                },
                {
                    text: '远程开锁',
                    path: '/system/remoteUnlock'
                },
                {
                    text: '个人信息',
                    path: '/system/selfInfo'
                },

            ]
        }
    },
    methods: {
        changeTab(event){
            this.selected = event.currentTarget.dataset.index
        }
    },
    created(){
        // this.http.get("/v1/api/terminal/community/accepted?"+this.$store.getters.apiVerifi).then(res=>{
        this.http.get("http://facerke.epplink.net/v1/api/terminal/community/accepted?user_id=c952f21e13cbb61390a5a965604ab9ba&community_id=26").then(res=>{
            console.log(res.data, res.data.communities[0]);
            if(res.data.code!=1){
                Toast("获取信息失败, 请重试");
            }else {
                console.log(res, res.data, res.data.communities[0])
                this.$store.commit("getUserInfo", res.data.communities[0]);
                console.log(this.$store.state.userInfo);
            }
        }, err=> {console.log(err)})
    }
    
}
</script>

<style lang="less" scoped>
    #system{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        background-color: #fff;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        ul, li{
            list-style: none;
        }
        #navs_wrap{
            position: fixed;
            bottom: 0;
            display: flex;
            justify-content: space-around;
            width: 100%;
            padding-block-start: 0;
            padding: 0;
            background-color: #F3F3F3;
            margin-bottom: 0;
            .text_item{
                display: inline-block;
                font-size: 16px;
                padding: 0 5px;
                line-height: 50px;
                list-style: none;
                text-decoration: none;
                color: #2C3E50;
            }
            .router-link-exact-active{
                color: skyblue;
                border-bottom: 2px solid skyblue;
            }
            .text_item_active{
                color: skyblue;
                border-bottom: 2px solid skyblue;
            }
        }
    }
</style>