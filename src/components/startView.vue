<template>
    <div class="start-components">
        <span class="start-active" v-for="n in number"></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
    export default {
        props:["number"],
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
    .start-components {
        width: 80px;
        height: 12px;
        display: inline-block;
        vertical-align: baseline;
        overflow: hidden;
    }
    
    .start-components span {
        display: flex;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center center;
        background-image: url("../assets/start.png");
        float:left;
    }
    
    .start-components .start-active {
        background-image: url("../assets/start_active.png");
    }
</style>