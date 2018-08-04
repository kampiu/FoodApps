<template>
    <transition name="all-view-overlay">
        <div class="address-view">
            <div class="order-header-title">
                <div class="seller-back" @click="backTo"></div>
                收货地址
                <div class="address-add" @click="toAdd">新增地址</div>
            </div>
            <vue-put-to class="address-view-scroll" :top-load-method="refresh" :top-config="scrollConfigTop">
                <div class="address-item" v-for="(item, index) in userAddress" :key="item.adr_id + 'adr-item'">
                    <div class="address-location font-break">{{item.adr_location}} {{item.adr_info}}</div>
                    <div class="address-consignee font-break">
                        <div>{{item.adr_consignee}}<span>{{item.adr_caller | call}}</span></div>
                        <div>{{item.adr_tell}}</div>
                    </div>
                    <router-link :to="'/address/edit/' + item.adr_id" class="address-edit"></router-link>
                </div>
            </vue-put-to>
        </div>
    </transition>
</template>
<style>

</style>

<script>
    import vuePutTo from 'vue-pull-to'
    import api from '@/common/api'
    import {
        mapMutations,
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                scrollConfigTop: {
                    pullText: '下拉刷新',
                    triggerText: '释放更新',
                    loadingText: '加载中...',
                    doneText: '加载完成',
                    failText: '加载失败',
                    loadedStayTime: 400,
                    stayDistance: 50,
                    triggerDistance: 50
                }
            }
        },
        components: {
            vuePutTo
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                if(vm.userAddress.length === 0) {
                    vm.getAddress()
                }
            })
        },
        created() {

        },
        methods: {
            getAddress(callback) {
                this.$ajax.get(api.getAddress()).then(res => {
                    res.code === 200 && this.$store.commit("address/initAdrList", res.data)
                    callback && callback()
                }).catch(err => {
                    console.log("获取地址列表失败", err)
                })
            },
            refresh(loaded) {
                this.getAddress(() => {
                    loaded('done')
                })
            },
            backTo() {
                window.history.go(-1)
            },
            toAdd() {
                this.$router.push({
                    path: '/address/add'
                })
            }
        },
        computed: {
            ...mapGetters([
                'userAddress'
            ])
        },
        filters: {
            call(caller) {
                return caller == 1 ? '先生' : '小姐'
            }
        }
    }
</script>

<style>
    .address-add {
        width: 70px;
        height: 50px;
        position: absolute;
        right: 0;
        top: 0;
    }
    
    .address-item {
        width: 100%;
        height: 66px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5px 60px 5px 4px;
        position: relative;
        border-bottom: 1px solid #F0F0F0;
    }
    
    .address-location,
    .address-consignee {
        line-height: 28px;
        width: 100%;
        height: 28px;
        overflow: hidden;
        color:#333;
    }
    
    .address-location {
        font-weight: 550;
        font-size: 14px;
    }
    
    .address-consignee>div {
        display: inline-block;
        margin-right: 12px;
    }
    
    .address-consignee>div span {
        margin-left: 12px;
    }
</style>