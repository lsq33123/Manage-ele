<!-- 门店拓展进度 -->
<template>
    <div v-loading="loading">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item >
                    <el-select  placeholder="省份" v-model="form.province" clearable :size="inputSize" style="width:100px;">
                        <el-option v-for="item in provinceList" :key="item.code" :value="item.name" :label="item.name"></el-option>
                    </el-select>&nbsp;
                    <el-select  placeholder="城市" v-model="form.city" clearable :size="inputSize" style="width:100px;">
                        <el-option v-for="item in cityList" :key="item.code" :value="item.name" :label="item.name"></el-option>
                    </el-select>&nbsp;
                    <el-select  placeholder="运营管理部门" v-model="form.mgrDepartment" clearable :size="inputSize" style="width:130px;">
                        <el-option v-for="item in areaList" :key="item.areaCode" :value="item.areaName" :label="item.areaName"></el-option>
                    </el-select>&nbsp;
                    <el-select  placeholder="跟进人" clearable :size="inputSize" style="width:100px;">
                        <el-option v-for="item in followerList" :key="item.id" :value="item.text" :label="item.text"></el-option>
                    </el-select>&nbsp;
                    <el-select  placeholder="进度" clearable :size="inputSize" style="width:100px;">
                        <el-option v-for="item in processStatusList" :key="item.id" :value="item.text" :label="item.text"></el-option>
                    </el-select>&nbsp;
                    <el-input-number placeholder="年份" v-model="form.year" controls-position="right" :min='1990' :max='2050' :size="inputSize" @change="yearChange" style="width:100px;"></el-input-number>&nbsp;
                    <el-input-number placeholder="月份" v-model="form.month" controls-position="right" :min='1' :max='12' :size="inputSize" @change="monthChange" style="width:100px;"></el-input-number>&nbsp;
                    <el-button type="primary" size="mini" @click="loadData()">查询</el-button>
                    <el-button type="primary" size="mini" @click="1">新增</el-button>
                    <el-button type="primary" size="mini" @click="1">修改</el-button> 
                    <el-button type="primary" size="mini" @click="1">立项提交</el-button> 
                </el-form-item>
            </el-form>
        </el-col>
    
        <el-table ref="table" :data="tableData" :height="tableHeight" size="small" border  @row-change="handleRowChange">
            <el-table-column type="index" header-align="center" label="序号" width="70" fixed></el-table-column>
            <el-table-column property="id" label="ID" header-align="center" min-width="80" v-if="false "> </el-table-column>
            <el-table-column property="branchId" label="门店店号" header-align="center" min-width="80" fixed> </el-table-column>
            <el-table-column property="branchName" label="门店名称" header-align="center" min-width="100" fixed> </el-table-column>
            <el-table-column property="branchType" label="门店类型" header-align="center" min-width="100" fixed > </el-table-column>
            <el-table-column property="branchNature" label="门店性质" header-align="center" min-width="100" fixed> </el-table-column>
            <el-table-column property="province" label="省份" header-align="center" min-width="100" fixed > </el-table-column>
            <el-table-column property="city" label="城市" header-align="center" min-width="100" fixed > </el-table-column>
            <el-table-column property="addressDetail" label="详细地址" header-align="center" min-width="200"  > </el-table-column>
            <el-table-column property="developmentDepartment" label="开发部门" header-align="center" min-width="100"  > </el-table-column>
            <el-table-column property="managementDepartment" label="运营管理部门" header-align="center" min-width="120"  > </el-table-column>
            <el-table-column property="mDepartmentId" label="运营管理部门编码" header-align="center" min-width="180"  > </el-table-column>
            <el-table-column property="year" label="年份" header-align="center" min-width="100"  > </el-table-column>
            <el-table-column property="month" label="月份" header-align="center" min-width="100"  > </el-table-column>
            <el-table-column property="follower" label="跟进人" header-align="center" min-width="100"  > </el-table-column>
            <el-table-column property="progress" label="进度" header-align="center" min-width="100" :formatter="formatProgress" > </el-table-column>
            <el-table-column property="contact" label="联系人" header-align="center" min-width="100"  > </el-table-column>
            <el-table-column property="contactTel" label="联系电话" header-align="center" min-width="110"  > </el-table-column>
            <el-table-column property="progressRemark" label="进度说明" header-align="center" min-width="400"  > </el-table-column>
            <el-table-column property="operateDate" label="修改日期" header-align="center" min-width="110" :formatter="formatOperDate"> </el-table-column>
            <el-table-column property="processNow" label="当前流程" header-align="center" min-width="100"  > </el-table-column>
            <el-table-column property="nodeNow" label="流程节点" header-align="center" min-width="100"  > </el-table-column>
            <el-table-column property="processStatus" label="审批状态" header-align="center" min-width="100" :formatter="formatProStatus"> </el-table-column>
            <el-table-column property="approvalDate" label="节点审批日期" header-align="center" min-width="110" :formatter="formatAppDate"> </el-table-column>
        </el-table>

        <div style="text-align: right;margin-right: 45px;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10,20,50,100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagetotal"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import {getCompFollowList,queryAddress,getAreaList} from '@/api/bdbApi'
import util from '@/common/js/util'
const processStatusArr = [ {id : '0',text : '未填写'}, {id : '2',text : '草稿'}, {id : '4',text : '审批中'}, {id : '6',text : '审批通过'} ];
const progressArr = [ {id : '1',text : '放弃'}, {id : '2',text : '意向'}, {id : '3',text : '立项'}, {id : '4',text : '签约'}, {id : '5',text : '开业'} , {id : '6',text : '关闭'} ];
const branchNatureArr = [ {id : '0',text : '加盟店'}, {id : '1',text : '直营店'} ];
const branchTypeArr = [ {id : '0',text : '旗舰店'}, {id : '1',text : '标准店'}, {id : '2',text : '小型店'}, {id : '3',text : '社区店'} ];
const followerArr = [{id : '0',text : '程育林'}, {id : '1',	text : '于正'}, {id : '2',text : '孙明刚'}, {id : '3',	text : '梁俊斌'}, {	id : '4',text : '李家继'}, {id : '5',text : '徐立林'} ];
export default {
    data () {
        return {
            tableData: [],
            tableHeight: window.innerHeight - 160 - 70,
            currentPage: 0, //当前页
            pageSize: 20, //分页数
            pagetotal: 0, //总条数
            loading:false,
            currentRow:{},
            provinceList:[],
            cityList:[],
            areaList:[],
            processStatusList:processStatusArr,
            followerList:followerArr,
            inputSize:'small',
            form:{
                province:'',
                city : '',
                mgrDepartment:'',//运营管理部门
                follower:'',//跟进人
                year:'',
                month:'',

            }
        };
    },

    components: {},

    computed: {},

    created(){
        this.initData();
        this.loadData();
    },

    methods: {
        initData(){
            queryAddress().then(res =>{
                this.provinceList = res.rs;
            });
            getAreaList().then(res =>{
                this.areaList = res.areaList;
            })
            const nowTime = new Date();
            this.form.year = nowTime.getFullYear();
            this.form.month = nowTime.getMonth() + 1;
        },
        loadData(){
            let params = {
                province:this.form.province,
				city : this.form.city,
				managementDepartment : this.mgrDepartment,
				follower : this.follower,
                year:this.form.year,
                month:this.form.month,
                //pageIndex: this.currentPage -1,
                //pageSize: this.pageSize,
                page:{
                    begin:(this.currentPage -1) * this.pageSize,
                    length:this.pageSize
                }
            };
            getCompFollowList(params).then(res =>{
                this.tableData = res.mm;
                this.pagetotal = res.total;
            })
        },
        handleRowChange(row){
            this.currentRow = row;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.loadData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.loadData();
        },
        formatProgress:function (row,col){
            if(row.progress && col.property == 'progress'){
                return progressArr.find(item =>item.id == row.progress).text;
            }
            return;
        },
        formatProStatus:function(row,col){
            if(row.processStatus && col.property == 'processStatus'){
                return processStatusArr.find(item =>item.id == row.processStatus).text;
            }
            return;
        },
        formatOperDate:function (row,col) {
            if(row.operateDate && col.property == 'operateDate'){
                return util.formatDate.format(new Date(row.operateDate), 'yyyy-MM-dd')
            }
            return;
        },
        formatAppDate:function (row,col) {
            if(row.approvalDate && col.property == 'approvalDate'){
                return util.formatDate.format(new Date(row.approvalDate), 'yyyy-MM-dd')
            }
            return;
        },
        yearChange(val){

        },
        monthChange(val){

        }
    }
}

</script>
<style lang='less' scoped>

</style>