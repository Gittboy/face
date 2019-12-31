<template>
    <div id="self_center">
        <div id="content_wrapper">
            <img :src="avatar" alt="个人头像" class="user_avatar">
            <div class="info_wrapper">
                <p v-for="(item, index) in info" :key="index">{{item.key+" "+':'+" "+item.value}}</p>
            </div>
            <!-- <router-link to="/system/setting" class="jump_setting">修改信息</router-link> -->
            <mt-button type="primary" id="setting" size='normal' @click.native="jumpToSeeting">修改信息</mt-button>
        </div>
        <router-view name="setting"></router-view>
    </div>
</template>

<script>
import Vue from 'vue'
import {Button} from 'mint-ui'
Vue.component(Button.name, Button)
export default {
    data(){
        return {
            avatar: "",
            info: [
                {
                    key: "身份证",
                    value: ""
                },
                {
                    key: "姓名",
                    value: ""
                },
                {
                    key: "地址",
                    value: ""
                }
            ],
        }
    },
    methods: {
        jumpToSeeting(){
            this.$router.push('/system/setting?type=modify')
        }
    },
    created(){
        setTimeout(()=>{
            this.info[0].value = this.$store.state.userInfo.community_info.id_number;
            this.info[1].value = this.$store.state.userInfo.community_info.username;
            this.info[2].value = this.$store.state.userInfo.community_info.community_address;
            console.log(this.info);
            this.avatar = this.$store.state.userInfo.community_info.face_image_url;
        }, 1000);
    }
}
</script>

<style lang="less" scoped>
#self_center{
    // display: flex;
    // justify-content: center;
    padding: 20px 15vw 0 15vw;
    #content_wrapper{
        flex: 1 1 70vw;
        min-height: 50vh;
        .user_avatar{
            max-width: 100%;
        }
        .info_wrapper{
            padding-top: 40px;
        }
        p{
            text-align: left;
        }
        .jump_setting{
            float: right;
            margin-top: 40px;
        }
        #setting{
            margin-top: 40px;
            float: right;
        }
    }
}

</style>