<template>
    <div class="seller-pay-bar">
        <div :class="cartCount && cartCount > 0 ? 'seller-shopcart seller-shopcart-enable' : 'seller-shopcart seller-shopcart-disable'" @click="toggleCart">
            <span>{{cartCount ? cartCount : 0}}</span>
        </div>
        <div class="distribution-msg">
            <span :style="{display: cartPay[sellerInfo.sel_ele_id] && parseFloat(cartPay[sellerInfo.sel_ele_id]) > 0 ? 'flex' : 'none'}" class="distribution-pay">￥{{cartPay[sellerInfo.sel_ele_id] | moneyForm}}</span>
            <span>配送费￥{{sellerInfo.sel_distribution}}</span>
        </div>
        <div :class="cartPay[sellerInfo.sel_ele_id] && parseFloat(cartPay[sellerInfo.sel_ele_id]) >= parseFloat(sellerInfo.sel_min_distribution) ? 'seller-pay seller-pay-enable' : 'seller-pay seller-pay-disable'" @click="addOrder">
            {{cartPay[sellerInfo.sel_ele_id] && parseFloat(cartPay[sellerInfo.sel_ele_id]) > 0 ? (parseFloat(cartPay[sellerInfo.sel_ele_id]) >= parseFloat(sellerInfo.sel_min_distribution) ? '去结算' : '差￥' + (sellerInfo.sel_min_distribution - cartPay[sellerInfo.sel_ele_id]) + '起送') : (sellerInfo.sel_min_distribution ? '￥' + sellerInfo.sel_min_distribution + '元起送' : '')}}
        </div>
    </div>
</template>

<script>
    import store from '@/store/store'
    import {
        mapMutations,
        mapGetters
    } from 'vuex'

    export default {
        props: ["sellerInfo", "cartCount"],
        data() {
            return {

            }
        },
        components: {

        },
        created() {

        },
        methods: {
            toggleCart() {
                this.$emit("toggleCart")
            },
            addOrder() {
                console.log(this.cartCount, this)
                if(this.token === '') return
                //下单，store处理商品数据
                if(this.cartPay[this.sellerInfo.sel_ele_id] > parseFloat(this.sellerInfo.sel_min_distribution)) {
//                  let tel = this.tellCheck(this.sellerInfo.sel_tell)
                    let data = {
                        seller: {                   //订单商家信息
                            id: this.sellerInfo.sel_ele_id,
                            sellerName: this.sellerInfo.sel_name,
                            latitude: this.sellerInfo.sel_latitude,
                            longitude: this.sellerInfo.sel_longitude,
                            tell:(this.sellerInfo.sel_tell.split(" "))[0],
                            distribution: this.sellerInfo.sel_distribution,
                            address: this.sellerInfo.sel_address,
                            icon: this.sellerInfo.sel_icon,
                            leadTime: this.sellerInfo.sel_order_lead_time,
                            like: this.sellerInfo.sel_rating,
                            orderCount: this.sellerInfo.sel_order_count
                        },
                        order: this.cartList[this.sellerInfo.sel_ele_id],       //订单商品
                        orderState: 1,
                        orderCount: this.cartCount[this.sellerInfo.sel_ele_id],
                        orderAddtime: new Date().getTime(),
                        orderPrice: (parseFloat(this.sellerInfo.sel_distribution) + parseFloat(this.cartPay[this.sellerInfo.sel_ele_id])).toFixed(2),
                        orderCode: this.getOrderCode()
                    }
                    console.log(data)
                    this.$store.commit("addOrder", data)
                    this.$store.commit("order/initCreate", data)
                    this.$router.push({
                        path: '/orderConfirm/' + data.orderCode
                    })
//                  this.$router.replace("/orderConfirm/" + data.orderId)
                }
            },
            tellCheck(tel) {
                let arr = tel.split(" "),
                    tell = ""
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
            },
            getOrderCode() {
                return new Date().getTime() + this.getRandNumber()
            },
            getRandNumber() {
                let len = 5,
                    str = "0123456789",
                    result = ""
                while(len--) {
                    result += str[this.rand(0, str.length - 1)]
                }
                return result
            },
            rand(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min
            }
        },
        computed: {
            ...mapGetters([
                'cartList',
                'cartPay',
                'token'
            ])
        },
        filters: {
            moneyForm(val) {
                return parseFloat(val).toFixed(2)
            }
        }
    }

    const getOrderCode = () => {
        return new Date().getTime() + getRandNumber()
    }

    const getRandNumber = () => {
        let len = 5,
            str = "0123456789",
            result = ""
        while(len--) {
            result += str[rand(0, str.length - 1)]
        }
        return result
    }

    const rand = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
</script>

<style>

</style>