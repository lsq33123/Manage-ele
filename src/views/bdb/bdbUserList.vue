<!-- 用户列表 -->
<template>
    <div>
        <el-container  style="height:100%;width:100%">
            <el-header>

            </el-header>
            <el-main style="height:100%;width:100%;padding:0px">
            <el-table ref='table' :data='tableData' border highlight-current-row  :height="tableHeight" 
                @selection-change='rowChange' @row-click="rowClick">
                <el-table-column type="index" label="序号" header-align="center" width="80"></el-table-column>
                <el-table-column property="areaName" label="区域名称" header-align="center" min-width="100" ></el-table-column>
                <el-table-column property="compName" label="公司名称" header-align="center" min-width="100" ></el-table-column>
                <el-table-column property="userName" label="用户名称" header-align="center" min-width="100" ></el-table-column>
                <el-table-column property="mobile" label="联系电话" header-align="center"  min-width="100" ></el-table-column>
                <el-table-column property="loginName" label="登录账号" header-align="center" min-width="100" ></el-table-column>
                <el-table-column property="createTime" label="登录时间" header-align="center" min-width="100" :formatter="timeFormat"></el-table-column>
            </el-table>
            </el-main>
            <el-footer style="text-align: right;margin-right: 45px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10,20,50,100]" :page-size="pageSize" :total="pageTotal"
                layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import {bdbUserList} from '@/api/bdbApi';
import util from '@/common/js/util'

export default {
    data() {
        return {
            tableData:[],
            token:localStorage.getItem('token'),
            tableHeight:window.innerHeight - 160 - 50,
            
            currentPage: 0, //当前页
            pageSize: 20, //分页数
            pageTotal: 0//总条数
        };
    },
    mounted(){
        this.loadData();
    //window.innerHeight:浏览器的可用高度
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //后面的50：根据需求空出的高度，自行调整

    },
    methods: {
        loadData(){
            let params ={
                token:this.token,
                page:{
                    begin:this.currentPage*this.pageSize+1,
                    length:this.pageSize
                }
            };
            bdbUserList(params).then(res =>{
                this.tableData = res.data;
                this.pageTotal = res.page.count;
                this.currentPage = res.page.currentPage;
            })
        },
        rowChange(){

        },
        rowClick(){

        },
        handleSizeChange(val){
            this.pageSize = val;
            this.loadData();
        },
        handleCurrentChange(val){
            this.currentPage = val-1;
            this.loadData();
        },
        timeFormat: function(row, column) {
            var val = row[column.property];
            if(val){
                val = util.formatDate.format(new Date(val),'yyyy-MM-dd hh:mm');
            }
            return val;
        },
    }
};
</script>
<style lang='less' scoped>
.el-footer{
    height: auto !important;
    padding:0px !important;
}

</style>