<template>
    <div id="user_setting" class="new_page">
        <mt-header :title="title">
            <mt-button @click="handleBack" icon="back" slot="left">返回</mt-button>
        </mt-header>
        <div class="field">
            <div class="upload_wrapper clearfix">
                <span class="avatar_label" v-if="!user_avatar">人脸头像</span>
                <span class="mintui mintui-tupianshangchuanmian avatar_upload" @click="handleUpload"></span>
            </div>
            <!-- <mt-field label="人脸头像" placeholder="请选择头像" v-model="user_avatar"></mt-field> -->
            <mt-field label="身份证号" placeholder="请输入身份证号" type="number" v-model="identify"></mt-field>
            <mt-field label="姓名" placeholder="请输入姓名" type="text" v-model="name"></mt-field>
            <mt-field label="楼号" placeholder="请输入楼号" type="text" v-model="house_num"></mt-field>
            <mt-field label="单元号" placeholder="请输入单元号" type="number" v-model="unit_num"></mt-field>
            <mt-field label="门牌号" placeholder="请输入门牌号" type="number" v-model="gate_num"></mt-field>
            <!-- <van-picker :columns="columns" @change="onChange" /> -->
            <!-- <Select /> -->
        </div>
        <mt-button type="primary" size="large">提交审核</mt-button>
    </div>
</template>

<script>
import Vue from 'vue';
// import { Picker } from 'vant';
// Vue.use(Picker);
// import 'vant/lib/picker/style';
import {Field} from 'mint-ui';
Vue.component(Field.name, Field);
export default {
    components: {
        // Select,
    },
    data(){
        return {
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
        handleUpload(){
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                }
            });
        },
        onChange(){
            console.log('ok');
        }
    },
    created(){
        wx.config(this.$store.state.verification.jssdkConfig);
        wx.ready(function(){alert('wx ready')})
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