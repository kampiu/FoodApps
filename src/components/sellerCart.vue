<template>
    <div class="seller-cart-view" :style="{display: show ? 'block' : 'none'}">
        <div class="seller-put-mask" @click="toggle" data-flag="true"></div>
        <div :class="show ? 'putShow seller-cart-content' : 'seller-cart-content'">
            <div class="seller-cart-content-header">商品列表</div>
            <ul class="seller-cart-list">
                <li v-for="(item, index) in cartList[sellerInfo.sel_ele_id]" :key="item.pro_id + item.pro_select" v-if="item.pro_num > 0">
                    <div class="seller-cart-item-by-name font-break">{{item.pro_name}}</div>
                    <div class="seller-cart-item-by-num">
                        {{'￥' + ((parseFloat(item.pro_num) * parseFloat(item.pro_price)).toFixed(2))}}
                    <div class="seller-cart-item-by-attr" v-if="item.pro_select">
                        [
                            <span v-for="(_item, _index) in item.pro_select">{{_index == 0 ? _item : ',' + _item}}</span>
                        ]
                    </div>
                    </div>
                    <div class="seller-cart-item-by-counter">
                        <div class="sv-ri-counter">
                            <div class="counter-prve" :data-index="index" @click="removeCountCart">-</div>
                            <div class="counter-num">
                                {{item.pro_num}}
                            </div>
                            <div class="counter-next" :data-index="index" @click="addCountToCart">+</div>
                        </div>
                    </div>
                </li>
            </ul>
            <seller-bar :sellerInfo="sellerInfo" @toggleCart="toggle" :cartCount="cartCount[sellerInfo.sel_ele_id]"></seller-bar>
            <div v-for="ball in balls">
                <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<style>
</style>

<script>
    import sellerBar from "@/components/sellerBar"
    
    export default {
        props: ["show", "cartList", "sellerInfo", "cartCount", "cartPay","sellerList"],
        data() {
            return {
                balls: [{
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }],
                dropBalls: []
            }
        },
        components: {
            sellerBar
        },
        created() {

        },
        methods: {
            addCountToCart(event) {
                this.cartList[this.sellerInfo.sel_ele_id][event.target.dataset.index].pro_num++
                    this.drop(event.target)
                let data = {
                    seller: this.sellerInfo.sel_ele_id,
                    order: this.cartList[this.sellerInfo.sel_ele_id][event.target.dataset.index]
                }
                this.$store.commit("cart/addOrder", data)
                this.$emit("initSellerList", data.order)
            },
            removeCountCart(event) {
                this.cartList[this.sellerInfo.sel_ele_id][event.target.dataset.index].pro_num--
                let data = {
                    seller: this.sellerInfo.sel_ele_id,
                    order: this.cartList[this.sellerInfo.sel_ele_id][event.target.dataset.index]
                }
                this.$store.commit("cart/removeOrder", data)
                this.$emit("initSellerList", data.order)
            },
            toggle(e) {
                this.$emit("toggle")
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
            }
        },
        filters: {
            moneyForm(val) {
                return parseFloat(val).toFixed(2)
            }
        }
    }
</script>

<style>
    .seller-cart-view {
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        bottom: 0;
        background: none;
        z-index: 700;
    }
    
    .seller-cart-view .sv-ri-counter {
        margin-right: 15px;
    }
    
    .seller-put-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10;
        background: rgba(0, 0, 0, 0.7);
        animation-name: maskShow;
        animation-duration: .2s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in;
    }
    
    .seller-cart-content {
        width: 100%;
        height: 100vw;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 20;
        background: #FFF;
    }
    
    .seller-cart-content-header {
        width: 100%;
        height: 44px;
        line-height: 43px;
        font-size: .28rem;
        font-weight: 700;
        padding: 0 12px;
        border-bottom: 1px solid #EEEFF0;
    }
    
    .seller-cart-list {
        width: 100%;
        height: calc(100vw - 94px);
        overflow-y: scroll;
        padding: 0 0 0 16px;
    }
    
    .seller-cart-list>li {
        width: 100%;
        height: 48px;
        display: flex;
        align-items: baseline;
        line-height: 48px;
        justify-content: space-between;
        border-bottom: 1px solid #F6F6F6;
        overflow: hidden;
    }
    
    .seller-cart-item-by-name {
        font-size: .26rem;
        color: #333;
        font-weight: 600;
        max-width: 60vw;
        overflow: hidden;
    }
    
    .seller-cart-item-by-num {
        margin-right: auto;
        margin-left: 6px;
        color: #C6C6C6;
        font-size: .22rem;
        display:flex;
    }
    
    .seller-cart-item-by-attr{
        font-size: 12px;
        color:#9C9C9C;
        margin-left:6px;
    }
    .seller-cart-item-by-attr span{
        margin:0 2px;
    }
    .seller-cart-item-by-counter{
        flex:0 0 auto;
    }
    
    .putShow {
        animation-name: putInfo;
        animation-duration: .2s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
    
    @keyframes putInfo {
        from {
            bottom: -60vw;
        }
        to {
            bottom: 0px;
        }
    }
    .seller-cart-view .seller-pay-bar{
        position:fixed;
        left:0;
        bottom:0;
        z-index: 1200;
    }
</style>