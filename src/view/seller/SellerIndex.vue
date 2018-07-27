<template>
    <div class="sv-content">
        <div class="sv-left">
            <div :class="cataId == item.cla_ele_id ? 'sv-left-nav-active' : 'sv-left-nav'" v-for="(item, index) in sellerList" :data-id="index" :key="item.cla_seller_id + item.cla_id" @click="moveProduction">{{item.cla_name}}</div>
        </div>
        <div class="sv-right">
            <div class="sv-right-label" v-for="(item, index) in sellerList" :key="item.cla_seller_id + item.cla_id + 'food'">
                <div :class="'sv-right-title sv-right-by' + index">{{item.cla_name}}</div>
                <div class="sv-right-item" v-for="(_item, _index) in item.foodList" :key="_item.pro_id + 'title'">
                    <div class="sv-ri-icon">
                        <div :style="{backgroundImage: 'url(' + _item.pro_icon + ')'}" :data-list="index" :data-id="_index" @click="showInfo"></div>
                    </div>
                    <div class="sv-ri-context">
                        <div class="sv-ri-name font-break">{{_item.pro_name}}</div>
                        <div class="sv-ri-describe font-break">{{_item.pro_describe == 'null' ? _item.pro_name : _item.pro_describe}}</div>
                        <div class="sv-ri-record font-break">月售{{_item.pro_month_sales}} | 赞18</div>
                        <div class="sv-ri-param">
                            <span class="sv-ri-price">￥{{_item.pro_price | moneyForm}} <span style="color:#444">起</span></span>
                            <div :style="{flexDirection: _item.pro_num > 0 ? 'row' : 'row-reverse',display:_item.pro_param.length > 0 ? 'none' : 'flex'}" class="sv-ri-counter">
                                <div :style="{display: _item.pro_num > 0 ? 'flex' : 'none'}" class="counter-prve" :data-list="index" :data-id="_index" @click="removeCount">-</div>
                                <div :style="{display: _item.pro_num > 0 ? 'block' : 'none'}" class="counter-num">{{_item.pro_num}}</div>
                                <div class="counter-next" :data-list="index" :data-id="_index" @click="addCount">+</div>
                            </div>
                            <div class="sv-ri-attr" :style="{display:_item.pro_param.length > 0 ? 'block' : 'none'}" :data-list="index" :data-id="_index" @click="toggleAttr">选择类型</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <seller-bar :sellerInfo="sellerInfo" @toggleCart="toggleCart" :cartCount="cartCount[sellerInfo.sel_ele_id]"></seller-bar>
        <div v-for="ball in balls">
            <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                <div class="ball" v-show="ball.show">
                    <div class="inner inner-hook"></div>
                </div>
            </transition>
        </div>
        <production-param @selectAttr="selectAttr" @addAttrCart="addAttrCart" :data="productionAttr" :show="showAttrBool" @toggle="toggleAttr"></production-param>
        <seller-put :show="showInfoBool" @toggle="toggleInfo" :data="productionInfo"></seller-put>
        <seller-cart :cartCount="cartCount" :cartPay="cartPay" @initSellerList="initSellerList" :cartList="cartList" :sellerList="sellerList" :sellerInfo="sellerInfo" :show="showCartBool" @toggle="toggleCart"></seller-cart>
    </div>
</template>

<script>
    import productionParam from '@/components/productionParam'
    import sellerCart from '@/components/sellerCart'
    import sellerBar from "@/components/sellerBar"
    import sellerPut from '@/components/sellerPut'
    import api from '@/common/api'
    import {
        mapMutations,
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                sellerId: null,
                cataId: null,
                balls: [{
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }],
                dropBalls: [],
                showInfoBool: false,
                showAttrBool: false,
                showCartBool: false,
                productionAttr: {},
                productionInfo: {}
            }
        },
        components: {
            productionParam,
            sellerCart,
            sellerBar,
            sellerPut
        },
        created() {

        },
        methods: {
            showInfo(e) {
                if(!this.showInfoBool) {
                    this.productionInfo = this.sellerList[e.target.dataset.list].foodList[e.target.dataset.id]
                    this.toggleInfo()
                }
            },
            toggleCart(e) {
                this.showCartBool = !this.showCartBool
            },
            toggleAttr(e) {
                this.showAttrBool = !this.showAttrBool
                if(e) {
                    this.productionAttr = this.sellerList[e.target.dataset.list].foodList[e.target.dataset.id]
                }
            },
            initSellerList(data) {
                for(let [i, item] of new Map(this.sellerList.map((item, i) => [i, item]))) {
                    for(let [_i, _item] of new Map(item.foodList.map((item, i) => [i, item]))) {
                        if(_item.pro_id === data.pro_id) {
                            this.sellerList[i].foodList[_i] = data
                            return
                        }
                    }
                }
            },
            toggleInfo() {
                this.showInfoBool = !this.showInfoBool
            },
            selectAttr(index, name) {
                let arr = this.productionAttr
                arr.pro_select[index] = name
                this.productionAttr = Object.assign({}, arr)
            },
            addAttrCart(item) {
                item.pro_num++
                    let data = {
                        seller: this.sellerInfo.sel_ele_id,
                        order: item
                    }
                this.$store.commit("cart/addOrder", data)
            },
            addCount(e) {
                this.sellerList[e.target.dataset.list].foodList[e.target.dataset.id].pro_num++
                    this.drop(event.target)
                let data = {
                    seller: this.sellerInfo.sel_ele_id,
                    order: this.sellerList[e.target.dataset.list].foodList[e.target.dataset.id]
                }
                this.$store.commit("cart/addOrder", data)
            },
            removeCount(e) {
                let obj = Object.assign(this.sellerList[e.target.dataset.list].foodList[e.target.dataset.id], {})
                obj.pro_num--
                    this.$set(this.sellerList[e.target.dataset.list].foodList, e.target.dataset.id, obj)
                let data = {
                    seller: this.sellerInfo.sel_ele_id,
                    order: this.sellerList[e.target.dataset.list].foodList[e.target.dataset.id]
                }
                this.$store.commit("cart/removeOrder", data)
            },
            drop(el) {
                for(let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i]
                    if(!ball.show) {
                        ball.show = true
                        ball.el = el
                        this.dropBalls.push(ball)
                        return
                    }
                }
            },
            beforeDrop(el) {
                let count = this.balls.length
                while(count--) {
                    let ball = this.balls[count]
                    if(ball.show) {
                        let rect = ball.el.getBoundingClientRect()
                        let x = rect.left - 32
                        let y = -(window.innerHeight - rect.top - 22)
                        el.style.display = ''
                        el.style.webkitTransform = 'translateY(' + y + 'px)'
                        el.style.transform = 'translateY(' + y + 'px)'
                        let inner = el.getElementsByClassName('inner-hook')[0]
                        inner.style.webkitTransform = 'translateX(' + x + 'px)'
                        inner.style.transform = 'translateX(' + x + 'px)'
                    }
                }
            },
            dropping(el, done) {
                let rf = el.offsetHeight
                el.style.webkitTransform = 'translate3d(0,0,0)'
                el.style.transform = 'translate3d(0,0,0)'
                let inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.webkitTransform = 'translate3d(0,0,0)'
                inner.style.transform = 'translate3d(0,0,0)'
                el.addEventListener('transitionend', done)
            },
            afterDrop(el) {
                let ball = this.dropBalls.shift()
                if(ball) {
                    ball.show = false
                    el.style.display = 'none'
                }
            },
            moveProduction(e) {
                this.cataId = e.target.dataset.id
                document.getElementsByClassName("sv-right")[0].scrollTop = parseInt(document.getElementsByClassName("sv-right-by" + e.target.dataset.id)[0].offsetTop) - 3.38 * parseInt(document.documentElement.style.fontSize)
            }
        },
        computed: {
            ...mapGetters([
                'cartList',
                'cartCount',
                'cartPay',
                'sellerInfo',
                'sellerList'
            ])
        },
        filters: {
            moneyForm(val) {
                return parseFloat(val).toFixed(2)
            }
        },
        watch: {

        }
    }
</script>

<style>

</style>