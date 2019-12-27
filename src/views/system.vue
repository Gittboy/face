<template>
    <div id="system" class="new_page">
            <mt-header :title="links[selected].title?links[selected].title:links[selected].text">
            <!-- <router-link to="/login" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link> -->
            </mt-header>
            <div v-show="selected==0" style="flex: 1">
                <lock1 />
            </div>
            <div v-show="selected==1">
                <lock2 />
            </div>
            <div v-show="selected==2">
                <lock3 />
            </div>
            <!-- <router-view name="setting"></router-view>  -->
        
        <ul id="navs_wrap">
            <li class="nav_item" v-for="(item, index) in links" :key="index" :data-index="index" @click.capture="changeTab($event)">
                <span :class="{text_item: 1, text_item_active: index==selected}">
                    {{item.text}}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import lock1 from '../components/lock1'
import lock2 from '../components/lock2'
import lock3 from '../components/lock3'
export default {
    components: {
        lock1,
        lock2,
        lock3,
    },
    data(){
        return {
            selected: 0,
            links: [
                {
                    text: '开锁码生成',
                    title: '临时开锁码'
                },
                {
                    text: '远程开锁',
                },
                {
                    text: '个人信息',
                },

            ]
        }
    },
    methods: {
        changeTab(event){
            this.selected = event.currentTarget.dataset.index
        }
    },
    created(){
        console.log("系统页跳转成功")
    }
    
}
</script>

<style lang="less" scoped>
    #system{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        background-color: #fff;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        ul, li{
            list-style: none;
        }
        #navs_wrap{
            position: fixed;
            bottom: 0;
            display: flex;
            justify-content: space-around;
            width: 100%;
            padding-block-start: 0;
            padding: 0;
            background-color: #F3F3F3;
            margin-bottom: 0;
            .text_item{
                display: inline-block;
                font-size: 16px;
                padding: 0 5px;
                line-height: 50px;
                list-style: none;
            }
            .text_item_active{
                color: skyblue;
                border-bottom: 2px solid skyblue;
            }
        }
    }
</style>