<template>
    <div id="templock">
        <div class="temp_content">
            <input type="text" id="lock_num" v-model="lock_num" @change="handleChange($event)" minlength="4" maxlength="4"></br>
            <mt-button type='primary' id="pwd_gen">生成开锁码</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            data_num: "",
        }
    },
    methods: {
        handleChange(event){
            if(data_num.length>4){
                event.preventDefault();
            }
        }
    }
}
</script>

<style lang="less" scoped>
    #templock{
        padding-top: 30vh;
        text-align: center;
        .temp_content{
            #lock_num{
                border: none;
                outline: none;
                font-size: 30px;
                word-spacing: 30px;
                border-bottom: 1px solid #ccc;
                padding: 5px 0;
                letter-spacing: 20px;
                text-align: center;
                transition: all .3s ease;
                width: 60vw;
                &:focus{
                    border-bottom: 1px solid skyblue;
                    box-shadow: 0 2px 1px 0 skyblue;
                }
            }
            #pwd_gen{
                margin-top: 10vh;
            }
        }
    }

</style>