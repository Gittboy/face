<template>
    <div id="self_center">
        <div id="content_wrapper">
            <img :src="avatar" alt="个人头像">
            <div class="info_wrapper">
                <p v-for="(item, index) in info" :key="index">{{item.key+" "+':'+" "+item.value}}</p>
            </div>
            <router-link to="/system/setting" class="jump_setting">修改信息</router-link>
        </div>
        <router-view name="setting"></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return {
            avatar: require('../assets/logo.png'),
            info: [
                {
                    key: "身份证",
                    value: 6542319984523
                },
                {
                    key: "姓名",
                    value: "张三"
                },
                {
                    key: "地址",
                    value: "12栋6单元608"
                }
            ]
        }
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
    }
}

</style>