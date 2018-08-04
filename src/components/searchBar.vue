<template>
    <div class="search-bar">
        <div :class="isFocus ? 'search-bar-nav search-bar-hide' : 'search-bar-nav'">
            <div class="search-slide-menu"></div>
        </div>
        <div class="search-bar-input" :style="{width:isFocus ? '7.2rem' : '5.78rem'}">
            <div class="search-view">
                <div :class="isFocus ? 'search-icon search-icon-active' : 'search-icon'">
                    <span></span> {{isFocus ? '' : 'Search'}}
                </div>
                <input id="search" @keyup="write" @focus="focus" @blur="cancel" :blur="isFocus" type="text" class="search" />
            </div>
            <div :class="isFocus ? 'search-cancel search-cancel-active' : 'search-cancel'" @click="cancelBybtn">取消</div>
        </div>
        <div :class="isFocus ? 'search-bar-nav search-bar-hide' : 'search-bar-nav'">
            <div class="location"></div>
        </div>
        <div :class="isFocus ? 'search-list search-list-active' : 'search-list'">
            <div class="search-tip">
                {{word == "" ? "" : '搜索：' + word}}
            </div>
            <div class="search-result-content" @click="cancel">
                <seller-item :data="item" v-for="(item, index) in result" :key="item.sel_ele_id + 'searchresult'"></seller-item>
            </div>
        </div>
    </div>
</template>

<script>
    import sellerItem from '@/components/sellerItem'
    import api from '@/common/api'

    export default {
        data() {
            return {
                isFocus: false,
                isShowList: false,
                word: "",
                result: []
            }
        },
        components: {
            sellerItem
        },
        created() {

        },
        methods: {
            toplay(song) {
                let songs = this.dataForm(song)
            },
            addSong(song) {
                let songs = this.dataForm(song)
            },
            dataForm(song) {
                return {
                    id: song.id,
                    name: song.name,
                    singer: song.artists[0].name,
                    albumPic: song.album.artist.img1v1Url,
                    songUrl: '',
                    album: song.album.name
                }
            },
            focus(e) {
                this.isFocus = true
                this.isShowList = true
            },
            cancel() {
                this.isFocus = (this.word !== "") ? true : false
            },
            cancelBybtn() {
                this.isFocus = false
                this.result = []
                this.word = ""
                document.getElementById("search").value = ""
            },
            write(e) {
                this.word = e.target.value
                this.getResult()
            },
            getResult() {
                this.$ajax(api.search(this.word)).then(e => {
                    this.result = e.result.data
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        filters: {

        }
    }
</script>

<style>
    .search-bar {
        width: 100%;
        height: 44px;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2000;
        background: -webkit-linear-gradient(left, #03AAFF, #0387FF);
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #FFF;
    }
    
    .search-bar-nav {
        width: 40px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: ease-in-out all .2s;
        opacity: 1;
    }
    
    .search-bar-nav>div,
    .search-bar-nav>a {
        height: 44px;
        max-height: 46px;
        width: 40px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 20px auto;
    }
    
    .search-bar-hide {
        width: 0;
        opacity: 0;
    }
    
    .search-slide-menu {
        background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMC4wMHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI0Y4RjhGOCIgZD0iTTEwMTUuOTM2IDk4MC4wOTZsLTc2LjgtNzYuNzM2YzMwLjcyLTM4LjQgMzMuMjgtOTIuMDk2IDAtMTMwLjQzMkw2OTYuMjU2IDQ3My42YzEyLjgtMzUuODQgMjAuNDgtNzQuMTc2IDIwLjQ4LTExNS4wNzIgMC0xOTYuOTkyLTE2MS4yMTYtMzU4LjE0NC0zNTguMTQ0LTM1OC4xNDRDMTYxLjUzNiAwLjM4NCAwLjM4NCAxNjEuNTM2IDAuMzg0IDM1OC41MjhjMCAxOTYuOTI4IDE2MS4xNTIgMzU4LjE0NCAzNTguMTQ0IDM1OC4xNDQgNDAuOTYgMCA3OS4yOTYtNy42OCAxMTUuMDcyLTIwLjQ4bDI5OS4zMjggMjQzLjAwOGMxNy45MiAxNS4zNiA0MC45NiAyMy4wNCA2My45MzYgMjMuMDQgMjMuMDQgMCA0Ni4wOC03LjY4IDY2LjU2LTIzLjA0bDc2LjY3MiA3Ni43MzZjNS4xMiA1LjEyIDEyLjggNy42OCAxNy45MiA3LjY4IDUuMTIgMCAxMi44LTIuNTYgMTcuOTItNy42OCAxMC4yNC0xMC4yNCAxMC4yNC0yNS42IDAtMzUuODR6TTU3Ljk4NCAzNTcuMTJBMzAwLjAzMiAzMDAuMDMyIDAgMCAxIDM1Ny4xMiA1Ny45ODRjNzIuMzIgMCAxMzkuNTg0IDI3LjM5MiAxOTIgNjkuNzZMMTI3Ljc0NCA1NDkuMTJDODUuMzc2IDQ5Ni43MDQgNTcuOTg0IDQyOS40NCA1Ny45ODQgMzU3LjEyeiBtMzkyLjgzMiAyODMuMDcyYy0yOC44IDkuNi02MC4xNiA5Ljg1Ni04OC45NiA5Ljg1Ni02OS42MzIgMC0xMzEuODQtMTUuNTUyLTE4Mi4yNzItNTYuMzg0TDU5MC4wOCAxODcuMDA4YzQzLjIgNTAuNDMyIDU5LjkwNCAxMDUuMjE2IDU5LjkwNCAxNzQuODQ4IDAgMjguOC0zLjc3NiA2Mi45MTItMTMuMzc2IDkxLjcxMmwtMTg1Ljg1NiAxODYuNjI0eiBtNDM3LjgyNCAyMjYuMjRsLTIyLjE0NCAyMi4xNDRhNDguNTc2IDQ4LjU3NiAwIDAgMS0zNC40MzIgMTQuNzJjLTcuMzYgMC0xOS42NDgtMi40MzItMzItOS43OTJMNTE5LjY4IDY2Mi4yNzJsMTQ1LjE1Mi0xNDUuMDg4IDIyOC43MzYgMjgyLjg4YzE0LjcyIDIyLjA4IDE0LjcyIDQ5LjE1Mi00LjkyOCA2Ni4zNjh6IiAgLz48L3N2Zz4=');
    }
    .location{
        background-image: url("https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/location-icon.svg");
    }
    
    .search-bar-input {
        /*width: 5.78rem;*/
        height:30px;
        max-height: 30px;
        border-radius: 15px;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        transition: all linear .2s;
    }
    
    .search-view {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #FFF;
        border-radius: 15px;
    }
    
    .search-icon {
        width: 100%;
        height: 30px;
        max-height: 30px;
        font-size: 16px;
        position: absolute;
        justify-content: center;
        display: flex;
        align-items: center;
        left: 0;
        top: 0;
        transition: all linear .2s;
        background: #FFF;
        z-index: 20;
        color:#9C9C9C;
    }
    
    .search-icon-active {
        width:60px
    }
    
    .search-cancel {
        width: 0;
        height: 30px;
        text-align: center;
        font-size: 14px;
        color: #FFF;
        line-height: 30px;
        transition: all linear .2s;
        opacity: 0;
    }
    
    .search-cancel-active {
        width: 1.2rem;
        max-width: 50px;
        opacity: 1;
    }
    
    .search-icon>span {
        content: "";
        width: 16px;
        height: 16px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAe1BMVEUAAACbm5urq6ucnJycnJybm5ubm5uenp6cnJybm5ubm5ucnJybm5ucnJycnJybm5ubm5ucnJybm5ucnJycnJycnJycnJyenp6cnJybm5ucnJydnZ2cnJybm5udnZ2bm5ucnJycnJycnJycnJycnJycnJybm5ucnJycnJyNQ/xxAAAAKHRSTlMA5AQe8emHIQyPuRLMsZdo+fbRxZ5eShnXwHU9M3pyRaeCVS1uKU/eYPFfdwAAAhJJREFUWMPdVtmSgjAQ5Ea55AZFEDzz/1+4VRnWqMkwsdyq3dp+I5npzHQ6CcZfRHjtxzxlqdsW5TF8N3tVxSl7RLRZvbN4mTEJTnLRTLfODlOj1KqiaxkKs6bzN0ygiEvPS8bAeSjC0s6PhubeVF3eOWJLL7/tXoSpIx2G7lvxQY6yEpqhceZG1b6pZmtM6P7NVe6wgL3J51PMELt5fQOFDyUWiH1hNlgS6co4KuWkx+fyZbeBkjelguD/PeFz8KnKkWtowCBwQMNA4Rf/oHG+NH6Z9SUx8cAe2cOaJvDBjtL4lluESBaRrjTMTdDqEFS8BPt1e0RhFECto7Izj0oWa52lg4xaVN3tpPTHQYvAVRW7F42RUJ75RjRGAUI3kjKEiFSx0NhWfFMX7+l1OODDOk9PzK9dhLfSsEGmPs8Ng3ESNbZSTl9IIi5T9DowISMp4ai6lF0dM4YOHnWGFzzUuJUjtbwuNGEZOE5MmADTlyUL+eZyxBoYRqyGOmOwBdTrGjXY2wlIyPfd6eVF9jG7Y4036TKAs3vejQ7OCs1gt+InaTrYBuAKvWkxrIrHuLQt8psrvrPBJRmsPmUYCtvwaQbD36rTs4HPCgYcx0JOzweQlWQA2Lv8KdsT55xgEAi7zTrYBmPiVbC2zOAZ2vhxBvNTBvt/MUwfM/S/z2CuPmMwbTyCZqDyaQYin4TP/7u/AGcGhnLfQXhvAAAAAElFTkSuQmCC");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% auto;
        display: inline-block;
        margin-right: 4px;
    }
    .search {
        height: 100%;
        width: 100%;
        border-radius: 15px;
        -webkit-appearance: none;
        border: none;
        outline: none;
        background: none;
        color: #333;
        padding: 0 28px 0 60px;
        z-index: 30;
        font-size: 14px;
    }
    
    .search-list {
        width: 100%;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 50;
        background: #FFF;
        opacity: 0;
        display: none;
        transition: all linear .2s;
    }
    
    .search-list-active {
        width: 100%;
        height: calc(100vh - 44px);
        position: absolute;
        left: 0;
        top: 44px;
        background: #FFF;
        opacity: 1;
        display: block;
        z-index: 200;
    }
    
    .search-tip {
        height: .6rem;
        max-height: 50px;
        padding: 0 16px;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        font-size: 12px;
        font-weight: 700;
        color: #5179f1;
    }
    /*result*/
    
    .search-result {
        flex: 1 1 auto;
        width: 100%;
        background: #FBFCFD;
        margin-bottom: 0.6rem;
    }
    .search-result-content {
        width: 100%;
        height: 100%;
        padding-bottom: 0.8rem;
        overflow: scroll;
    }
</style>