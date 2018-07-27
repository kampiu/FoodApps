<template>
    <div class="order-view">
        <div class="order-header">
            <div class="order-header-title">我的订单</div>
            <div class="order-menu">
                <router-link to="home" :class="router === 'orderIndex' ? 'sv-nav sv-nav-active' : 'sv-nav'">全部订单</router-link>
                <router-link to="complete" :class="router === 'orderComplete' ? 'sv-nav sv-nav-active' : 'sv-nav'">完成订单</router-link>
                <router-link to="refund" :class="router === 'orderRefund' ? 'sv-nav sv-nav-active' : 'sv-nav'">退款订单</router-link>
            </div>
        </div>
        <keep-alive>
            <router-view class="order-page-box"></router-view>
        </keep-alive>
    </div>
</template>
<style>

</style>

<script>
    import api from '@/common/api'
    import {
        mapMutations,
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                
            }
        },
        components: {
            
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                console.log(vm,to)
            })
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
    .order-view {
        position: relative;
        background: #F6F6F6;
    }
    
.order-header {
    width: 100%;
    height: 98px;
    border-bottom: 1px solid #F6F6F6;
    background: #FFF;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2000;
}
    .order-menu {
        height: 50px;
        display: flex;
        position: relative;
        border-top: 1px solid #F6F6F6;
    }
    
    .order-page-box {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        padding-top: 98px;
    }
    
    
    .order-nav {
        width: 33.333333%;
        height: 47px;
        line-height: 46px;
        text-align: center;
    }
    
    .order-list {
        width: 100%;
        overflow: hidden;
    }
    
    .order-item {
        width: 100%;
        min-height: 100px;
        display: flex;
        background: #FFF;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .05);
        margin-bottom: 10px;
    }
    
    .order-selicon {
        width: 80px;
        height: 76px;
        padding: 16px 0 0 20px;
    }
    
    .order-selicon div {
        width: 60px;
        height: 60px;
        background-size: 60px 60px;
        background-repeat: no-repeat;
        background-position: right bottom;
        border: 1px solid #F6F6F6;
    }
    
    .order-context {
        flex: 1 1 auto;
        padding: 16px 15px 10px 16px;
    }
    
    .order-selname {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        display: flex;
        line-height: 20px;
        align-items: center;
        justify-content: space-between;
    }
    
    .order-selname span {
        float: right;
        font-weight: normal;
    }
    
    .order-time {
        font-size: 12px;
        color: #999;
        line-height: 22px;
        border-bottom: 1px solid #f8f8f8;
    }
    
    .order-info-list {
        width: 100%;
        overflow: hidden;
        max-height: 66px;
    }
    
    .order-info-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 6px;
        height: 22px;
    }
    
    .order-info-price {
        font-size: 14px;
        font-weight: 600;
        color: #FB4E44;
        text-align: right;
        height: 30px;
        line-height: 30px;
    }
    
    .sv-nav {
        width: 33.333333%;
        height: 0.78rem;
        line-height: .78rem;
        text-align: center;
        font-size: .24rem;
    }
    
    .sv-nav-active {
        position: relative;
    }
    
    .sv-nav-active::before {
        content: "";
        position: absolute;
        width: 6vw;
        height: 0.52vw;
        background: #2395ff;
        left: 13.777777vw;
        bottom: -1px;
    }
</style>