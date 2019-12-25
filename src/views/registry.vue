<template>
    <div id="registry">
        <mt-header title="">
            <router-link to="/login" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="search" slot="right"></mt-button>
        </mt-header>
        
        <div class="field_wrap">
            <div class="id_wrap">
                <label for="inp_id">手机号：</label>
                <input type="text" id="inp_id" class="myinput">
            </div>
            <div class="pwd_wrap">
                <label for="inp_pwd">验证码：</label>
                <input type="text" id="inp_pwd" class="myinput">
                <mt-button type="default" size="small" id="get_pwd">获取验证码</mt-button>
            </div>
            <mt-button type="primary" class="mybtn">提交并完善信息</mt-button>
        </div>

    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scope>
    #registry{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        background-color: #fff;
        .mint-header{
            // display: block;
            width: 100%;
            padding: 0 5%;
        }
        .field_wrap{
            margin-top: 10vh;
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
            margin-top: 50px;
        }
    }
    
</style>