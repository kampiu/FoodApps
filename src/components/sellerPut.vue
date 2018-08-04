<template>
    <div class="seller-put-view" :style="{display: show ? 'block' : 'none'}">
        <div class="seller-put-mask" @click="toggle" data-flag="true"></div>
        <div :class="show ? 'putShow seller-put-context' : 'seller-put-context'">
            <img :src="data.pro_icon" alt="" />
            <div class="seller-put-name">{{data.pro_name}}</div>
            <div class="seller-put-describe font-break">{{data.pro_describe !== 'null' ? data.pro_describe : '暂无详情'}}</div>
            <div class="seller-put-sales">月售{{data.pro_month_sales}} | 好评率 100%</div>
            <div class="seller-put-price">￥{{data.pro_price}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["show", "data"],
        data() {
            return {

            }
        },
        components: {

        },
        created() {

        },
        methods: {
            addOrder(e) {

            },
            toggle(e) {
                if(e.target.dataset.flag && e.target.dataset.flag === 'true') {
                    this.$emit("toggle")
                }
            }
        },
        filters: {

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
    
    .seller-put-context {
        position: absolute;
        z-index: 20;
        width: 100%;
        height: 40vh;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #FFF;
        padding: 100px 20px 20px 20px;
    }
    
    .seller-put-context::before {
        content: "";
        width: 200vw;
        height: 200vw;
        background: #FFF;
        position: absolute;
        left: -50vw;
        top: -20%;
        border-radius: 50%;
        z-index: -1;
    }
    
    .seller-put-context > img {
        width: 160px;
        height: 160px;
        position: absolute;
        /*left: 50%;
        top: -50%;*/
            left:50%;
        transform: translateX(-50%);
        background-color:#FBFCFD;
        z-index: 1600;
        border-radius: 6px;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
        z-index: 1200;
        animation-name: productionEnlarge;
        animation-duration: .2s;
        -webkit-animation-fill-mode: forwards;
        -webkit-animation-timing-function: ease-in;
    }
    
    @keyframes productionEnlarge {
        from {
            width: 20px;
            height:20;
            top: -50%;
        }
        to {
            width: 260px;
            height:260px;
            top: -66%;
        }
    }
    
    .seller-put-context>div {
        margin-bottom: 0.1rem;
    }
    
    .seller-put-name {
        font-size: 14px;
        line-height: 20px;
        font-weight: 800;
        color: #333;
    }
    
    .seller-put-describe {
        max-height: 48px;
        font-size: 12px;
        color: #999;
        line-height:24px;
        -webkit-line-clamp: 2;
    }
    
    .seller-put-sales {
        font-size: 12px;
        color: #CCC;
    }
    
    .seller-put-price {
        height: 32px;
        font-size: 18px;
        color: #FB4E44;
        font-weight: 800;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    @keyframes maskShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
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
</style>