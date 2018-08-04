<template>
    <div>
        <keep-alive>
            <router-view class="app-box"></router-view>
        </keep-alive>
        <div class="app-tabbar">
            <router-link to="/home" class="tabbar-item">
                <div :class="router === 'home' ? 'tabbar-home-active' : 'tabbar-home'"></div>
                <span :style="{color: router === 'home' ? '#0085FF' : '#818181'}">首页</span>
            </router-link>
            <router-link to="/order" class="tabbar-item">
                <div :class="router.indexOf('order') !== -1 ? 'tabbar-order-active' : 'tabbar-order'"></div>
                <span :style="{color: router.indexOf('order') !== -1 ? '#0085FF' : '#818181'}">订单</span>
            </router-link>
            <router-link to="/personal" class="tabbar-item">
                <div :class="router === 'personal' ? 'tabbar-personal-active' : 'tabbar-personal'"></div>
                <span :style="{color: router === 'personal' ? '#0085FF' : '#818181'}">个人</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {
        mapMutations,
        mapGetters
    } from 'vuex'
    import store from '@/store/store'

    export default {
        data() {
            return {

            }
        },
        components: {

        },
        created() {
            
        },
        methods: {
            
        },
        computed: {
            ...mapGetters([
                'router'
            ])
        },
        filters: {

        }
    }
</script>

<style>
    .app-tabbar {
        width: 100%;
        height: 52px;
        overflow: hidden;
        display: flex;
        border-top: 1px solid #FEFEFE;
        background: #FFF;
    }
    
    .app-box {
        width: 100%;
        height: calc(100vh - 52px);
        overflow-x: hidden;
        overflow-y: scroll;
    }
    
    .tabbar-item {
        flex: 33.333333%;
        height: 51px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    
    .tabbar-item span {
        width: 100%;
        text-align: center;
        margin-top: 2px;
    }
    
    .tabbar-item>div {
        width: 21px;
        height: 21px;
        background-size: 100% auto;
        background-position: center center;
        background-repeat: no-repeat;
    }
    
    .tabbar-home {
        background-image: url("https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/ele_home.svg");
    }
    
    .tabbar-home-active {
        background-image: url("https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/ele_home_active.svg");
    }
    
    .tabbar-order {
        background-image: url("https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/ele_order.svg");
    }
    
    .tabbar-order-active {
        background-image: url("https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/ele_order_active.svg");
    }
    
    .tabbar-personal {
        background-image: url("https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/ele_personal.svg");
    }
    
    .tabbar-personal-active {
        background-image: url("https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/ele_personal_active.svg");
    }
</style>