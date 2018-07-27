<template>
    <div id="app">
        <keep-alive>
            <router-view class="index-box"></router-view>
        </keep-alive>
    </div>
</template>

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
    #app {
        width: 100%;
        min-height: 100vh;
    }
    .index-box{
        width:100%;
        min-height:100vh;
    }
</style>