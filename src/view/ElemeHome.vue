<template>
    <div class="home-view">
        <search-bar></search-bar>
        <vue-put-to :bottom-load-method="loadmore" :bottom-config="scrollConfigBottom" :top-load-method="refresh" :top-config="scrollConfigTop">
            <div class="home-header">
                <div class="location-bar" @click="toCity">
                    东莞市
                </div>
            </div>
            <div class="swiper-menu">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item, index) in menuList" :key="index + 'menu-item'" class="menu-item">
                        <div class="menu-nav" v-for="(_item, _index) in item" :key="_item.cate_id + 'menu-nav'" :data-id="_item.cate_eleme_id" @click="changStyle">
                            <img :src="_item.cate_icon" :data-id="_item.cate_eleme_id" alt="" />
                            <span :data-id="_item.cate_eleme_id">{{_item.cate_name}}</span>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="seller-list">
                <div class="seller-list-header">
                    <div class="seller-list-title">推荐商家</div>
                    <div class="seller-list-nav">
                        综合排序
                    </div>
                    <div class="seller-list-nav">
                        好评优先
                    </div>
                    <div class="seller-list-nav">
                        距离最近
                    </div>
                    <div class="seller-list-nav">
                        送达最快
                    </div>
                </div>
                <div class="seller-list-body">
                    <seller-item :data="item" v-for="(item, index) in sellerList" :key="item.sel_ele_id"></seller-item>
                </div>
            </div>
        </vue-put-to>
    </div>
</template>
<style>
</style>

<script>
    import sellerItem from '@/components/sellerItem'
    import searchBar from '@/components/searchBar'
    import vuePutTo from 'vue-pull-to'
    import api from '@/common/api'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'

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
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    paginationClickable: true,
                    continuous: true,
                    slidesPerView: 1,
                    spaceBetween: 30,
                    speed: 200,
                    loop: true,
                    loopFillGroupWithBlank: true,
                },
                menuList: [],
                type: "",
                page: 1,
                limit: 10,
                sellerList: []
            }
        },
        components: {
            swiperSlide,
            sellerItem,
            searchBar,
            vuePutTo,
            swiper
        },
        created() {
            this.get()
            this.getSeller()
        },
        methods: {
            changStyle(e) {
                this.sellerList = []
                this.page = 1
                this.type = e.target.dataset.id
                this.getSeller()
            },
            getSeller(callback) {
                this.$ajax.get(api.getSellerList(this.page, this.limit, this.type)).then(res => {
                    res.result.data.forEach((item, index) => {
                        this.sellerList.push(item)
                    })
                    callback && callback()
                }).catch(err => {
                    console.log("获取数据失败:" + err)
                })
            },
            refresh(loaded) {
                this.sellerList = []
                this.page = 1
                this.type = ""
                this.getSeller(() => {
                    loaded('done')
                })
            },
            loadmore(loaded) {
                this.page++
                    this.getSeller(() => {
                        loaded('done')
                    })
            },
            get() {
                this.$ajax.get(api.getMenu()).then(res => {
                    let _len = 10,
                        _min = 0,
                        arr = [
                            []
                        ]
                    res.result.data.forEach((item, index) => {
                        if(index < (_min + 1) * _len) {
                            arr[_min].push(item)
                        } else {
                            _min++
                            arr.push([])
                            arr[_min].push(item)
                        }
                    })
                    this.menuList = arr
                }).catch(err => {
                    console.log(err)
                })
            },
            toCity(){
                this.$router.push({
                    path: '/city'
                })
            }
        },
        filters: {

        }
    }
</script>

<style>
    .home-header {
        width: 100%;
        height: 3rem;
        background-image: url("../assets/header-bg.png");
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-position: center bottom;
        margin-bottom: 0.2rem;
    }
    
    .location-bar {
        width: 100%;
        height: 0.5rem;
        padding: 0 0.5rem;
        line-height: 0.5rem;
        color: #FFF;
        font-size: 0.26rem;
    }
    
    .swiper-menu,
    .swiper-container {
        width: 100%;
        height: 45vw;
    }
    
    .menu-item {
        width: 100%;
        height: 36vw;
        overflow: hidden;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        overflow: hidden;
        flex-wrap: wrap;
    }
    
    .menu-nav {
        width: 20%;
        height: 18vw;
        float: left;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    
    .menu-nav>img {
        width: 12vw;
        height: 12vw;
        margin-bottom: 0.12rem;
    }
    
    .seller-list-body,
    .seller-list {
        width: 100%;
        overflow: hidden;
    }
    .seller-list-header {
        width: 100%;
        height: 55px;
        border-bottom: 1px solid #F6F6F6;
        background: #FFF;
    }
    
    .seller-list-title {
        width: 100%;
        height: 16px;
        text-align: center;
        position:relative;
    }
    
    .seller-list-title::before,
    .seller-list-title::after {
        content: "";
        position: absolute;
        width:3.4vw;
        height: 1px;
        background: #333;
        top:8px;
    }
    
    .seller-list-title::before {
        left: 36vw;
    }
    
    .seller-list-title::after {
        right: 36vw;
    }
    
    .seller-list-nav {
        height: 38px;
        width: 25%;
        line-height: 38px;
        text-align: center;
        float: left;
    }
    
    .home-view {
        padding-top: 44px;
    }
    .home-view .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
        bottom:6px;
    }
</style>