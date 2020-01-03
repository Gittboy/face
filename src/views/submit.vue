<template>
    <div>
        <div id="tip_submit" ref="title">{{info}}</div>
    </div>
</template>

<script>
import { Dialog } from 'vant'
import 'vant/lib/dialog/style'
// import 'vant/lib/notify/style'
export default {
    data(){
        return {
            notify: "",
            info: '您的个人信息已提交，请您耐心等待审核'
        }
    },
    mounted(){
        Dialog.alert({
            title: '温馨提示',
            message: '您的个人信息已提交，请您耐心等待审核'
        }).then(() => {
            // this.notify = Notify({
            //     type: "success",
            //     message: "您的个人信息已提交，请耐心等待审核",
            //     duration: 0
            // })
            this.$refs.title.style.top = 0;
            window.close();
        });
    },
    beforeRouteLeave (to, from, next) {
        console.log(to);
        next();
    }
}
</script>

<style lang="less" scoped>
    #tip_submit{
        box-sizing: border-box;
        padding: 8px 16px;
        width: 100%;
        font-size: 14px;
        line-height: 20px;
        white-space: pre-wrap;
        text-align: center;
        word-wrap: break-word;
        transition: all 0.3s ease;
        background-color: #07c160;
        color: #fff;
        position: fixed;
        top: -36px;
    }
</style>