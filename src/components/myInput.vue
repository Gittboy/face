<template>
    <div>
        <input type="text" placeholder="请输入开锁码" class="myInput" v-model="value" @change="inputChange">
    </div>
</template>

<script>
export default {
    data(){
        return {
            value: null,
        }
    },
    props: ['holder'],
    methods: {
        inputChange(){
            console.log(this.holder);
            this.$emit('delivery', this.value);
        }
    }
}
</script>

<style lang="less" scoped>
    .myInput{
        padding: 10px 20px;
        border: 1px solid #ccc;
        outline: none;
        font-size: 18px;
        width: 100%;
        box-sizing: border-box;
        vertical-align: middle;
        transition: all .2s ease;
    }
    .myInput:focus{
        border: 1px solid skyblue;
        box-shadow: 0 0 6px 2px skyblue;
    }
    .myInput::placeholder{
        font: 18px/18px;
    }
</style>