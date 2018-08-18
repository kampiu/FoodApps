<template>
    <transition name="all-view-overlay">
        <div class="order-confirm-view">
            <div class="order-header-title">
                <div class="seller-back" @click="backTo"></div>
                确认订单
            </div>
            <div class="order-info-mask">
            </div>
            <div class="orderinfo-view-context">
                <div class="order-address">
                    <router-link to="/address" class="address-box-not" v-if="!notAdr">+ 添加收货地址</router-link>
                    <div class="address-box" v-if="notAdr">
                        <div class="adr-location">{{seltAdr ? seltAdr.adr_location : ''}} {{seltAdr ? seltAdr.adr_info : ''}}</div>
                        <div class="adr-consignee">收货人:{{seltAdr ? seltAdr.adr_consignee : ''}} <span>{{seltAdr ? seltAdr.adr_tell : ''}}</span></div>
                        <div class="adr-btn" @click="toSelectAdr"></div>
                    </div>
                    <div class="orderinfo-time">立即送出<span>大约{{orderData.seller.leadTime ? orderData.seller.leadTime : '30'}}分钟时间送达</span></div>
                </div>
                <div class="orderinfo-list">
                    <div class="order-info-seller">{{orderData.seller.sellerName}}</div>
                    <div class="order-item-by-list" v-for="(item, index) in orderData.order" :key="item.id + item.attr + 'coi'">
                        <div class="order-item-by-list-img">
                            <div :style="{backgroundImage:'url(' + item.icon + ')'}"></div>
                        </div>
                        <div class="order-item-by-list-context">
                            <div class="font-break" style="display:flex;justify-content: space-between;">{{item.name}}<span>￥{{item.price}}</span></div>
                            <div>
                                <div class="order-item-by-list-attr">
                                    <span v-for="(_it, _in) in item.attr">{{_it}}</span>
                                </div>
                                <span style="color:#333">x{{item.num}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="order-context-item">包装费<span>￥0</span></div>
                    <div class="order-context-item">配送费<span>￥{{orderData.seller.distribution}}</span></div>
                </div>
                <div class="order-bar">
                    <div class="order-bar-info">已优惠0元<span>合计:￥{{orderData.orderPrice}}</span></div>
                    <div class="order-bar-nav" @click="addOrder">确认订单</div>
                </div>
            </div>
            <address-put :data="userAddress" :show="isShowAdrList" @toSelectAdr="toSelectAdr" @selectAddress="selectAddress"></address-put>
        </div>
    </transition>
</template>

<script>
    import addressPut from '@/components/addressPut'
    import api from '@/common/api'
    import { Toast } from 'vant'
    import {
        mapMutations,
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                notAdr: false,
                isShowAdrList: false,
                seltAdr: {},
                orderData: {
                    seller: {
                        leadTime: ""
                    }
                }
            }
        },
        components: {
            addressPut
        },
        mounted() {

        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                if(to.params.id) {
                    vm.initOrderData()
                } else {
                    vm.$router.replace(from.path)
                }
            })
        },
        methods: {
            initOrderData() {
                this.seltAdr = this.userAddress[0] ? this.userAddress[0] : {}
                for(let i = 0, len = this.orderList.length; i < len; i++) {
                    if(this.orderList[i].orderCode == this.$route.params.id) {
                        this.orderData = this.orderList[i]
                        return
                    }
                }
                alert("订单不存在!")
                this.$router.replace("/home")
            },
            selectAddress(data) {
                this.seltAdr = this.userAddress[data.index]
                this.isShowAdrList = false
            },
            addOrder() {
                let order = []
                this.orderData.order.forEach((item, index) => {
                    order.push({
                        id: item.id,
                        num: item.num,
                        attr: item.attr ? item.attr : ''
                    })
                })
                let formData = {
                    shopId: this.orderData.seller.id,
                    adrId: this.seltAdr.adr_id,
                    order: order
                }
                this.$ajax.post(api.addOrder(), formData).then(res => {
                    if(res.code === 200) {
                        Toast({
                            message: '提交订单成功!',
                            duration: 1000
                        })
                        this.$store.dispatch("order/initNewOrder", {
                            order: res.result,
                            oldId: this.orderData.orderCode
                        })
                        this.$router.replace("/order/home")
                    } else {
                        Toast({
                            message: '订单提交失败!',
                            duration: 1000
                        })
                    }
                }).catch(err => {
                    Toast({
                        message: "服务器错误",
                        duration: 1000
                    })
                })
            },
            getAddress() {
                if(this.userAddress.length > 0) {
                    this.notAdr = true
                    return
                }
                this.$ajax.get(api.getAddress()).then(res => {
                    this.notAdr = res.data.length === 0 ? false : true
                    this.seltAdr = this.userAddress[0] ? this.userAddress[0] : {}
                    res.code === 200 && this.$store.commit("address/initAdrList", res.data)
                    res.code === 200 && Toast({
                        message: '提交订单成功!',
                        duration: 1000
                    })
                }).catch(err => {
                    Toast({
                        message: '获取地址列表失败!',
                        duration: 1000
                    })
                })
            },
            toSelectAdr() {
                this.isShowAdrList = !this.isShowAdrList
            },
            backTo() {
                window.history.go(-1)
            }
        },
        activated() {
            this.getAddress()
        },
        computed: {
            ...mapGetters([
                'userAddress',
                'createOrder',
                'sellerInfo',
                'orderList'
            ])
        }
    }
</script>

<style>
    .order-confirm-view {
        background: #F4F4F4;
        padding-bottom: 50px;
        position: relative;
    }
    
    .order-confirm-view .order-header-title {
        background: #0387FF;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 300;
    }
    
    .order-info-mask {
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#0387FF), to(rgba(42, 42, 42, 0)));
        z-index: 100;
        position: absolute;
        left: 0;
        top: 50px;
        width: 100vw;
        height: 400px;
    }
    
    .orderinfo-view-context {
        background: none;
        width: 100vw;
        height: calc(100vh - 50px);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 200;
        padding-top: 50px;
        overflow-y: scroll;
    }
    
    .order-address {
        width: 92vw;
        margin: 10px auto;
        height: 116px;
        display: flex;
        flex-direction: column;
        background: #FFF;
    }
    
    .address-box {
        width: 100%;
        height: 78px;
        display: flex;
        padding: 5px 16px 5px 0;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        position: relative;
    }
    
    .adr-btn {
        width: 26px;
        height: 78px;
        position: absolute;
        right: 0;
        top: 0;
        background-size: 20px auto;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url("../../assets/right_icon.png");
    }
    
    .orderinfo-time {
        width: 100%;
        height: 38px;
        border-top: 1px solid #F0F0F0;
        display: flex;
        align-items: center;
        padding: 0 10px;
        justify-content: space-between;
        font-weight: 550;
        color: #333;
    }
    
    .orderinfo-time span {
        color: #007AFF;
    }
    
    .adr-location {
        width: 100%;
        max-height: 40px;
        line-height: 20px;
        padding: 0 12px;
        overflow: hidden;
        font-size: 14px;
        color: #363636;
        font-weight: 550;
    }
    
    .adr-consignee,
    .adr-tell {
        line-height: 22px;
        padding: 0 12px;
        color: #363636;
        font-weight: 550;
    }
    
    .address-box-not {
        width: 80vw;
        height: 38px;
        color: #FFF;
        font-weight: 550;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px auto;
        background: #007AFF;
    }
    
    .orderinfo-list {
        width: 92vw;
        margin: 10px auto;
        overflow: hidden;
        background: #FFF;
        padding: 5px 10px;
    }
    
    .orderinfo-list>.order-item-by-list {
        margin: 2px 0;
    }
    
    .order-info-seller {
        width: 100%;
        height: 30px;
        border-bottom: 1px solid #F0F0F0;
        line-height: 30px;
        font-weight: 550;
    }
    
    .order-context-item {
        width: 100%;
        height: 32px;
        border-bottom: 1px solid #F0F0F0;
        line-height: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 10px;
    }
    
    .order-context-item:last-child {
        border: none
    }
    
    .order-bar {
        width: 100%;
        height: 50px;
        display: flex;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 200;
    }
    
    .order-bar>div,
    .order-bar>div span {
        font-weight: 600;
        font-size: 14px;
        height: 50px;
        line-height: 50px;
    }
    
    .order-bar-info {
        width: 70%;
        background: #333333;
        color: #FFF;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
    }
    
    .order-bar-nav {
        height: 50px;
        width: 30%;
        background: #0387FF;
        color: #FFFFFF;
        text-align: center;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
    }
</style>