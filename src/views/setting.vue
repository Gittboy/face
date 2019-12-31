<template>
    <div id="user_setting" class="new_page">
        <mt-header :title="title">
            <mt-button @click="handleBack" icon="back" slot="left">返回</mt-button>
        </mt-header>
        <div class="field">
            <div class="upload_wrapper clearfix">
                <div ref='avatarSelect'>
                    <span class="avatar_label">人脸头像</span>
                    <span class="mintui mintui-tupianshangchuanmian avatar_upload" @click="chooseAvatar"></span>
                </div>
                <div id="avatarShow" ref="avatar"></div>
            </div>
            <!-- <mt-field label="人脸头像" placeholder="请选择头像" v-model="user_avatar"></mt-field> -->
            <mt-field label="身份证号" placeholder="请输入身份证号" type="number" v-model="identify"></mt-field>
            <mt-field label="姓名" placeholder="请输入姓名" type="text" v-model="name"></mt-field>
            <mt-field label="手机号" placeholder="请输入手机号" type="number" v-model="phone_num" v-if="showPhone"></mt-field>
            <!-- <mt-field label="楼号" placeholder="请输入楼号" type="text" v-model="house_num"></mt-field>
            <mt-field label="单元号" placeholder="请输入单元号" type="number" v-model="unit_num"></mt-field>
            <mt-field label="门牌号" placeholder="请输入门牌号" type="number" v-model="gate_num"></mt-field> -->
            <div class="selectWrapper">
                <span id="selectLabel">住址</span>
                <span v-if="address" id="address">{{address}}</span>
                <mt-button id="selectBtn" type="primary" @click.native="handleSelect">{{selectBtn}}</mt-button>
            </div>
            <!-- <van-picker :columns="columns" @change="onChange" /> -->
            <!-- <van-area :area-list="areaList" :columns-num="3" title="选择住址" /> -->
            <van-popup v-model="show" round position="bottom" :style="{ height: '40%' }">
                <van-area :area-list="areaList" :columns-num="3" title="选择住址" @cancel="show=false;" @confirm="confirm" />
            </van-popup>
        </div>
        <mt-button type="primary" size="large" @click.native="submit">提交审核</mt-button>
    </div>
</template>

<script>
import Vue from 'vue';
import {Field, Button} from 'mint-ui';
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
import { Area, Popup } from 'vant';
import 'vant/lib/area/style';
import 'vant/lib/popup/style';
Vue.use(Area).use(Popup);
import areas from './areas';
export default {
    data(){
        return {
            selected: false,
            from: '',
            title: "个人信息修改",
            user_avatar: "",
            identify: "",
            name: "",
            building: "",
            unit: "",
            hotUpdate: "",
            phone_num: "",
            showPhone: true,
            address: "",
            selectBtn: '选择住址',
            show: false,
            // citys: {
            //     '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
            //     '福建': ['福州', '厦门', '莆田', '三明', '泉州']
            // },
            areaList: areas,
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
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    wx.getLocalImgData({
                        localId: res.localIds[0], // 图片的localID
                        success: function (res) {
                            this.user_avatar = res.localData; // localData是图片的base64数据，可以用img标签显示
                            // var localIds = res.localIds;  返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            this.$refs.avatarSelect.style.visibility = 'hidden';
                            //  Vue项目中图片地址必须使用 require(url) 否则不会显示
                            this.$refs.avatar.style.backgroundImage = 'url('+res.localData+')';
                            this.$refs.avatar.style.display = 'block';
                        }
                    });

                    
                }
            });
        },
        handleSelect(){
            // 底部弹出层  弹出层加载三级联动选项卡
            this.show = true;
        },
        confirm(res){
            let address = "";
            res.forEach(item=> {
                address += item.name;
                return address;
            });
            this.building = res[0].name;
            this.unit = res[1].name;
            this.household = res[2].name;
            console.log(address);
            this.address = address;
            this.selectBtn = '重新选择';
            this.show = false;
        },
        submit(){
            this.http.post("/v1/api/terminal/community/apply?"+this.$store.getters.apiVerifi, {
                "id_number": this.phone_num,
                "phone": this.phone_num,
                "username": this.name,
                "community_id": this.$store.verification.community_id,
                "building": this.building,
                "unit": this.unit,
                "household": this.household,
                "role": "01",
                "pid": "0",
                "face_image": this.user_avatar
            })
        }
    },
    created(){
        // 配置微信sdk
        console.log(wx, this.$store.state.verification.jssdkConfig);
        wx.config(this.$store.state.jssdkConfig);
        wx.ready(function(){alert('wx ready')});
        wx.error(function(res){console.log(res)});
        this.from = this.$route.query.from;
        if(this.from=='uploadInfo'){
            this.title = '完善个人信息',
            this.phone_num = this.$route.query.phone;
            this.showPhone = false;
            alert(this.showPhone);
        }
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
            position: relative;
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
            #avatarShow{
                width: 80px;
                height: 80px;
                border-radius: 50%;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                // background-color: #09CA51;
                // display: inline-block;
                background: center/cover;
                // background-image: url(../assets/avatar.jpg);
                display: none;
            }
        }
        /deep/ .mint-cell-wrapper{
            padding-right: 10vw;
        }
        .selectWrapper{
            width: 100%;
            height: 48px;
            padding: 0 10vw 0 10px;
            text-align: left;
            display: flex;
            align-items: center;
            #selectLabel{
                font-size: 16px;
                width: 105px;
                text-align: center;
            }
            #address{
                margin-right: 10px;
                max-width: 120px;
            }
            #selectBtn{

            }
        }
    }
    .mint-button--large{
        width: 70vw;
        margin-left: 15vw;
        margin-top: 15vh;
    }
}
</style>