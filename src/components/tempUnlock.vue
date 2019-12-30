<template>
    <div id="templock">
        <div class="temp_content">
            <mt-badge size="large" type="warning">{{lock_num}}</mt-badge>
            <!-- <input type="text" id="lock_num" v-model="lock_num" minlength="4" maxlength="4" readonly> -->
            <br/>
            <!-- 点击获取开锁码 -->
            <mt-button type='primary' id="pwd_gen" @click="getLockcode">生成开锁码</mt-button>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            lock_num: '000000',
        }
    },
    // 获取开锁码
    getLockcoe(){
        this.http.post(`/v1/api/terminal/openlock/code?user_id=xxx&community_id=xxxxxx&salt=randomsalt&token=hasedtoken&identity=identity`,
        {"community_locks":["south_1","gate_1"]}).then(res=> {
            if(res.data.code!=1){
                Toast(res.data.reason)
            }else {
                this.lock_num = res.data.auth_code;
                Toast('获取开锁码成功');
            }
        })
    }
}
</script>

<style lang="less" scoped>
    #templock{
        padding-top: 30vh;
        text-align: center;
        .temp_content{
            // 横线输入框样式信息
            // #lock_num{
            //     border: none;
            //     outline: none;
            //     font-size: 30px;
            //     word-spacing: 30px;
            //     border-bottom: 1px solid #ccc;
            //     padding: 5px 0;
            //     letter-spacing: 20px;
            //     text-align: center;
            //     transition: all .3s ease;
            //     width: 60vw;
            //     &:focus{
            //         border-bottom: 1px solid skyblue;
            //         box-shadow: 0 2px 1px 0 skyblue;
            //     }
            // }
            #pwd_gen{
                margin-top: 10vh;
            }
            .mint-badge.is-size-large{
                text-align: center;
                font-size: 30px;
                line-height: 30px;
                letter-spacing: 10px;
                text-indent: 10px;
                padding: 10px 10px;
                font-weight: bold;
                // min-width: 130px;
                min-height: 30px;
            }
        }
    }

</style>