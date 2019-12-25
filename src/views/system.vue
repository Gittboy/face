<template>
    <div id="system">
        <mt-header title="临时开锁码">
            <router-link to="/login" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div v-show="selected==0">
            <lock1 />
        </div>
        <div v-show="selected==1">
            <lock2 />
        </div>
        <div v-show="selected==2">
            <lock3 />
        </div>
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
                    text: '开锁码生成'
                },
                {
                    text: '远程开锁'
                },
                {
                    text: '个人信息'
                },

            ]
        }
    },
    methods: {
        changeTab(event){
            console.log(event.currentTarget.dataIndex);
            this.selected = event.currentTarget.dataset.index
        }
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
            background-color: lightgray;
            margin-bottom: 0;
            padding-bottom: 5px;
            .text_item{
                display: inline-block;
                font-size: 16px;
                padding: 0 5px;
                line-height: 40px;
                list-style: none;
            }
            .text_item_active{
                color: skyblue;
                border-bottom: 2px solid skyblue;
            }
        }
    }
</style>