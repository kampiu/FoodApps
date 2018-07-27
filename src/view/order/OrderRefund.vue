<template>
    <div>
        <vue-put-to class="order-view-scroll">
            <div class="order-list">
                <order-item  v-for="(item, index) in orderList" :key="item.sellerInfo.id + item.time + item.orderId" :item="item" v-if="item.type == 3"></order-item>
            </div>
        </vue-put-to>
    </div>
</template>

<script>
    import orderItem from '@/components/orderItem'
    import vuePutTo from 'vue-pull-to'
    import api from '@/common/api'
    import {
        mapMutations,
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                scrollConfigBottom: {
                    pullText: '上拉加载',
                    triggerText: '释放更新',
                    loadingText: '加载中...',
                    doneText: '加载完成',
                    failText: '加载失败',
                    loadedStayTime: 400,
                    stayDistance: 50,
                    triggerDistance: 50
                },
                scrollConfigTop: {
                    pullText: '下拉刷新',
                    triggerText: '释放更新',
                    loadingText: '加载中...',
                    doneText: '加载完成',
                    failText: '加载失败',
                    loadedStayTime: 400,
                    stayDistance: 50,
                    triggerDistance: 50
                },
            }
        },
        components: {
            orderItem,
            vuePutTo
        },
        created() {

        },
        methods: {
            refresh(loaded) {
                loaded('done')
            },
            loadmore(loaded) {
                loaded('done')
            },
            finishOrder(e){
                this.$store.commit("order/finishOrder", e.target.dataset.id)
                console.log(e.target.dataset.id)
            },
            refundOrder(e){
                this.$store.commit("order/refundOrder", e.target.dataset.id)
                console.log(e.target.dataset.id)
            }
        },
        computed: {
            ...mapGetters([
                'orderList',
                'router'
            ])
        },
        filters: {
            timeForm(val) {
                let time = new Date(val)
                let y = time.getFullYear()
                let m = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1
                let d = time.getDate() < 10 ? "0" + time.getDate() : time.getDate()
                let h = time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
                let mm = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
                let s = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()
                return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
            }
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
    
    .order-view-scroll {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        padding-bottom: 52px;
    }
    
    .order-header-title {
        font-weight: 800;
        font-size: 0.28rem;
        color: #FFF;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: -webkit-linear-gradient(left, #03AAFF, #0387FF);
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
        display: inline-block;
    }
    
    .order-info-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 6px;
        height: 22px;
    }
    
    .order-info-item span {
        margin-right: auto;
        margin-left: 4px;
        color: #999;
    }
    
    .order-info-item>span:last-child {
        display: inline-block;
        width: 30px;
        height: 100%;
        flex: 0 0 auto;
        text-align: right;
        margin-right: 0;
        color: #333;
    }
    
    .order-info-price {
        font-size: 14px;
        font-weight: 600;
        color: #FB4E44;
        text-align: right;
        height: 30px;
        line-height: 30px;
    }
    
    .order-item-operation {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    
    .order-item-operation>div {
        width: 100px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #0388FF;
        margin-left: 14px;
    }
    
    .order-item-operation>div:nth-child(1) {
        color: #0388FF;
    }
    
    .order-item-operation>div:nth-child(2) {
        color: #FFF;
        background: #0388FF;
    }
</style>