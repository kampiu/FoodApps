<template>
    <div class="seller-comment-view">
        <div class="seller-comment-item">
            <div class="seller-comment-icon"></div>
            <div class="seller-comment-context">
                <div class="seller-comment-name">买家昵称</div>
                <div class="seller-comment-txt">整体味道一般，没有之前别地方吃的味道好，图片上颜色很好看，就像自己做的差不多，没有说特别好吃。很软没嚼劲。</div>
                <div class="seller-comment-date">2018-07-26 22:17:46</div>
            </div>
        </div>
        <div class="seller-comment-item">
            <div class="seller-comment-icon"></div>
            <div class="seller-comment-context">
                <div class="seller-comment-name">买家昵称</div>
                <div class="seller-comment-txt">颜色鲜艳，物美价廉，老板服务态度好，饮料赠送，餐具干净安全，包装。</div>
                <div class="seller-comment-date">2018-07-26 22:17:46</div>
            </div>
        </div>
        <div class="seller-comment-item">
            <div class="seller-comment-icon"></div>
            <div class="seller-comment-context">
                <div class="seller-comment-name">买家昵称</div>
                <div class="seller-comment-txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus blanditiis saepe est dolore deserunt dolores eos hic molestias fuga. Fugiat tempora alias saepe corrupti laborum perferendis at iste corporis aperiam!</div>
                <div class="seller-comment-date">2018-07-26 22:17:46</div>
            </div>
        </div>
    </div>
</template>
<style>
    .seller-comment-item{
        width:100%;
        min-height:120px;
        display:flex;
        padding:10px 12px 0 12px;
    }
    .seller-comment-icon{
        width:58px;
        height:58px;
        flex:0 0 auto;
        background-image: url("../../assets/user_icon.png");
        background-size: 76% auto;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .seller-comment-context{
        flex:1 1 auto;
        line-height: 18px;
        color:#333;
        display:flex;
        align-items: flex-start;
        padding:0 0 10px 20px;
        flex-direction: column;
        border-bottom:1px solid #EDEDED;
    }
    .seller-comment-name{
        line-height: 28px;
        font-size: 14px;
        font-weight: 600;
        color:#333;
    }
    .seller-comment-txt{
        line-height: 20px;
        text-indent: 2em;
        color:#666;
    }
    .seller-comment-date{
        display:flex;
        align-items:center;
        justify-content:flex-end;
        line-height: 22px;
        text-align: right;
        width:100%;
    }
</style>
<script>
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
        filters: {

        }
    }
</script>

<style>

</style>