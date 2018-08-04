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
                if(this.token === '') return
                if(this.cartPay[this.sellerInfo.sel_ele_id] > parseFloat(this.sellerInfo.sel_min_distribution)) {
                    let tel = this.tellCheck(this.sellerInfo.sel_tell)
                    let data = {
                        sellerInfo: {
                            id: this.sellerInfo.sel_ele_id,
                            sellerName: this.sellerInfo.sel_name,
                            latitude: this.sellerInfo.sel_latitude,
                            longitude: this.sellerInfo.sel_longitude,
                            tell: tel ||this.sellerInfo.sel_tell,
                            distribution: this.sellerInfo.sel_distribution,
                            address: this.sellerInfo.sel_address,
                            icon: this.sellerInfo.sel_icon,
                            leadTime: this.sellerInfo.sel_order_lead_time,
                            like: this.sellerInfo.sel_rating,
                            orderCount: this.sellerInfo.sel_order_count
                        },
                        price: (parseFloat(this.sellerInfo.sel_distribution) + parseFloat(this.cartPay[this.sellerInfo.sel_ele_id])).toFixed(2),
                        order: this.cartList[this.sellerInfo.sel_ele_id]
                    }
                    console.log(data)
//                  this.$store.commit("addOrder", data)
                    this.$store.commit("order/initCreate", data)
//                  this.$router.push({
//                      path: '/order'
//                  })
                    this.$router.replace("/orderConfirm")
                }
            },
            tellCheck(tel) {
                let arr = tel.split(" "),tell = ""
                switch(arr[0].length) {
                    case 8: tell = arr[0].replace(/(\d{3})\d{2}(\d{3})/,'$1****$2')
                        break
                    case 10:tell = arr[0].replace(/(\d{3})\d{4}(\d{3})/,'$1****$2')
                        break
                    case 11:tell = arr[0].replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')
                        break
                    case 12:tell = arr[0].replace(/(\d{3})\d{5}(\d{4})/,'$1****$2')
                        break
                    case 13:tell = arr[0].replace(/(\d{5})\d{4}(\d{4})/,'$1****$2')
                        break
                    default:tell = arr[0].replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')
                        break
                }
                return tell
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
</script>

<style>

</style>