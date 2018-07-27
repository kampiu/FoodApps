<template>
    <div class="order-item">
        <div class="order-selicon">
            <div :style="{backgroundImage: 'url(' + item.sellerInfo.icon + ')'}"></div>
        </div>
        <div class="order-context">
            <div class="order-selname">{{item.sellerInfo.sellerName}}<span>{{item.type == 1 ? '商家已接单' : item.type == 2 ? '订单完成' : '退款'}}</span></div>
            <div class="order-time">{{item.time | timeForm}}</div>
            <router-link :to="{name:'orderInfo',params: { id:item.orderId}}" class="order-info-list">
                <div class="order-info-item" v-for="(_item, _index) in item.order" :key="_item.pro_id + item.time + item.orderId + _item.pro_select">
                    <div>{{_item.pro_name}}
                        <span v-for="(_item_, _index_) in _item.pro_select" :key="item.time + _item_">{{_item_}}</span>
                    </div>
                    <span>x{{_item.pro_num}}</span>
                </div>
            </router-link>
            <div class="order-info-price">￥{{item.price}}</div>
            <div class="order-item-operation" v-if="item.type == 1">
                <div :data-id="item.orderId" @click="refundOrder">退款</div>
                <div :data-id="item.orderId" @click="finishOrder">确认订单</div>
            </div>
        </div>
    </div>
</template>

<script>
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
                this.$store.commit("order/finishOrder", e.target.dataset.id)
            },
            refundOrder(e) {
                this.$store.commit("order/refundOrder", e.target.dataset.id)
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