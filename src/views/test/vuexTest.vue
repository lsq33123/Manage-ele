<!-- 测试vuex的页面 -->
<template>
    <div>
        <h2>测试vuex的页面</h2>
        <el-input v-model="uscore" placeholder="分数" style="width:200px;" ></el-input>
        <el-button type="primary" @click="updateUserScore()" >提交</el-button>
        姓名：{{$store.state.userInfo.name}}&emsp;
        分数：{{$store.state.userInfo.score}}
        ||{{$store.state.count}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            uscore:this.$store.state.userInfo.score
        };
    },

    components: {},

    computed: {
        // score(){
        //     return this.$store.getters.getterScore
        // }
    },

    mounted() {
       
    },

    methods: {
        updateUserScore(){
            // this.$store.commit("updateScore",this.uscore);
            this.$store.dispatch("updateScore",this.uscore);
        }
    }
};
</script>
<style lang='less' scoped>
</style>