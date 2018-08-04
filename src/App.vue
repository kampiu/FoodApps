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
//              transitionName: "all-view-overlay"
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
            $route(to) {
//              this.transitionName = to.meta.show
            }
        }
    }
</script>

<style>
    #app {
        width: 100%;
        min-height: 100vh;
        position:fixed;
        left:0;
        top:0;
    }
    
    .index-box {
        width: 100%;
        min-height: 100vh;
    }
    
    .all-view-overlay-enter-active {
        transition: all .3s ease;
    }
    
    .all-view-overlay-leave-active {
        /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    }
    
    .all-view-overlay-enter,
    .all-view-overlay-leave-to {
        transform: translateX(100px);
        opacity: 0;
    }
</style>