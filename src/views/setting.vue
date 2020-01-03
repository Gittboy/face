<template>
    <div id="user_setting" class="new_page">
        <mt-header :title="title">
            <mt-button @click="handleBack" icon="back" slot="left">返回</mt-button>
        </mt-header>
        <div class="field">
            <div class="upload_wrapper clearfix">
                <div ref='avatarSelect'>
                    <span class="avatar_label">人脸头像</span>
                    <!-- <span class="mintui mintui-tupianshangchuanmian avatar_upload" @click="chooseAvatar"></span> -->
                    <van-uploader v-model="fileList" :afterRead="afterRead" :max-count="1"/>
                </div>
				<!-- DOM操作动态显示与隐藏 -->
                <!-- <div id="avatarShow" ref="avatar" @click="reselect"></div> -->
				<!-- 收据驱动 -->
				<van-image id="avatarShow" @click.native="reselect" v-if="user_avatar" :src='user_avatar' round fit="cover"></van-image>
            </div>
            <!-- <mt-field label="人脸头像" placeholder="请选择头像" v-model="user_avatar"></mt-field> -->
            <mt-field label="身份证号" placeholder="请输入身份证号" type="number" v-model="identify"></mt-field>
            <mt-field label="姓名" placeholder="请输入姓名" type="text" v-model="name"></mt-field>
            <mt-field label="手机号" placeholder="请输入手机号" type="number" v-model="phone_num" v-if="showPhone"></mt-field>
            <!-- <mt-field label="楼号" placeholder="请输入楼号" type="text" v-model="house_num"></mt-field>
            <mt-field label="单元号" placeholder="请输入单元号" type="number" v-model="unit_num"></mt-field>
            <mt-field label="门牌号" placeholder="请输入门牌号" type="number" v-model="gate_num"></mt-field> -->
            <div class="selectWrapper">
                <span class="selectLabel">楼号</span>
                <span v-if="buildText" class="address">{{ buildText }}</span>
                <mt-button type="primary" size="small" @click.native="selectBuild">选择楼号</mt-button>
            </div>
            <div class="selectWrapper">
                <span class="selectLabel">单元号</span>
                <span v-if="unitText" class="address">{{ unitText }}</span>
                <mt-button type="primary" size="small" @click.native="selectUnit">选择单元号</mt-button>
            </div>
            <div class="selectWrapper">
                <span class="selectLabel">门牌号</span>
                <span v-if="gateText" class="address">{{ gateText }}</span>
                <mt-button type="primary" size="small" @click.native="selectGate">选择门牌号</mt-button>
            </div>
            <!-- <van-picker :columns="columns" @change="onChange" /> -->
            <!-- <van-area :area-list="areaList" :columns-num="3" title="选择住址" /> -->
            <van-popup v-model="showBuild" round position="bottom" :style="{ height: '40%' }">
                <!-- <van-area :area-list="areaList" :columns-num="3" title="选择住址" @cancel="show=false;" @confirm="confirm" /> -->
                <van-picker :columns="buildList" show-toolbar :fedault-index="0" @confirm="confirmBuild" @change="changeBuild" @cancel="cancelBuild"></van-picker>
            </van-popup>
            <van-popup v-model="showUnit" round position="bottom" :style="{ height: '40%' }">
                <!-- <van-area :area-list="areaList" :columns-num="3" title="选择住址" @cancel="show=false;" @confirm="confirm" /> -->
                <van-picker :columns="unitList" show-toolbar @confirm="confirmUnit" @change="changeUnit" @cancel="cancelUnit"></van-picker>
            </van-popup>
            <van-popup v-model="showGate" round position="bottom" :style="{ height: '40%' }">
                <!-- <van-area :area-list="areaList" :columns-num="3" title="选择住址" @cancel="show=false;" @confirm="confirm" /> -->
                <van-picker :columns="gateList" show-toolbar @confirm="confirmGate" @change="changeGate" @cancel="cancelGate"></van-picker>
            </van-popup>
        </div>
        <mt-button type="primary" size="large" @click.native="debounceSubmit">提交审核</mt-button>
    </div>
</template>

<script>
import Vue from 'vue';
import {Field, Button, MessageBox, Toast} from 'mint-ui';
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
import { Area, Picker, Popup, Image, Uploader } from 'vant';
import 'vant/lib/area/style';
import 'vant/lib/popup/style';
import 'vant/lib/image/style';
import 'vant/lib/picker/style';
import 'vant/lib/uploader/style';
Vue.use(Area).use(Popup).use(Image).use(Picker).use(Uploader);
import areas from './areas';
import { thistle } from 'color-name';
export default {
    data(){
        return {
            selected: false,
            from: '',
            title: "个人信息修改",
            fileList: [],
            user_avatar: '',
            identify: "",
            name: "",
            phone_num: "",
            showPhone: true,
            showBuild: false,
            showUnit: false,
            showGate: false,
            // areaList: areas
            buildInfo: {"unitInfo":[{"id":3,"title":"一单元","parent":33},{"id":4,"title":"二单元","parent":33},{"id":5,"title":"三单元","parent":34},{"id":6,"title":"四单元","parent":34}],"buildingInfo":{"33":"22号楼","34":"23号楼"},"householdInfo":[{"title":"101","id":1,"parent":3},{"title":"102","id":2,"parent":3},{"title":"201","id":3,"parent":3},{"title":"202","id":4,"parent":3},{"title":"101","id":5,"parent":4},{"title":"102","id":6,"parent":4},{"title":"103","id":7,"parent":4},{"title":"201","id":8,"parent":4},{"title":"202","id":9,"parent":4},{"title":"203","id":10,"parent":4},{"title":"301","id":11,"parent":4},{"title":"302","id":12,"parent":4},{"title":"303","id":13,"parent":4},{"title":"101","id":14,"parent":5},{"title":"101","id":15,"parent":6},{"title":"102","id":16,"parent":6},{"title":"201","id":17,"parent":6},{"title":"202","id":18,"parent":6}]},
            tempBuild: "",
            selectedBuild: "",
            buildText: "",
            tempUnit: "",
            selectedUnit: "",
            unitText: "",
            tempGate: "",
            selectedGate: "",
            gateText: "",
        }
    },
    computed: {
        buildList(){
            let arrLabel = [];
            let arrValue = [];
            let buildInfo = this.buildInfo.buildingInfo;
            for(var key in buildInfo){
                arrLabel.push({value: key, text: buildInfo[key]});
            }
            return arrLabel;
        },
        unitList(){
            let arrValue = [];
            let unitInfo = this.buildInfo.unitInfo;
            let parent = parseInt(this.selectedBuild);
            if(this.selectedBuild){
                unitInfo.forEach(item=> {
                    if(item.parent==parent){
                        arrValue.push({value: item.id, text: item.title})
                    }
                })
            }
            return arrValue;
        },
        gateList(){
            let arrValue = [];
            let household = this.buildInfo.householdInfo;
            let parent = this.selectedUnit;
            if(this.selectedUnit){
                household.forEach(item=> {
                    if(item.parent==parent){
                        arrValue.push({value: item.id, text: item.title})
                    }
                })
            }
            return arrValue;
        },
        debounceSubmit(){
            return this.debounce(this.submit, 1000);
        }
    },
    methods: {
        handleBack(){
            this.$router.go(-1);
        },
        chooseAvatar(){
            let _this = this;
            // this.$refs.avatarSelect.style.visibility = 'hidden';
            //  Vue项目中图片地址必须使用 require(url) 否则不会显示
            // this.$refs.avatar.style.backgroundImage = 'url('+this.$store.state.userInfo.community_info.face_image_url+')';
            // this.$refs.avatar.style.display = 'block';
            // this.user_avatar = this.$store.state.userInfo.community_info.face_image_url;
            // console.log(this.user_avatar);
            console.log(wx.chooseImage, wx.getLocalImgData);
            wx.ready(()=> {
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        console.log('wx.chooseImage ok');
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        // getLocalImgData 接口未配置
                        wx.getLocalImgData({
                            localId: localIds[0], // 图片的localId
                            success: function (res) {
                                console.log('wx.getLocalImgData ok');
                                console.log('123'+res.localData);
                                console.log(this, _this);
                                _this.$refs.avatarSelect.style.visibility = 'hidden';
                                _this.user_avatar = res.localData; // localData是图片的base64数据，可以用img标签显示
                                //  获取并保存图片base64数据后  通过image 或者元素的background属性展示
                                // this.$refs.avatar.style.background = 'url('+res.localData+')';
                                // this.$refs.avatar.style.display = 'block';
                            }
                        });
                    }
                });
            })
            
        },
        afterRead(file){
            console.log(file);
            console.log(this.fileList[0]);
        },
        reselect(){
            MessageBox.confirm('确定要重新选择吗？', '提示').then(action => {
                // this.$refs.avatar.style.display = 'none';
                this.user_avatar = "";
                this.$refs.avatarSelect.style.visibility = 'visible';
            })
            
        },
        selectBuild(){
            // 获取数据
            // this.http.get("http://facerke.epplink.net/officalcount/getCommunityInfo").then(res=> {
            //     console.log(res.data);
            //     this.buildInfo = res.data;
            //     this.show = true;
            // }, err=> {
            //     console.log(err);
            // })
            this.showBuild = true;
            this.tempBuild = this.tempBuild?this.tempBuild:0;
            console.log(this.tempBuild);
        },
        confirmBuild(){
            this.selectedBuild = this.buildList[this.tempBuild].value;
            this.buildText = this.buildList[this.tempBuild].text;
            this.selectedUnit = "";
            this.unitText = "";
            this.selectedGate = "";
            this.gateText = "";
            this.showBuild = false;
        },
        cancelBuild(){
            this.showBuild = false;
        },
        changeBuild(picker, value, index){
            this.tempBuild = index;
        },
        selectUnit(){
            if(this.selectedBuild){
                this.showUnit = true;
                console.log(this.unitList);
                this.tempUnit = this.tempUnit?this.tempUnit:0;
            }else {
                Toast("请先选择楼号");
            }
        },
        changeUnit(picker, value, index){
            this.tempUnit = index;
        },
        cancelUnit(){
            this.showUnit = false;
        },
        confirmUnit(){
            this.selectedUnit = this.unitList[this.tempUnit].value;
            this.unitText = this.unitList[this.tempUnit].text;
            console.log(this.unitText, this.selectedUnit);
            this.selectedGate = "";
            this.gateText = "";
            this.showUnit = false;
        },
        selectGate(){
            if(this.selectedBuild&&this.selectedUnit){
                this.showGate = true;
                this.tempGate = this.tempGate?this.tempGate:0;
            }else {
                Toast("请先选择楼号和单元号");
            }
        },
        changeGate(picker, value, index){
            this.tempGate = index;
        },
        cancelGate(){
            this.showGate = false;
        },
        confirmGate(){
            this.selectedGate = this.gateList[this.tempGate].value;
            this.gateText = this.gateList[this.tempGate].text;
            console.log(this.selectedGate, this.gateText);
            this.showGate = false;
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
        //  提交数据    
        submit(){
            if(this.phone_num&&this.identify&&this.name&&this.selectedBuild&&this.selectedUnit&&this.selectedGate&&this.fileList){
                this.http.post("http://facerke.epplink.net/v1/api/terminal/community/apply?"+this.$store.getters.apiVerifi, {
                "id_number": this.identify,
                "phone": this.phone_num,
                "username": this.name,
                "community_id": this.$store.state.verification.communityId,
                "building": this.selectedBuild,
                "unit": this.selectedUnit,
                "household": this.selectedGate,
                "role": "01",
                "pid": "0",
                "face_image": this.fileList[0].content
                }).then(res=> {
                    console.log(res.data);
                    console.log(this.selectedBuild, this.selectedUnit, this.selectedGate);
                    if(res.data.code!=1){
                        Toast(res.data.reason);
                    }else{
                        Toast({message: "信息提交成功！", duration: 1500});
                        setTimeout(()=> {
                            this.$router.push("/submit");
                        }, 1000);
                    }
                    // this.$router.replace("/system");
                }, err=>{
                    console.log(err);
                })
            }else {
                Toast("请完善个人信息");
            }
        }
    },
    created(){
        this.from = this.$route.query.from;
        if(this.from=='uploadInfo'){
            this.title = '完善个人信息',
            this.phone_num = this.$route.query.phone;
            this.showPhone = false;
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
        padding-top: 10vh;
        .upload_wrapper{
            vertical-align: middle;
            position: relative;
            .avatar_label{
                float: left;
                width: 105px;
                margin-left: 10px;
                line-height: 50px;
            }
            /deep/ .van-uploader{
                left: -72px;
                .van-uploader__upload{
                    width: 50px;
                    height: 50px;
                }
                .van-uploader__preview-image{
                    width: 50px;
                    height: 50px;
                }
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
                // display: none;
            }
        }
        /deep/ .mint-cell-wrapper{
            padding-right: 5vw;
						margin-top: -1px;
        }
        .selectWrapper{
            width: 100%;
            height: 48px;
            padding: 0 10vw 0 10px;
            text-align: left;
            display: flex;
            align-items: center;
            .selectLabel{
                font-size: 16px;
                width: 105px;
                text-align: center;
            }
            .address{
                margin-right: 5px;
                max-width: 120px;
                min-width: 48px;
            }
        }
    }
    .mint-button--large{
        width: 70vw;
        margin-left: 15vw;
        margin-top: 5vh;
    }
}
</style>