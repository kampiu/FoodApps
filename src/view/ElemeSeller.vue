<template>
    <div class="seller-view">
        <div class="seller-header">
            <div class="seller-header-bg">
                <div :style="{backgroundImage: 'url(' + sellerInfo.sel_icon + ')'}"></div>
            </div>
            <div class="seller-back" @click="backTo"></div>
            <div class="seller-header-content">
                <div class="seller-name">{{sellerInfo.sel_name}}</div>
                <div class="seller-header-msg font-break">{{sellerInfo.sel_description}}</div>
            </div>
            <div class="seller-header-icon" :style="{backgroundImage: 'url(' + sellerInfo.sel_icon + ')'}"></div>
        </div>
        <div class="sv-body">
            <div class="sv-header">
                <router-link to="home" :class="router === 'sellerIndex' ? 'sv-nav sv-nav-active' : 'sv-nav'">点菜</router-link>
                <router-link to="comment" :class="router === 'sellerComment' ? 'sv-nav sv-nav-active' : 'sv-nav'">评价</router-link>
                <router-link to="info" :class="router === 'sellerInfo' ? 'sv-nav sv-nav-active' : 'sv-nav'">商家</router-link>
            </div>
            <keep-alive>
                <router-view class="seller-page-box"></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<style>

</style>

<script>
    import productionParam from '@/components/productionParam'
    import sellerCart from '@/components/sellerCart'
    import sellerBar from "@/components/sellerBar"
    import sellerPut from '@/components/sellerPut'
    import store from '@/store/store'
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
                if(vm.sellerId !== to.params.id) {
                    vm.$store.commit("common/initSeller")
                    vm.cataId = null
                    vm.initData(to.params.id)
                }
            })
        },
        created() {

        },
        methods: {
            initData(id) {
                this.$ajax.get(api.getSeller(id)).then(res => {
                    this.cataId = res.list[0].list[0].cla_ele_id
                    this.$store.commit("initSellerInfo", res.list[0])
                }).catch(err => {
                    console.log(err)
                })
            },
            backTo() {
                this.$router.push({
                    path: '/'
                })
            }
        },
        computed: {
            ...mapGetters([
                'sellerInfo',
                'router'
            ])
        },
        filters: {

        },
        watch: {

        }
    }
</script>

<style>
    .seller-view {
        position: fixed;
        left: 0;
        top: 0
    }
    
    .seller-header {
        width: 100%;
        height: 2.6rem;
        background: #FFF;
        position: relative;
    }
    
    .seller-header-bg,
    .seller-header-bg>div {
        width: 100%;
        height: 2.2rem;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        background-color: rgba(0, 0, 0, 0.8);
        overflow: hidden;
        z-index: 100;
    }
    
    .seller-header-bg>div {
        filter: blur(30px);
        -webkit-filter: blur(30px);
        -webkit-transform: scale(1.2);
    }
    
    .seller-header-content {
        background: none;
        width: 100%;
        height: 2.2rem;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 200;
        padding: 0.86rem 0 0 1.88rem;
    }
    
    .seller-header-icon {
        width: 1.54rem;
        height: 1.54rem;
        overflow: hidden;
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
        border-radius: 4px;
    }
    
    .seller-view .seller-name {
        font-size: 0.36rem;
        line-height: .4rem;
        font-weight: 700;
        color: #FFF;
    }
    
    .seller-header-msg {
        width: 100%;
        height: 0.52rem;
        line-height: .26rem;
        color: #efefef;
        font-weight: normal;
        -webkit-line-clamp: 2;
        padding-right: 0.2rem;
    }
    /*body-left*/
    
    .sv-body {
        width: 100%;
        overflow: hidden;
    }
    
    .sv-header {
        width: 100%;
        height: 0.78rem;
        display: flex;
        position: relative;
        border-bottom: 1px solid #F6F6F6;
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
    
    .sv-content {
        width: 100%;
        height: calc(100vh - 3.38rem - 50px);
        display: flex;
        min-height: 100%;
        overflow: hidden;
    }
    
    .sv-left {
        flex: 0 0 auto;
        height: 100%;
        width: 1.6rem;
        background: #F7F8F9;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    
    .sv-left-nav {
        padding: .2rem;
        width: 100%;
        min-height: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    
    .sv-left-nav-active {
        padding: .2rem;
        width: 100%;
        min-height: 1rem;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    
    .sv-right {
        height: 100%;
        flex: 1 1 auto;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    /*body-right*/
    
    .sv-right-label {
        width: 100%;
        overflow: hidden;
    }
    
    .sv-right-title {
        width: 100%;
        padding: 0 0.2rem;
        font-size: .24rem;
        font-weight: 600;
        height: .48rem;
        line-height: .48rem;
    }
    
    .sv-right-item {
        width: 100%;
        height: 2rem;
        overflow: hidden;
        display: flex;
    }
    
    .sv-ri-icon {
        width: 1.6rem;
        height: 1.6rem;
        border: 1px solid #f6f6f6;
        flex: 0 0 auto;
        margin: 0.2rem;
    }
    
    .sv-ri-icon>div {
        width: 100%;
        height: 100%;
        transition: all linear .2s;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        margin: 0;
    }
    
    .sv-ri-context {
        flex: 1 1 auto;
        height: 100%;
        padding-left: .2rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: 0.2rem .2rem .2rem 0;
        border-bottom: 1px solid #F6F6F6;
    }
    
    .sv-ri-context>.sv-ri-record {
        height: .4rem;
        display: flex;
        align-items: center;
    }
    
    .sv-ri-context>.sv-ri-name {
        min-height: .46rem;
        max-height: .64rem;
        display: flex;
        align-items: center;
        line-height: 0.32rem;
    }
    
    .sv-ri-name {
        font-size: .28rem;
        font-weight: 700;
        color: #333333;
    }
    
    .sv-ri-describe,
    .sv-ri-record .sv-ri-param {
        font-size: .22rem;
        line-height: .4rem;
        height: .4rem;
        overflow: hidden;
        color: #999 !important;
    }
    
    .sv-ri-param {
        line-height: .5rem;
    }
    
    .sv-ri-param .sv-ri-price {
        font-weight: 800;
        font-size: .3rem;
        line-height: .36rem;
        color: #FB4E44;
    }
    /*pay_bar*/
    
    .seller-pay-bar {
        width: 100%;
        height: 50px;
        background: #505052;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 600;
        padding-left: 1.6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .seller-shopcart {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        border: 6px solid #444444;
        position: absolute;
        left: calc((1.6rem - 50px)/2);
        top: -14px;
    }
    
    .seller-shopcart-disable {
        background: #363636;
    }
    
    .seller-shopcart-enable {
        background: #3190e8;
    }
    
    .seller-shopcart::before {
        content: "";
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        width: 22px;
        height: 22px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -11px;
        margin-left: -11px;
    }
    
    .seller-shopcart-enable::before {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTggNTgiPjxkZWZzPjxmaWx0ZXIgaWQ9ImEiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiIHg9Ii01MCUiIHk9Ii01MCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz48ZmVHYXVzc2lhbkJsdXIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIiBzdGREZXZpYXRpb249IjEuNSIvPjxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA4IDAiLz48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48cGF0aCBpZD0iYiIgZD0iTTcuNjE0IDQuMDUxYy0xLjA2Ni4wODYtMS40NTItLjM5OC0xLjc1Mi0xLjU4NEM1LjU2MiAxLjI4LjMzIDUuODguMzMgNS44OGwzLjcxIDE5LjQ3NmMwIC4xNDgtMS41NiA3LjUxNS0xLjU2IDcuNTE1LS40ODkgMi4xOS4yOTIgNC4yNyAzLjU2IDQuMzIgMCAwIDM2LjkxNy4wMTcgMzYuOTIuMDQ3IDEuOTc5LS4wMTIgMi45ODEtLjk5NSAzLjAxMy0zLjAzOS4wMy0yLjA0My0xLjA0NS0yLjk3OC0yLjk4Ny0yLjk5M0w4LjgzIDMxLjE5MnMuODYtMy44NjUgMS4wNzctMy44NjVjMCAwLTUuNzg4LjEyMiAzMi4wNjUtMS45NTYuNjA2LS4wMzMgMi4wMTgtLjc2NCAyLjI5OC0xLjg0OCAxLjExMy00LjMxNyA0LjAwOC0xMy4yNiA0LjQ1OC0xNS42NC45MzItNC45MjUgMi4wNjEtOC41NTgtNC4yOC03LjQwNSAwIDAtMzUuNzY4IDMuNDg3LTM2LjgzMyAzLjU3M3oiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDM4IDcuODA4KSI+PG1hc2sgaWQ9ImMiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2IiLz48L21hc2s+PHVzZSBmaWxsPSIjRkZGIiB4bGluazpocmVmPSIjYiIvPjxwYXRoIGZpbGw9IiMyMDczQzEiIGQ9Ik01My45NjIgNy43NzRsLTUuNzAxIDE5LjMwNS00MC43OCAxLjU3NHoiIG1hc2s9InVybCgjYykiIG9wYWNpdHk9Ii4xIi8+PC9nPjxwYXRoIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjYiIGQ9Ik05LjM3NCAxOC43MjJTNy44NjggMTEuMjgzIDcuMzIzIDguNzFDNi43NzggNi4xMzYgNS44NiA1LjMzIDMuOTc4IDQuNTIgMi4wOTYgMy43MTMuMzY3IDIuMjg2LjM2NyAyLjI4NiIvPjxjaXJjbGUgY3g9IjQ2IiBjeT0iNTEiIHI9IjQiIGZpbGw9IiNGRkYiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjUxIiByPSI0IiBmaWxsPSIjRkZGIi8+PC9nPjwvc3ZnPg==");
    }
    
    .seller-shopcart-disable::before {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTggNTgiPjxkZWZzPjxmaWx0ZXIgaWQ9ImEiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiIHg9Ii01MCUiIHk9Ii01MCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz48ZmVHYXVzc2lhbkJsdXIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIiBzdGREZXZpYXRpb249IjEuNSIvPjxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA4IDAiLz48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48cGF0aCBpZD0iYiIgZD0iTTcuNjE0IDQuMDUxYy0xLjA2Ni4wODYtMS40NTItLjM5OC0xLjc1Mi0xLjU4NEM1LjU2MiAxLjI4LjMzIDUuODguMzMgNS44OGwzLjcxIDE5LjQ3NmMwIC4xNDgtMS41NiA3LjUxNS0xLjU2IDcuNTE1LS40ODkgMi4xOS4yOTIgNC4yNyAzLjU2IDQuMzIgMCAwIDM2LjkxNy4wMTcgMzYuOTIuMDQ3IDEuOTc5LS4wMTIgMi45ODEtLjk5NSAzLjAxMy0zLjAzOS4wMy0yLjA0My0xLjA0NS0yLjk3OC0yLjk4Ny0yLjk5M0w4LjgzIDMxLjE5MnMuODYtMy44NjUgMS4wNzctMy44NjVjMCAwLTUuNzg4LjEyMiAzMi4wNjUtMS45NTYuNjA2LS4wMzMgMi4wMTgtLjc2NCAyLjI5OC0xLjg0OCAxLjExMy00LjMxNyA0LjAwOC0xMy4yNiA0LjQ1OC0xNS42NC45MzItNC45MjUgMi4wNjEtOC41NTgtNC4yOC03LjQwNSAwIDAtMzUuNzY4IDMuNDg3LTM2LjgzMyAzLjU3M3oiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDM4IDcuODA4KSI+PG1hc2sgaWQ9ImMiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2IiLz48L21hc2s+PHVzZSBmaWxsPSIjNUY1RjYzIiB4bGluazpocmVmPSIjYiIvPjxwYXRoIGZpbGw9IiNFQkVFRjMiIGQ9Ik01My45NjIgNy43NzRsLTUuNzAxIDE5LjMwNS00MC43OCAxLjU3NHoiIG1hc2s9InVybCgjYykiIG9wYWNpdHk9Ii4wNSIvPjwvZz48cGF0aCBzdHJva2U9IiM1RjVGNjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI2IiBkPSJNOS4zNzQgMTguNzIyUzcuODY4IDExLjI4MyA3LjMyMyA4LjcxQzYuNzc4IDYuMTM2IDUuODYgNS4zMyAzLjk3OCA0LjUyIDIuMDk2IDMuNzEzLjM2NyAyLjI4Ni4zNjcgMi4yODYiLz48Y2lyY2xlIGN4PSI0NiIgY3k9IjUxIiByPSI0IiBmaWxsPSIjNUY1RjYzIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI1MSIgcj0iNCIgZmlsbD0iIzVGNUY2MyIvPjwvZz48L3N2Zz4=");
    }
    
    .seller-shopcart>span {
        position: absolute;
        right: -5px;
        top: -8px;
        display: inline-block;
        min-width: 0.3rem;
        height: 0.28rem;
        background: linear-gradient(-90deg, #ff7416, #ff3c15 98%);
        text-align: center;
        line-height: .28rem;
        font-size: 0.2rem;
        border-radius: .14rem;
        color: #FFF;
    }
    
    .seller-pay {
        color: #F8F8F8;
        width: 2rem;
        height: 50px;
        float: right;
        text-align: center;
        font-size: 0.26rem;
        line-height: 50px;
    }
    
    .seller-pay-disable {
        background: #535356;
        font-weight: normal;
    }
    
    .seller-pay-enable {
        background: #38CA73;
        font-weight: 800;
    }
    
    .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    }
    
    .inner {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: #008EFF;
        transition: all 0.4s linear;
    }
    
    .sv-ri-param {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .sv-ri-counter {
        width: 1.2rem;
        overflow: hidden;
        height: 0.36rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .counter-prve,
    .counter-next {
        width: .36rem;
        height: .36rem;
        border-radius: 0.18rem;
        font-size: .28rem;
        border: 0.01rem solid #008EFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .counter-prve {
        background: #FFF;
        color: #008EFF;
    }
    
    .counter-next {
        color: #FFF;
        background: #008EFF;
    }
    /*运费*/
    
    .distribution-msg {
        width: 120px;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding: 5px 0;
    }
    
    .distribution-msg>span {
        display: flex;
        align-items: center;
        flex: 1 1 auto;
        color: #F2F2F2;
    }
    
    .distribution-pay {
        font-size: .32rem;
        font-weight: 800;
    }
    
    @keyframes productionEnlarge {
        from {
            width: 10vw;
            height: 10vw;
            left: 40vw;
            top: -50%;
        }
        to {
            width: 64vw;
            height: 64vw;
            left: 18vw;
            top: -70%;
        }
    }
    
    .sv-ri-attr {
        width: 76px;
        height: .42rem;
        text-align: center;
        line-height: .42rem;
        background: #0387FF;
        color: #FFF;
        font-size: .2rem;
        border-radius: .18rem;
    }
</style>