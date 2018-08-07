<template>
    <div class="orderinfo-view">
        <div class="map-view" id="container"></div>
        <div class="seller-back orderinfo-back" @click="backTo"></div>
        <vue-put-to class="orderinfo-scroll-view" :bottom-load-method="loadmore" :bottom-config="scrollConfigBottom" :top-load-method="refresh" :top-config="scrollConfigTop">
        <div class="orderinfo-context">
            <div class="orderinfo-sellerbox">
                <router-link :to="'/seller/' + sellerInfo.id + '/home'"><div class="orderinfo-seller-icon" :style="{backgroundImage: 'url(' + sellerInfo.icon + ')'}"></div></router-link>
                <div class="orderinfo-seller-msg">
                    <div class="orderinfo-seller-name">{{sellerInfo.sellerName}}
                        <span>{{orderInfo.orderState == 1 ? '商家已接单' : orderInfo.orderState == 2 ? '订单完成' : '订单已退款'}}</span>
                    </div>
                    <div class="orderinfo-seller-tell">商家电话: {{sellerInfo.tell | tellForm}}</div>
                    <div class="orderinfo-seller-ordertime">配送时间大约为: <span>{{sellerInfo.leadTime}}</span>分钟</div>
                </div>
            </div>
            <div class="orderinfo-setting-box" v-if="orderInfo.type == 1">
                <div class="orderinfo-setting-btn" @click="refundOrder">退款</div>
                <div class="orderinfo-setting-btn" @click="finishOrder">已送达</div>
            </div>
            <div class="orderinfo-orderbox">
                <div class="order-item-by-list" v-for="(item, index) in orderData" :key="'oiByL' + item.id + orderInfo.orderCode + item.attr">
                    <div class="order-item-by-list-img">
                        <div :style="{backgroundImage:'url(' + item.icon + ')'}"></div>
                    </div>
                    <div class="order-item-by-list-context">
                        <div class="font-break" style="display:flex;justify-content: space-between;">{{item.name}}<span>￥{{item.price}}</span></div>
                        <div>
                            <div class="order-item-by-list-attr">
                                <span v-for="(_item, _index) in item.attr" :key="'oiByI' + item.id + orderInfo.orderCode + _item">{{_item}}</span>
                            </div>
                            <span style="color:#333">x{{item.num}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="orderinfo-box-info">
                <div class="orderinfo-box-info-title">配送信息</div>
                <div class="orderinfo-box-info-item">配送费:<span>￥{{sellerInfo.distribution}}</span></div>
                <div class="orderinfo-box-info-item">总费用:<span>￥{{orderInfo.orderPrice}}</span></div>
                <div class="orderinfo-box-info-item">配送服务:<span>神秘快送</span></div>
                <div class="orderinfo-box-info-item">顾客姓名:<span>{{addressInfo.adr_consignee}} {{addressInfo.adr_caller == 0 ? ' 小姐' : ' 先森'}}</span></div>
                <div class="orderinfo-box-info-item">联系电话:<span>{{addressInfo.adr_tell | tellForm}}</span></div>
                <div class="orderinfo-box-info-item">配送地址:<span>{{addressInfo.adr_location}}{{addressInfo.adr_info}}</span></div>
            </div>
            <div class="orderinfo-box-info">
                <div class="orderinfo-box-info-title">订单信息</div>
                <div class="orderinfo-box-info-item">订单号码:<span>{{orderInfo.orderCode}}</span></div>
                <div class="orderinfo-box-info-item">下单时间:<span>{{orderInfo.orderAddtime | timeForm}}</span></div>
                <div class="orderinfo-box-info-item">支付方式:<span>在线支付</span></div>
            </div>
        </div>
        </vue-put-to>
    </div>
</template>
<style>
    .orderinfo-scroll-view{
        position:fixed;
        left:0;
        top:30vh;
        z-index: 8000;
        width:100%;
        height:70vh !important;
    }
</style>
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
                    pullText: '',
                    triggerText: '',
                    loadingText: '',
                    doneText: '加载完成',
                    failText: '加载失败',
                    loadedStayTime: 400,
                    stayDistance: 50,
                    triggerDistance: 50
                },
                Map: null,
                sellerInfo: {
                    tell:""
                },
                orderData: [],
                orderInfo: {},
                addressInfo:{
                    adr_tell:""
                }
            }
        },
        components: {
            vuePutTo
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                vm.initData()
            })
        },
        mounted() {
            
        },
        created() {

        },
        methods: {
            loadmore(){
                
            },
            refresh(){
                
            },
            initData() {
                for(let item of this.orderList) {
                    if(item.orderCode == this.$route.params.id) {
                        let {
                            seller,
                            order,
                            address,
                            ...orderInfo
                        } = item
                        this.orderInfo = orderInfo
                        this.sellerInfo = seller
                        this.orderData = order
                        this.addressInfo = address
                        this.initMap()
                        return
                    }
                }
            },
            initMap() {
                this.Map = new BMap.Map("container")
                let point = new BMap.Point(this.sellerInfo.longitude, this.sellerInfo.latitude)
                this.Map.centerAndZoom(point, 14)
                this.Map.enableScrollWheelZoom(true)
                let mySquare = new SquareOverlay(this.Map.getCenter(), 48, this.sellerInfo.icon);
                this.Map.addOverlay(mySquare)
            },
            backTo() {
                this.$router.push({
                    path: 'home'
                })
            },
            finishOrder(e) {
                this.$store.commit("order/finishOrder", this.orderInfo.orderId)
                this.$router.push({
                    name: 'orderComplete'
                })
            },
            refundOrder(e) {
                this.$store.commit("order/refundOrder", this.orderInfo.orderId)
                this.$router.push({
                    name: 'orderRefund'
                })
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
            },
            tellForm(val){
                let arr = val.split(" "),tell = ""
                switch(arr[0].length) {
                    case 8:
                        tell = arr[0].replace(/(\d{3})\d{2}(\d{3})/, '$1****$2')
                        break
                    case 10:
                        tell = arr[0].replace(/(\d{3})\d{4}(\d{3})/, '$1****$2')
                        break
                    case 11:
                        tell = arr[0].replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
                        break
                    case 12:
                        tell = arr[0].replace(/(\d{3})\d{5}(\d{4})/, '$1****$2')
                        break
                    case 13:
                        tell = arr[0].replace(/(\d{5})\d{4}(\d{4})/, '$1****$2')
                        break
                    default:
                        tell = arr[0].replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
                        break
                }
                return tell
            }
        },
        beforeDestroy() {

        }
    }

    let SquareOverlay = (center, length, color) => {
        this._center = center;
        this._length = length;
        this._img = color;
    }
    SquareOverlay.prototype = new BMap.Overlay()
    SquareOverlay.prototype.initialize = map => {
        this._map = map
        let div = document.createElement("div")
        div.style.position = "absolute"
        div.style.width = this._length + "px"
        div.style.height = this._length + "px"
        div.style.backgroundImage = "url('" + this._img + "')"
        div.className = "order-map-seller-icon"
        map.getPanes().markerPane.appendChild(div)
        this._div = div
        return div;
    }
    SquareOverlay.prototype.draw = () => {
        let position = this._map.pointToOverlayPixel(this._center);
        this._div.style.left = position.x - this._length / 2 + "px";
        this._div.style.top = position.y - this._length / 2 + "px";
    }
</script>
<style>

</style>