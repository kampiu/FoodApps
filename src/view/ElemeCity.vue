<template>
    <transition name="all-view-overlay">
        <div class="map-view">
            <div class="order-header-title">
                <div class="seller-back" @click="toHome"></div>
                地区选择
            </div>
            <div class="map-city-menu">
                <span v-for="(item, index) in cityList" :key="item.idx + 'keyCity'" @click="toScroll" :data-index="index">{{item.idx}}</span>
            </div>
            <vue-put-to class="map-view-scroll">
                <div class="city-list" v-for="(item, index) in cityList" :key="item.idx + 'list'">
                    <div class="letter-title">{{item.idx}}</div>
                    <div class="city-item" v-for="(_item,_index) in item.cities" :key="_item.id + 'city'" :data-name="_item.name" :data-id="_item.id" @click="setCity">{{_item.name}}</div>
                </div>
            </vue-put-to>
        </div>
    </transition>
</template>

<script>
    import vuePutTo from 'vue-pull-to'
    import api from '@/common/api'
    import { Toast } from 'vant'
    import {
        mapMutations,
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                scrollConfigBottom: {
                    pullText: '上拉加载',
                    triggerText: '释放更新',
                    loadingText: '加载中...',
                    doneText: '加载完成',
                    failText: '加载失败',
                    loadedStayTime: 400,
                    stayDistance: 50,
                    triggerDistance: 50
                },
                scrollConfigTop: {
                    pullText: '下拉刷新',
                    triggerText: '释放更新',
                    loadingText: '加载中...',
                    doneText: '加载完成',
                    failText: '加载失败',
                    loadedStayTime: 400,
                    stayDistance: 50,
                    triggerDistance: 50
                },
                cityList: []
            }
        },
        components: {
            vuePutTo
        },
        created() {
            this.initData()
        },
        methods: {
            setCity(e) {
                this.$store.commit("common/initCity", e.target.dataset.name)
                this.$router.replace("/home")
            },
            refresh(loaded) {
                loaded('done')
            },
            loadmore(loaded) {
                loaded('done')
            },
            initData() {
                this.$ajax(api.getCity()).then(e => {
                    if(e.code === 200){
                        Toast({message: '获取城市列表成功!', duration: 1000})
                        this.cityList = e.result.data
                    }
                }).catch(err => {
                    Toast({message: '获取城市列表失败!', duration: 1000})
                })
            },
            toHome() {
                this.$router.replace("/home")
            },
            toScroll(e) {
                let _i = e.target.dataset.index
                document.getElementsByClassName("scroll-container")[0].scrollTop = document.getElementsByClassName("city-list")[_i].offsetTop
            }
        },
        filters: {

        }
    }
</script>

<style>
    .letter-title {
        width: 100%;
        background: #FBFCFD;
        height: 36px;
        color: #333;
        line-height: 36px;
        font-weight: 800;
        font-size: 14px;
        padding: 0 16px;
    }
    
    .city-item {
        width: 100%;
        height: 31px;
        line-height: 30px;
        border-bottom: 1px solid #F6F6F6;
        color: #666;
        padding: 0 16px;
        background: #FFF;
    }
    
    .map-view {
        width: 100vw;
        height: 100vh;
        padding-top: 50px;
        position: relative;
    }
    
    .map-view>.order-header-title {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 200;
    }
    
    .map-view-scroll {
        width: 100%;
        height: 100%;
    }
    
    .map-city-menu {
        width: 17px;
        overflow: hidden;
        background: #FBFCFD;
        position: fixed;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 200;
    }
    
    .map-city-menu span {
        display: inline-block;
        width: 16px;
        color: #666;
        margin-left: 1px;
        margin-bottom: 1px;
        background: #EDEDED;
        height: 16px;
        text-align: center;
        line-height: 16px;
    }
</style>