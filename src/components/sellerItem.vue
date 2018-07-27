<template>
    <div class="seller-item">
        <router-link :to="{name:'seller',params: { id:data.sel_ele_id}}">
            <div class="seller-icon" :style="{backgroundImage: 'url(' + data.sel_icon + ')'}"></div>
            <div class="seller-msg">
                <div class="seller-name font-break">{{data.sel_name}}</div>
                <div class="seller-level">
                    <start-view :number="parseInt(data.sel_rating)"></start-view>
                    {{data.sel_rating}} | 月售{{data.sel_order_count}}</div>
                <div class="seller-condition">￥{{data.sel_min_distribution}}起配送 | 配送费￥{{data.sel_distribution}} <span>3.6km | {{data.sel_order_lead_time}}分钟</span></div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import startView from '@/components/startView'
    
    export default {
        props: ["data"],
        data() {
            return {

            }
        },
        components: {
            startView
        },
        created() {

        },
        methods: {
            
        },
        filters: {

        }
    }
</script>

<style>
    .seller-item,.seller-item a {
        width: 100%;
        height: 1.88rem;
        padding: 0.2rem 0.25rem;
        display: flex;
    }
    .seller-item a {
        border-bottom: 1px solid #F6F6F6;
    }
    .seller-icon {
        width: 1.38rem;
        height: 1.38rem;
        overflow: hidden;
        flex: 0 0 auto;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    
    .seller-msg {
        flex: 1 1 auto;
        height: 1.38rem;
        padding-left: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .seller-msg>div {
        width: 100%;
        height: 0.46rem;
        line-height: 0.46rem;
    }
    
    .seller-name {
        height: 0.4rem;
        font-size: 0.26rem;
        color: #333;
        font-weight: 700;
    }
    
    .seller-level,
    .seller-condition {
        color: #666;
    }
    
    .seller-condition span {
        float: right
    }
</style>