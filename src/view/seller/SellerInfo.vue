<template>
    <div>
        <div class="selinfo-item">
            <div class="selinfo-item-name">商家名称:</div>
            <div class="selinfo-item-context">{{sellerInfo.sel_name}}</div>
        </div>
        <div class="selinfo-item">
            <div class="selinfo-item-name">经营类型:</div>
            <div class="selinfo-item-context">{{sellerInfo.sel_business_type | typeForm}}</div>
        </div>
        <div class="selinfo-item">
            <div class="selinfo-item-name">商家电话:</div>
            <div class="selinfo-item-context">{{sellerInfo.sel_tell}}</div>
        </div>
        <div class="selinfo-item">
            <div class="selinfo-item-name">店铺地址:</div>
            <div class="selinfo-item-context">{{sellerInfo.sel_address}}</div>
        </div>
        <div class="selinfo-item">
            <div class="selinfo-item-name">营业时间:</div>
            <div class="selinfo-item-context">{{sellerInfo.sel_opening_hours | timeForm}}</div>
        </div>
    </div>
</template>

<script>
    import {
        mapMutations,
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {

            }
        },
        components: {

        },
        created() {

        },
        methods: {

        },
        computed: {
            ...mapGetters([
                'sellerInfo'
            ])
        },
        filters: {
            typeForm(val){
                return val && val.join(",")
            },
            timeForm(val){
                return val && val.replace("/"," ~ ")
            }
        }
    }
</script>

<style>
    .selinfo-item:nth-child(1){
        margin-top:10px;
    }
    .selinfo-item {
        width: 100%;
        min-height: 46px;
        display: flex;
        padding: 0 16px;
    }
    
    .selinfo-item>div {
        font-size: 14px;
        display: flex;
        align-items: center;
        min-height: 46px;
        height: 100%;
        border-bottom: 1px solid #F6F6F6;
    }
    
    .selinfo-item-name {
        width: 1.6rem;
        max-width: 120px;
        justify-content: flex-start;
        font-weight: 600;
        flex: 0 0 auto;
        color:#333;
    }
    
    .selinfo-item-context {
        min-height: 46px;
        justify-content: flex-end;
        flex: 1 1 auto;
        color:#666;
        padding-left: 20px;
        text-align: right;
    }
</style>