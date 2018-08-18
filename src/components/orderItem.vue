<template>
    <div class="order-item">
        <div class="order-selicon">
            <router-link :to="'/seller/' + item.seller.id + '/home'"><div :style="{backgroundImage: 'url(' + item.seller.icon + ')'}"></div></router-link>
        </div>
        <div class="order-context">
            <div class="order-selname">{{item.seller.sellerName}}<span>{{item.orderState == 1 ? '商家已接单' : item.orderState == 2 ? '订单完成' : '退款'}}</span></div>
            <div class="order-time">{{item.orderAddtime | timeForm}}</div>
            <router-link :to="{name:'orderInfo',params: { id:item.orderCode}}" class="order-info-list">
                <div class="order-info-item" v-for="(_item, _index) in item.order" :key="_item.id + item.orderAddtime + _item.attr">
                    <div>{{_item.name}}
                        <span v-for="(_item_, _index_) in _item.attr" :key="item.orderAddtime + _item_">{{_item_}}</span>
                    </div>
                    <span>x{{_item.num}}</span>
                </div>
            </router-link>
            <div class="order-info-price">￥{{item.orderPrice}}</div>
            <div class="order-item-operation" v-if="item.orderState == 1">
                <div :data-id="item.orderCode" @click="refundOrder">退款</div>
                <div :data-id="item.orderCode" @click="finishOrder">确认订单</div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/common/api'
    import { Toast } from 'vant'
    
    export default {
        props:["item"],
        data() {
            return {

            }
        },
        components: {

        },
        created() {

        },
        methods: {
            finishOrder(e) {
                this.$ajax.post(api.updateOrder(),{id:e.target.dataset.id,state:2}).then(res => {
                    res.code === 200 && this.$store.commit("order/finishOrder", e.target.dataset.id)
                    res.code === 200 && Toast({message: '订单完成', duration: 1000})
                }).catch(err => {
                    Toast({message: '更该订单状态失败!', duration: 1000})
                })
            },
            refundOrder(e) {
                this.$ajax.post(api.updateOrder(),{id:e.target.dataset.id,state:3}).then(res => {
                    res.code === 200 && this.$store.commit("order/refundOrder", e.target.dataset.id)
                    res.code === 200 && Toast({message: '订单退款', duration: 1000})
                }).catch(err => {
                    Toast({message: '更该订单状态失败!', duration: 1000})
                })
            }
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

</style>