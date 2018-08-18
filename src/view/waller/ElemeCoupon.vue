<template>
    <div class="personal-view">
        <div class="order-header-title">
            <div class="seller-back orderinfo-back" @click="toHome"></div>
            优惠券
        </div>
        <vue-put-to class="order-view-scroll" :bottom-load-method="loadmore" :bottom-config="scrollConfigBottom" :top-load-method="refresh" :top-config="scrollConfigTop">
            <div class="stamp" v-for="(item, index) in coupon" :key="item.id + 'coupon'">
                <div class="par">
                    <p>{{item.name}}</p><sub class="sign">￥</sub><span>{{item.dist}}.00</span><sub>优惠券</sub>
                    <p>订单满{{item.order}}.00元</p>
                </div>
                <div class="copy">副券
                    <p><span>领券时间:</span> {{item.start_time}}<br><span>到期时间:</span> {{item.end_time}}</p>
                </div>
                <i></i>
            </div>
        </vue-put-to>
    </div>
</template>

<script>
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
                    pullText: '',
                    triggerText: '',
                    loadingText: '',
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
                coupon: [{
                    id: "0101010101001",
                    name: "悦乐堡",
                    dist: "50",
                    order: "200",
                    start_time: "2018-08-06",
                    end_time: "2018-08-07"
                }, {
                    id: "0101010656131",
                    name: "清源寿司",
                    dist: "20",
                    order: "100",
                    start_time: "2018-06-01",
                    end_time: "2018-06-30"
                }, {
                    id: "0101010321215",
                    name: "凯撒披萨",
                    dist: "28",
                    order: "120",
                    start_time: "2018-08-06",
                    end_time: "2018-08-07"
                }, {
                    id: "01010101312315",
                    name: "柳州螺蛳粉(北亭店)",
                    dist: "10",
                    order: "120",
                    start_time: "2018-08-06",
                    end_time: "2018-08-07"
                }, {
                    id: "01010101010246",
                    name: "广州麦当劳北亭广场得来速餐厅",
                    dist: "28",
                    order: "160",
                    start_time: "2018-07-01",
                    end_time: "2018-07-07"
                }, {
                    id: "0101010101225",
                    name: "肯德基宅急送（大学城店）",
                    dist: "30",
                    order: "120",
                    start_time: "2018-06-08",
                    end_time: "2018-06-08"
                }]
            }
        },
        components: {
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
            toHome() {
                this.$router.replace("/personal")
            }
        },
        filters: {

        }
    }
</script>

<style>
    .personal-view .order-view-scroll{
        height:100vh !important;
    }
    .stamp {
        min-width: 300px;
        max-width: 96vw;
        height: auto;
        padding: 0 10px;
        margin: 10px auto;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        background: #F39B00;
        background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 4px, #50ADD3 4px);
        background-size: 15px 15px;
        background-position: 9px 3px;
    }
    
    .stamp:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 10px;
        right: 10px;
        z-index: -1;
        background-color: #50ADD3;
    }
    
    .stamp:after {
        content: '';
        position: absolute;
        left: 10px;
        top: 10px;
        right: 10px;
        bottom: 10px;
        z-index: -2;
    }
    
    .stamp i {
        position: absolute;
        left: 20%;
        top: 45px;
        height: 190px;
        width: 390px;
        background-color: rgba(255, 255, 255, .15);
        transform: rotate(-30deg);
    }
    
    .stamp .par {
        float: left;
        padding: 6px 15px;
        width: 220px;
        border-right: 2px dashed rgba(255, 255, 255, .3);
        text-align: left;
        flex: 0 0 auto;
    }
    
    .stamp .par p {
        color: #fff;
        font-size: 14px;
        line-height: 30px;
    }
    
    .stamp .par span {
        font-size: 40px;
        color: #fff;
        margin-right: 5px;
        line-height: 48px;
    }
    
    .stamp .par .sign {
        font-size: 34px;
    }
    
    .stamp .par sub {
        position: relative;
        top: -5px;
        color: rgba(255, 255, 255, .8);
    }
    
    .stamp .copy {
        display: inline-block;
        padding: 10px 2px;
        width: 100px;
        flex: 1 1 auto;
        vertical-align: text-bottom;
        font-size: 26px;
        color: rgb(255, 255, 255);
        text-align: center;
        line-height: initial;
    }
    
    .stamp .copy p {
        font-size: 12px;
        margin-top: 15px;
    }
</style>