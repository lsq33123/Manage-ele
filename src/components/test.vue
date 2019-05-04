<!--  -->
<template>
    <div>
        {{tipText}}
        <div v-show="showT">
            被发现了了
        </div>
                <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
        ></el-date-picker>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tipText: this.tip,
            showT:this.isShow,
            pickerOptions:this.opt,
            value2:"",
            value1:"",

        };
    },
    props: {
        tip: {
            type: String,
            requried: false,
            default: "123"
        },
        isShow:{
            type:Boolean,
            required:false,
            default:false
        },
        opt:{
            default:{
                                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            }
        }
    },

    components: {},

    computed: {
    },

    mounted: {
    },

    methods: {}
};
</script>
<style lang='less' scoped>
</style>