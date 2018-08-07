<template>
    <div class="seller-cart-view" :style="{display: show ? 'block' : 'none'}">
        <div class="seller-put-mask" @click="closeView"></div>
        <div :class="show ? 'putShow seller-cart-content' : 'seller-cart-content'">
            <div class="seller-cart-content-header">收货地址选择 <span @click="setAdr">完成</span></div>
            <div class="adr-selput-scroll-view">
                <vue-put-to class="adr-selput-scroll">
                    <label class="adr-selput-item" v-for="(item, index) in data" :key="item.adr_id + 'adrput'">
                        <div class="adr-selput-checkbox">
                            <input :checked="index === 0" name="addressId" class="address-put-item-select" type="radio" :data-id="item.adr_id" />
                        </div>
                        <div class="adr-selput-context">
                            <div class="adr-selput-location font-break">{{item.adr_location}} {{item.adr_info}}</div>
                            <div class="adr-selput-name font-break">{{item.adr_consignee}} <span>{{item.adr_tell}}</span></div>
                        </div>
                        <router-link :to="'/address/edit/' + item.adr_id" class="address-edit"></router-link>
                    </label>
                </vue-put-to>
            </div>
            <div class="to-add-adr-view">
                <router-link to="/address/add">+ 添加收货地址</router-link>
            </div>
        </div>
    </div>
</template>
<style>

</style>

<script>
    import vuePutTo from 'vue-pull-to'

    export default {
        props: ["show","data"],
        data() {
            return {

            }
        },
        components: {
            vuePutTo
        },
        created() {

        },
        methods: {
            closeView(){
                this.$emit("toSelectAdr")
            },
            setAdr(e){
                console.log("safdsdf")
                let p = document.getElementsByClassName("address-put-item-select")
                for(let i = 0,len = p.length;i < len;i++){
                    if(p[i].checked){
                        this.$emit("selectAddress",{index:i,id:p[i].dataset.id})
                        break
                    }
                }
            }
        },
        filters: {

        }
    }
</script>

<style>
    .seller-cart-content-header span{
        float:right;
        color:#0387FF;
        padding:0 6px 0 20px;
    }
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
        height: 380px;
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
        font-size: 14px;
        font-weight: 700;
        padding: 0 12px;
        border-bottom: 1px solid #EEEFF0;
    }
    
    .putShow {
        animation-name: putInfo;
        animation-duration: .2s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
    
    @keyframes putInfo {
        from {
            bottom: -60vh;
        }
        to {
            bottom: 0px;
        }
    }
    
    .adr-selput-scroll-view {
        width: 100%;
        height: 286px;
        overflow: hidden;
    }
    
    .adr-selput-scroll {
        width: 100%;
    }
    
    .to-add-adr-view {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #FBFCFD;
    }
    
    .to-add-adr-view a {
        display: inline-block;
        width: 90vw;
        height: 36px;
        text-align: center;
        line-height: 36px;
        font-weight: 550;
        font-size: 14px;
        color: #333;
    }
    
    .adr-selput-item {
        width: 100%;
        padding: 2px 0 2px 2px;
        height: 50px;
        display: flex;
        align-items: center;
        position: relative;
    }
    
    .adr-selput-item .address-edit {
        height: 46px;
        width:40px;
    }
    
    .adr-selput-checkbox {
        width: 46px;
        height: 46px;
        flex: 0 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .adr-selput-checkbox input[type=radio] {
        width: 20px;
        height: 20px;
        -webkit-appearance: none;
        border: 1px solid #666;
        background: #FFF;
        transition: all linear .1s;
        border-radius: 50%;
        outline: none;
    }
    
    .adr-selput-checkbox input[type=radio]:checked {
        background-size: 100% auto;
        border: none;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url('../assets/checked.png');
    }
    
    .adr-selput-context {
        flex: 1 1 auto;
        height: 46px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        padding: 3px 50px 3px 6px;
        border-bottom: 1px solid #F6F6F6;
    }
    
    .adr-selput-context>div {
        flex: 1 1 auto;
        height: 20px;
        color: #333;
        font-weight: 550;
    }
    
    .adr-selput-location {
        font-size: 13px;
    }
    
    .adr-selput-name span {
        margin-left: 12px;
    }
</style>