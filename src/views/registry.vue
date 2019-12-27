<template>
    <div id="registry" class="new_page">
        <mt-header title="">
            <router-link to="/index" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="search" slot="right"></mt-button>
        </mt-header>
        
        <div class="field_wrap">
            <div class="id_wrap">
                <label for="inp_id">手机号：</label>
                <!-- 用户输入的手机号  phone 字段 -->
                <input type="text" id="inp_id"  v-model="phone" class="myinput">
            </div>
            <div class="pwd_wrap">
                <label for="inp_pwd">验证码：</label>
                <!-- 用户获取后输入的验证码  captcha_code 字段 -->
                <input type="text" id="inp_pwd" v-model="captcha_code" class="myinput">
                <!-- 获取验证码按钮，点击60s后重新获取验证码 getVerification 方法 -->
                <mt-button type="default" size="small" id="get_pwd" @click="getVerification">{{text}}</mt-button>
            </div>
            <!-- 提交手机号和验证码验证登录信息 submit 方法 -->
            <mt-button type="primary" class="mybtn" @click="submit">提交并完善信息</mt-button>
        </div>
        <router-view name=""></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return {
            timer: null,
            counter: 59,
            text: '获取验证码',
            phone: '',
            captcha_code: '',
        }
    },
    methods: {
        getVerification(){
            let _this = this;
            if(this.timer){
                return ;
            } else {
                this.http.get()
                this.timer = setInterval(function(){
                    _this.text = _this.counter + "秒后刷新";
                    _this.counter--;
                    if(_this.counter==0){
                        clearInterval(_this.timer);
                        _this.timer = null;
                        _this.counter==59;
                        _this.text = '获取验证码';
                    }
                }, 1000)
            }
        },
        submit(){
            if(this.phone && this.captcha_code){
                this.http.post(`/v1/api/terminal/community/signin?user_id=xxxx&salt=randomsalt&token=hasedtoken&identity=identity`, 
                {
                    "phone": this.phone_num,
                    "captcha_code": this.captcha_code
                }).then(res=>{
                    this.checkRes(res.data, Toast, '登录成功')
                })

            } 
            
        }
    }
}
</script>

<style lang="less" scope>
    #registry{
        // position: fixed;
        // top: 0;
        // left: 0;
        // width: 100%;
        // min-height: 100%;
        // background-color: #fff;
        .mint-header{
            // display: block;
            width: 100%;
            padding: 0 5%;
        }
        .field_wrap{
            margin-top: 20vh;
            padding: 0 10vw;
            .id_wrap{
                display: flex;
                align-items: center;
            }
            .pwd_wrap{
                padding-top: 15px;
                display: flex;
                align-items: center;
                #get_pwd{
                    height: 24px;
                    margin-left: 5px;
                }
                .mint-button-text{
                    font-size: 16px;
                }
            }
        }
        .myinput{
            height: 20px;
            line-height: 20px;
            flex: 1 1;
            flex-shrink: 1;
            min-width: 0;
        }
        .mybtn{
            width: 100%;
            margin-top: 10vh;
        }
    }
    
</style>