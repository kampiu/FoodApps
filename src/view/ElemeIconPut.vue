<template>
    <div class="upload-view">
        <div class="order-header-title">头像
            <div class="seller-back orderinfo-back" @click="backTo"></div>
        </div>
        <div class="user-icon-view" :style="{backgroundImage: 'url(' + picurl + ')'}" v-if="unUpload"></div>
        <croppa class="image-cutting-view" :disable-scroll-to-zoom="false" v-model="myCroppa" :width="300" :height="300" placeholder="Choose an image" accept=".png,.jpg,.jpeg" :placeholder-font-size="0" :file-size-limit="307200" :disabled="false" :prevent-white-space="true" :show-remove-button="false" @file-choose="handleCroppaFileChoose" @file-size-exceed="onFileSizeExceed " @file-type-mismatch="onFileTypeMismatch" @image-remove="handleImageRemove" @move="handleCroppaMove" @zoom="handleCroppaZoom">
        </croppa>
        <div class="upload-setting-btn" @click="selectImg">上传头像</div>
        <div class="upload-setting-btn" @click="getImgAttr" :style="{display: unUpload ? 'none' : 'block'}">保存头像</div>
    </div>
</template>

<script>
    import api from '@/common/api'
    import { Toast } from 'vant'
    import {
        mapMutations,
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                myCroppa: {

                },
                unUpload: true
            }
        },
        components: {

        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                vm.unUpload = true
            })
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                document.getElementsByClassName("image-cutting-view")[0].style.width = "100vw"
                document.getElementsByClassName("image-cutting-view")[0].style.height = "100vw"
                document.getElementsByClassName("image-cutting-view")[0].getElementsByTagName("canvas")[0].style.width = "100vw"
                document.getElementsByClassName("image-cutting-view")[0].getElementsByTagName("canvas")[0].style.height = "100vw"
            },
            selectImg() {
                this.myCroppa.chooseFile()
            },
            getImgAttr() {
                if(!this.myCroppa.hasImage()) {
                    alert('请选择图片')
                    return
                }
                let _that = this
                this.myCroppa.generateBlob(blob => {
                    let formData = new FormData()
                    formData.append("img", blob, new Date().getTime() + "image.png")
                    formData.append("w", 0)
                    formData.append("h", 0)
                    formData.append("x", 0)
                    formData.append("y", 0)
                    _that.$ajax.post(api.modifyIcon(), formData).then(res => {
                        res.code === 200 && this.$store.commit("user/initInfo", res.result[0])
                        res.code === 200 && Toast({
                            message: '上传成功!',
                            duration: 1000
                        })
                        res.code === 200 && this.$router.replace("personal")
                        res.code !== 200 && Toast({
                            message: res.msg,
                            duration: 1000
                        })
                    }).catch(err => {
                        Toast({
                            message: "上传出错!",
                            duration: 1000
                        })
                    })
                }, 'image/png', 0.8)
            },
            backTo() {
                window.history.go(-1)
            },
            handleCroppaMove() {

            },
            handleCroppaFileChoose() {
                this.unUpload = false
            },
            handleImageRemove() {

            },
            handleCroppaZoom() {

            },
            onFileTypeMismatch(file) {
                Toast({
                    message: '图片格式只支持PNG,JPG.',
                    duration: 1000
                })
            },
            onFileSizeExceed(file) {
                Toast({
                    message: '图片最大为3M.',
                    duration: 1000
                })
            }
        },
        computed: {
            ...mapGetters([
                'picurl'
            ])
        }
    }
</script>

<style>
    .image-cutting-view {
        width: 100vw;
        height: 100vw;
        margin: 0px 0 5vh 0;
    }
    
    .upload-setting-btn {
        width: 80vw;
        margin: 10px auto 0 auto;
        height: 46px;
        line-height: 44px;
        text-align: center;
        color: #FFF;
        font-size: 14px;
        background: #0388FF;
        border: 1px solid #0388FF;
        transition: all linear .2s;
    }
    
    .user-icon-view {
        position: absolute;
        z-index: 200;
        top: 50px;
        left: 0;
        width: 100vw;
        height: 100vw;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }
</style>