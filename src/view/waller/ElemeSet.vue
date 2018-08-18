<template>
    <transition name="all-view-overlay">
        <div class="address-view">
            <div class="order-header-title">
                <div class="seller-back orderinfo-back" @click="toHome"></div>
                个人信息
            </div>
            <vue-put-to class="address-view-scroll">
                <div class="add-adr-item">
                    <div class="add-adr-item-name">用户昵称:</div>
                    <input v-model="edit.nickname" @keyup="checkData" type="text" :disabled="!set" placeholder="请填写昵称" />
                </div>
                <div class="add-adr-item">
                    <div class="add-adr-item-name">用户邮箱:</div>
                    <input v-model="edit.email" @keyup="checkData" type="text" :disabled="!set" placeholder="请填写邮箱" />
                </div>
                <div class="add-adr-item">
                    <div class="add-adr-btn" @click="saveAdr">{{set ? '保存信息' : '修改信息'}}</div>
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
                edit: {
                    nickname: "",
                    email: ""
                },
                canPost:false,
                set:false
            }
        },
        components: {
            vuePutTo
        },
        created() {

        },
        methods: {
            checkData(e) {
                if(/^[\u4e00-\u9fa5_a-zA-Z.]{2,16}$/.test(this.edit.nickname) && /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.edit.email)) {
                    this.canPost = true
                } else {
                    this.canPost = false
                }
            },
            saveAdr(){
                this.checkData()
                if(!this.set){
                    this.set = true
                }else{
                    if(!this.canPost){
                        return
                    }
                    this.$ajax.post(api.modifyInfo(),{name:this.edit.nickname,email:this.edit.email}).then(res => {
                        res.code === 200 && Toast({message: '信息修改成功!', duration: 1000})
                        res.code === 200 && this.$router.replace("/personal")
                        res.code === 200 && this.$store.commit("user/updateInfo",{nickname:this.edit.nickname,email:this.edit.email})
                    }).catch(err => {
                        Toast({message: '修改用户信息失败!', duration: 1000})
                    })
                }
            },
            toHome() {
                this.$router.replace("/personal")
            }
        },
        activated(){
            this.set = false
            this.canPost = false
            this.edit.nickname = this.nickname
            this.edit.email = this.email
        },
        computed: {
            ...mapGetters([
                'email',
                'nickname'
            ])
        },
        filters: {

        }
    }
</script>

<style>
    .add-adr-scroll {
        width: 100%;
        padding-left: 20px;
        background: #FFF;
    }
    
    .add-adr-item {
        width: 100%;
        height: 47px;
        border-bottom: 1px solid #F0F0F0;
        display: flex;
        align-items: center;
        padding: 0 20px 0 2px;
    }
    
    .add-adr-item-name {
        width: 80px;
        flex: 0 0 auto;
        min-height: 46px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-weight: 550;
        font-size: 14px;
    }
    input[type="text" i]:disabled{
        background-color:#FFF !important;
    }
    .add-adr-item input,
    .add-adr-caller,
    .add-adr-map {
        height: 42px;
        -webkit-appearance: none;
        border: none;
        outline: none;
        flex: 1 1 auto;
        color: #333;
    }
    
    .add-adr-map {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #757575;
    }
    
    .add-adr-caller label {
        width: 100px;
        height: 42px;
        display: flex;
        align-items: center;
    }
    
    .add-adr-caller {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    
    .add-adr-caller input[type=radio] {
        flex: 0 0 auto;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        margin-right: 12px;
        border-radius: 50%;
        border: 1px solid #9B9B9B;
    }
    
    .add-adr-caller input[type=radio]:checked {
        background-color: #FFF;
        background-image: url('../../assets/checked.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 22px auto;
        border: none;
    }
    
    .add-adr-item:last-child {
        border: none;
    }
    
    .add-adr-btn {
        width: 86vw;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 550;
        color: #FFF;
        background: #0387FF;
        margin: 10px auto;
    }
</style>