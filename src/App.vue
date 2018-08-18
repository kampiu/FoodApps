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

        },
        watch: {

        }
    }
</script>

<style>
    #app {
        width: 100%;
        min-height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
    }
    
    .index-box {
        width: 100%;
        min-height: 100vh;
    }
    
    .all-view-overlay-enter-active {
        transition: all .3s ease;
    }
    
    .all-view-overlay-enter,
    .all-view-overlay-leave-to {
        transform: translateX(100px);
        opacity: 0;
    }
</style>