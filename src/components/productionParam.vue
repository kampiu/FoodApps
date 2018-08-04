<template>
    <div class="seller-put-view" :style="{display: show ? 'block' : 'none'}">
        <div class="seller-put-mask" @click="toggle" data-flag="true"></div>
        <div class="production-attr-context">
            <div class="production-attr-title font-break">{{data.pro_name}}</div>
            <div v-for="(item, index) in data.pro_param" :key="item.name + 'attr-title'">
                <div class="attr-title">{{item.name}}</div>
                <div class="attr-param">
                    <div @click="selectAttr" :data-list="index" :data-param="_item" :class="_item == data.pro_select[index] ? 'attr-item attr-item-active' : 'attr-item'" v-for="(_item, _index) in item.values" :key="_item + 'attr-param'">{{_item}}</div>
                </div>
            </div>
            <div class="attr-footer">
                <span>￥{{data.pro_price}}</span>
                <div class="attr-footer-item" v-for="(item, index) in data.pro_select" :key="item + 'sohwparam'">{{item}}</div>
                <div class="addCart" @click="addCart">加入购物车</div>
            </div>
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
        props: ["data", "show"],
        data() {
            return {

            }
        },
        created() {

        },
        methods: {
            selectAttr(e) {
                this.$emit("selectAttr", e.target.dataset.list, e.target.dataset.param)
            },
            addCart(e) {
                this.$emit("addAttrCart", this.data)
                this.$emit("toggle")
            },
            toggle(e) {
                if(e.target.dataset.flag && e.target.dataset.flag === 'true') {
                    this.$emit("toggle")
                }
            }
        },
        watch: {
            "show" (to, from) {
                if(to && this.data.pro_select.length === 0) {
                    this.data.pro_param.forEach((item, index) => {
                        this.data.pro_select.push(item.values[0])
                    })
                }
            }
        }
    }
</script>

<style>
    .seller-put-view {
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0;
        bottom: 0;
        background: none;
        z-index: 1000;
    }
    
    .seller-put-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        animation-name: maskShow;
        animation-duration: .2s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in;
    }
    
    .production-attr-context {
        width: 70vw;
        min-height: 50vw;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #FFF;
        border-radius: 12px;
        padding: 10px 10px 50px 10px;
        overflow: hidden;
        animation: viewShow 0.5s ease 0s 1;
        z-index: 20;
    }
    
    @keyframes viewShow {
        from {
            transform: translate(-50%, -62%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
    }
    
    .production-attr-title {
        font-size: .24rem;
        color: #333;
        text-align: center;
        line-height: .36rem;
        font-weight: 700;
    }
    
    .attr-title {
        line-height: .8rem;
        font-size: .24rem;
        padding-left: 6px;
        font-size: 600;
    }
    
    .attr-param {
        display: flex;
        flex-wrap: wrap;
    }
    
    .attr-item {
        width: 1.38rem;
        height: .5rem;
        text-align: center;
        line-height: .48rem;
        border: 1px solid #EDEDED;
        background: #FFF;
        color: #333;
        margin: 0 .11rem .15rem;
        overflow: hidden;
    }
    
    .attr-item-active {
        border: 1px solid #3f56ff;
        background: #cfd5ff;
        color: #3f56ff;
    }
    
    .attr-footer {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 44px;
        background: #F5F5F5;
        display: flex;
        padding: 0 10px;
        align-items: center;
    }
    
    .attr-footer span {
        color: #FB554B;
        font-size: .32rem;
        font-weight: 800;
        margin-right: 6px;
    }
    
    .attr-footer .addCart {
        width: 100px;
        height: 28px;
        border-radius: 14px;
        background: #0387FF;
        color: #FFF;
        margin-left: auto;
        line-height: 28px;
        text-align: center;
    }
    
    .attr-footer-item {
        margin-right: 4px;
    }
</style>