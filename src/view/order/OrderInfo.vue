<template>
    <div class="orderinfo-view">
        <div class="map-view" id="container"></div>
        <div class="seller-back orderinfo-back" @click="backTo"></div>
        <div class="orderinfo-context">
            <div class="orderinfo-sellerbox">
                <div class="orderinfo-seller-icon" :style="{backgroundImage: 'url(' + sellerInfo.icon + ')'}"></div>
                <div class="orderinfo-seller-msg">
                    <div class="orderinfo-seller-name">{{sellerInfo.sellerName}}
                        <span>{{orderInfo.type == 1 ? '商家已接单' : orderInfo.type == 2 ? '订单完成' : '订单已退款'}}</span>
                    </div>
                    <div class="orderinfo-seller-tell">商家电话: {{sellerInfo.tell}}</div>
                    <div class="orderinfo-seller-ordertime">配送时间大约为: <span>{{sellerInfo.leadTime}}</span>分钟</div>
                </div>
            </div>
            <div class="orderinfo-setting-box" v-if="orderInfo.type == 1">
                <div class="orderinfo-setting-btn" @click="refundOrder">退款</div>
                <div class="orderinfo-setting-btn" @click="finishOrder">已送达</div>
            </div>
            <div class="orderinfo-orderbox">
                <div class="order-item-by-list" v-for="(item, index) in orderData" :key="'oiByL' + item.pro_id + orderInfo.orderId + item.pro_select">
                    <div class="order-item-by-list-img">
                        <div :style="{backgroundImage:'url(' + item.pro_icon + ')'}"></div>
                    </div>
                    <div class="order-item-by-list-context">
                        <div class="font-break" style="display:flex;justify-content: space-between;">{{item.pro_name}}<span>￥{{item.pro_price}}</span></div>
                        <div>
                            <div class="order-item-by-list-attr">
                                <span v-for="(_item, _index) in item.pro_select" :key="'oiByI' + item.pro_id + orderInfo.orderId + _item">{{_item}}</span>
                            </div>
                            <span style="color:#333">x{{item.pro_num}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="orderinfo-box-info">
                <div class="orderinfo-box-info-title">配送信息</div>
                <div class="orderinfo-box-info-item">配送费:<span>￥{{sellerInfo.distribution}}</span></div>
                <div class="orderinfo-box-info-item">总费用:<span>￥{{orderInfo.price}}</span></div>
                <div class="orderinfo-box-info-item">配送服务:<span>神秘快送</span></div>
                <div class="orderinfo-box-info-item">商家地址:<span>{{sellerInfo.address}}</span></div>
            </div>
            <div class="orderinfo-box-info">
                <div class="orderinfo-box-info-title">订单信息</div>
                <div class="orderinfo-box-info-item">订单号码:<span>{{orderInfo.orderId}}</span></div>
                <div class="orderinfo-box-info-item">下单时间:<span>{{orderInfo.time | timeForm}}</span></div>
                <div class="orderinfo-box-info-item">支付方式:<span>在线支付</span></div>
            </div>
        </div>
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
                Map: null,
                point: {
                    latitude: 23.0528591239614,
                    longitude: 113.372155550906
                },
                sellerInfo: {},
                orderData: [],
                orderInfo: {}
            }
        },
        components: {

        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                for(let item of vm.orderList) {
                    if(item.orderId == to.params.id) {
                        vm.orderInfo = item
                        vm.sellerInfo = item.sellerInfo
                        vm.orderData = item.order
                        break
                    }
                }
                vm.initMap()
            })
        },
        mounted() {
            window.addEventListener('scroll', this.havingScroll)
        },
        created() {

        },
        methods: {
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
            havingScroll() {
                let scrT = document.body.scrollTop || document.documentElement.scrollTop
                if(this.router == "orderInfo") {
                    document.getElementsByClassName("orderinfo-context")[0].style.background = "rgba(244,244,244," + 0.0028 * scrT + ")"
                }
            },
            finishOrder(e) {
                this.$store.commit("order/finishOrder", this.orderInfo.orderId)
                this.$router.push({
//                  path: '/order/complete'
                    name:'orderComplete'
                })
            },
            refundOrder(e) {
                this.$store.commit("order/refundOrder", this.orderInfo.orderId)
                this.$router.push({
//                  path: '/order/refund'
                    name:'orderRefund'
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
            }
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