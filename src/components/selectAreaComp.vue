<!-- 选择区域或门店 -->
<template>
    <div style="display: inline-block;">
        <el-select v-model="areaCode" placeholder="请选择区域" @change="areaChange" :clearable="areaCleared" filterable >
            <el-option v-for="item in areaList" :key="item.areaCode" :value="item.areaCode" :label="item.areaName"></el-option>
        </el-select>
        <el-select v-model="compCode" placeholder="请选择门店" @change="compChange" :clearable="compCleared" filterable >
            <el-option v-for="item in compList" :key="item.compID" :value="item.compID" :label="item.shortName"></el-option>
        </el-select>
    </div>
</template>

<script>
import {getVappArea,getVappComp} from '@/api/bdbApi'
export default {
    data() {
        return {
            areaCleared:this.areaClear,//是否显示清空按钮
            compCleared:this.compClear,//是否显示清空按钮
            areaCode: "",
            compCode: "",
            areaName: "",
            compName: "",
            areaList: [],
            compList: []
        };
    },
    props: {
        areaClear:{
            type:Boolean,
            require:false,
            default:false
        },
        compClear:{
            type:Boolean,
            require:false,
            default:false
        }
    },

    components: {},

    computed: {},

    mounted() {
        this.initData();
    },

    methods: {
        initData(){
            getVappArea().then(res =>{
                this.areaList = res.areaList;
                getVappComp().then(res =>{
                    this.compList = res.complist;
                })
            })
        },
        areaChange(val){
            let params = {};
            if(val){
                params= {
                    action:'oneArea',
                    compid:val
                };
            }
            getVappComp(params).then(res =>{
                this.compList = res.complist;
                this.compCode = '';
                this.getValue();
            });
        },
        compChange(val){
            let compDetail = this.compList.find((item) =>(item.compID === val));
            if(compDetail){
                this.areaCode = compDetail.areaID;
            }
            this.getValue();
        },
        getValue(){
            let params = {
                area:this.areaList.find((item) =>(item.areaCode === this.areaCode))||{},
                comp:this.compList.find((item) =>(item.compID === this.compCode))||{}
            };
            this.$emit('getValue',params);
        }
    }
};
</script>
<style lang='less' scoped>
</style>