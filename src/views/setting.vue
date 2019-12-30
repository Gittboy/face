<template>
    <div id="user_setting" class="new_page">
        <mt-header :title="title">
            <mt-button @click="handleBack" icon="back" slot="left">返回</mt-button>
        </mt-header>
        <div class="field">
            <div class="upload_wrapper clearfix" v-if="!selected">
                <span class="avatar_label" v-if="!user_avatar">人脸头像</span>
                <span class="mintui mintui-tupianshangchuanmian avatar_upload" @click="chooseAvatar"></span>
            </div>
            <div id="avatarShow" ref="avatar"></div>
            <!-- <mt-field label="人脸头像" placeholder="请选择头像" v-model="user_avatar"></mt-field> -->
            <mt-field label="身份证号" placeholder="请输入身份证号" type="number" v-model="identify"></mt-field>
            <mt-field label="姓名" placeholder="请输入姓名" type="text" v-model="name"></mt-field>
            <!-- <mt-field label="楼号" placeholder="请输入楼号" type="text" v-model="house_num"></mt-field>
            <mt-field label="单元号" placeholder="请输入单元号" type="number" v-model="unit_num"></mt-field>
            <mt-field label="门牌号" placeholder="请输入门牌号" type="number" v-model="gate_num"></mt-field> -->
            <div class="selectWrapper">
                <span class="">选择住址</span>

            </div>
            <!-- <van-picker :columns="columns" @change="onChange" /> -->
            <!-- <van-area :area-list="areaList" :columns-num="3" title="选择住址" /> -->
        </div>
        <mt-button type="primary" size="large">提交审核</mt-button>
    </div>
</template>

<script>
import Vue from 'vue';
// import {Area} from 'vant'
// Vue.use(Area)
import {Field} from 'mint-ui';
Vue.component(Field.name, Field);
import { Area, Popup } from 'vant';
import 'vant/lib/area/style';
Vue.use(Area);
import areas from './areas'
export default {
    data(){
        return {
            selected: false,
            from: '',
            title: "个人信息修改",
            user_avatar: "",
            identify: "",
            name: "",
            house_num: "",
            unit_num: "",
            gate_num: "",
            // citys: {
            //     '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
            //     '福建': ['福州', '厦门', '莆田', '三明', '泉州']
            // },
            // areaList: areas,
            // areaList: {
            //     province_list: {
            //         100000: 'a',
            //         200000: 'b',
            //         300000: 'c',
            //     },
            //     city_list: {
            //         101000: 'aa',
            //         102000: 'ab',
            //         103000: 'ac'
            //     },
            //     country_list: {

            //     }
            // }
        }
    },
    computed: {
        columns() {
            // return [
            //     {
            //         values: Object.keys(this.citys),
            //         className: 'column1'
            //     },
            //     {
            //         values: this.citys['浙江'],
            //         className: 'column2',
            //         defaultIndex: 2
            //     }
            // ]
        }
    },
    methods: {
        handleBack(){
            this.$router.go(-1);
        },
        chooseAvatar(){
            this.selected = true;
            //  Vue项目中图片地址必须使用 require(url) 否则不会显示
            this.$refs.avatar.style.backgroundImage = 'url('+require('../assets/avatar.jpg')+')';
            this.$refs.avatar.style.display = 'inline-block';
            // wx.chooseImage({
            //     count: 1, // 默认9
            //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            //     success: function (res) {
            //     var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            //     }
            // });
        }
    },
    created(){
        //  配置微信sdk
        // wx.config(this.$store.state.verification.jssdkConfig);
        // wx.ready(function(){alert('wx ready')});
        this.from = this.$router.params.type;
        console.log(this.from);
    }
}
</script>

<style lang="less" scoped>
#user_setting{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    background-color: #fff;
    z-index: 100;
    .field{
        text-align: center;
        padding-top: 15vh;
        #avatarShow{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            // background-color: #09CA51;
            // display: inline-block;
            background: center/cover;
            // background-image: url(../assets/avatar.jpg);
            display: none;
        }
        .upload_wrapper{
            vertical-align: middle;
            .avatar_label{
                float: left;
                width: 105px;
                margin-left: 10px;
                line-height: 50px;
            }
            .avatar_upload{
                font-size: 50px;
                color: #09CA51;
                float: left;
            }
        }
        /deep/ .mint-cell-wrapper{
            padding-right: 10vw;
        }
    }
    .mint-button--large{
        width: 70vw;
        margin-left: 15vw;
        margin-top: 15vh;
    }
}
</style>