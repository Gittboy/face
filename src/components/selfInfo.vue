<template>
  <div id="self_center">
    <div id="content_wrapper">
      <!-- <img :src="avatar" alt="个人头像" class="user_avatar"> -->
      <van-image width="50vw" height="50vw" :src="avatar" fit="cover"></van-image>
      <van-uploader v-model="fileList" :preview-image="false" :afterRead="afterRead" :max-count="1"/>
      <div class="info_wrapper">
        <p v-for="(item, index) in info" :key="index">{{item.key+" "+':'+" "+item.value}}</p>
      </div>
      <!-- <mt-button type="primary" id="setting" size='normal' @click.native="jumpToSeeting">修改信息</mt-button> -->
    </div>
    <router-view name="setting"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters } from "vuex";
import { Button } from "mint-ui";
Vue.component(Button.name, Button);
import { Image, Uploader, Toast } from "vant";
import "vant/lib/image/style";
import "vant/lib/uploader/style";
import "vant/lib/toast/style";
Vue.use(Image).use(Uploader).use(Toast);
export default {
  data() {
    return {
      avatar: "",
      fileList: [],
      info: [
        {
          key: "姓 名",
          value: ""
        },
        {
          key: "手机号",
          value: ""
        },
        {
          key: "身份证",
          value: ""
        },
        {
          key: "小 区",
          value: ""
        },
        {
          key: "地 址",
          value: ""
        }
      ]
    };
  },
  methods: {
    afterRead(file){
      console.log(file.content);
      Toast.loading({
        message: "上传中",
        forbidClick: true,
        loadingType: 'spinner',
        duration: 3500
      })
      this.http.post(`/v1/api/terminal/face_image?${this.$store.getters.apiVerifi}`, {
        "face_image": file.content
      }).then(res=> {
        if(res.data.code!=1){
          Toast("更新人脸失败！");
        }else {
          this.avatar = file.content;
          Toast("更新人脸成功！");
          this.$store.commit({
            type: 'updateAvatar',
            avatar: file.content
          })
        }
      }, err=> {
        Toast("更新人脸照片失败！")
      }).finally(res=> {
        this.fileList = [];
        this.avatar = file.content;
      })
    },
    jumpToSeeting() {
      this.$router.push("/system/selfInfo/setting?type=modify");
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    if (!this.avatar || this.$route.query.from == "modified") {
      this.info[2].value = this.userInfo.community_info.id_number;
      this.info[0].value = this.userInfo.community_info.username;
      this.info[1].value = this.userInfo.community_info.phone;
      this.info[3].value = this.userInfo.community_info.community_name;
      this.info[4].value = this.userInfo.community_info.community_address;
      this.avatar = this.userInfo.community_info.face_image_url;
    }
  }
};
</script>

<style lang="less" scoped>
#self_center {
  // display: flex;
  // justify-content: center;
  height: 100vh;
  padding-bottom: 52px;
  overflow: scroll;
  #content_wrapper {
    flex: 1 1 70vw;
    min-height: 50vh;
    padding-top: 60vw;
    position: relative;
    .van-image{
      position: absolute;
      top: 10vw;
      left: 50%;
      transform: translateX(-50%);
    }
    /deep/ .van-uploader{
      position: absolute;
      top: 12vw;
      opacity: 0;
      left: 50%;
      transform: translateX(-50%);
      .van-uploader__upload{
          width: 46vw;
          height: 46vw;
      }
    }
    .user_avatar {
      max-width: 100%;
    }
    .info_wrapper {
      padding-top: 20px;
      padding-left: 15vw;
      p {
        text-align: left;
        word-spacing: 12px;
      }
    }
    .jump_setting {
      float: right;
      margin-top: 20px;
    }
    #setting {
      margin-top: 20px;
      float: right;
    }
  }
}
</style>