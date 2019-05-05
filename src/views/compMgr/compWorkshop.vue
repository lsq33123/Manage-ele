<!-- 分店面积及车间工位数 -->
<template>
    <div>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" >
                <el-form-item>
                    <selectAreaComp @getValue="getValue" :areaClear="true" :compClear="true"></selectAreaComp>
                    <el-button type="primary" @click="addRow">新增</el-button>
                    <el-button type="primary" @click="editRow">修改</el-button>
                </el-form-item>
            </el-form>  
        </el-col>
    
        <el-table ref="table" :data="tableData" :height="tableHeight">
            <el-table-column type="index" header-align="center" label="序号" width="70" ></el-table-column>
            <el-table-column property="customId" label="店号" header-align="center" min-width="80"> </el-table-column>
            <el-table-column property="shortName" label="分店名称" header-align="center" min-width="100"> </el-table-column>
            <el-table-column property="areaName" label="所属区域" header-align="center" min-width="100"> </el-table-column>
            <el-table-column property="compLevel" label="分店类型" header-align="center" min-width="100" :formatter="levelForat"> </el-table-column>
            <el-table-column property="compType" label="分店性质" header-align="center" min-width="100"> </el-table-column>
            <el-table-column property="establishmentDate" label="开业日期" header-align="center" min-width="100"> </el-table-column>
            <el-table-column label="建筑面积(㎡)" header-align="center"> 
                <el-table-column property="receptionOfficeArea" label="接待办公区面积" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="mtstationtTatol" label="接待工位(座位数)" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="customerLoungeArea" label="客休室面积" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="staffOfficeArea" label="员工办公区面积" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="workshopArea" label="车间总面积" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="jdWorkshop" label="机电面积" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="bpWorkshop" label="钣喷面积" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="xmWorkshop" label="洗车美容" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="totalArea" label="使用面积总数" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="parkingArea" label="停车区面积" header-align="center" min-width="100"> </el-table-column>
            </el-table-column>
            <el-table-column label="工位" header-align="center"> 
                <el-table-column property="jbStat" label="精保" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="jdStat" label="机电" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="lbStat" label="轮保" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="bpStat" label="钣喷" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="mrStat" label="美容" header-align="center" min-width="100"> </el-table-column>
            </el-table-column>
            <el-table-column label="产品工位" header-align="center"> 
                <el-table-column property="jbgfStatQty" label="精保工坊" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="jhltStatQty" label="嘉护轮胎" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="xmgfStatQty" label="洗美工坊" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="jrbpStatQty" label="匠人钣喷" header-align="center" min-width="100"> </el-table-column>
            </el-table-column>
            <el-table-column label="停车位" header-align="center"> 
                <el-table-column property="forrepairp" label="待修" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="completep" label="交车" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="clientp" label="客停" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="staffp" label="员工" header-align="center" min-width="100"> </el-table-column>
            </el-table-column>
            <el-table-column label="其他信息" header-align="center"> 
                <el-table-column property="operateDate" label="修改日期" header-align="center" min-width="100"> </el-table-column>
                <el-table-column property="operator" label="修改人" header-align="center" min-width="100"> </el-table-column>
            </el-table-column>
        </el-table>

        <div style="text-align: right;margin-right: 45px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes='[10,20,50,100]' :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="pagetotal">
            </el-pagination>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" >
                        <el-button type="primary" @click="saveForm('form')">保存</el-button>
                        <el-button  @click="dialogTableVisible = false">取消</el-button>
        </el-dialog>
    </div>
</template>

<script>
import {getCompWorkShop} from '@/api/bdbApi'
import selectAreaComp from '@/components/selectAreaComp'
const clevel = [{id:"01070102",text:"旗舰店"},{id:"01070103",text:"标准店"},{id:"01070104",text:"小型店"},{id:"01070105",text:"社区店"}];
const ctype = [{id:"1",text:"直营"},{id:"2",text:"加盟"}];
export default {
    data () {
        return {
            tableData:[],
            tableHeight: window.innerHeight - 160 - 70,
            currentPage: 0, //当前页
            pageSize: 20, //分页数
            pagetotal: 0,//总条数
            dialogTitle:'',
            dialogTableVisible:false,
        };
    },

    components: {
        selectAreaComp
    },

    computed: {},

    mounted(){
        this.loadData();
    },

    methods: {
        loadData(){
            let params = {

            };
            getCompWorkShop(params).then(res =>{
                this.tableData = res.mm;
                this.pagetotal = res.total;
            }).catch(err =>{
                console.log(err)
            })
        },
        handleSizeChange(val){
            this.pageSize = val;
            this.loadData();
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.loadData();
        },
        getValue(val){

        },
        levelForat:function (row,col) {
            if(row.compLevel && col.property == 'compLevel'){
                return clevel.find(item =>item.id === row.compLevel).text;
            }
            return ;
        },
        addRow(){
            this.dialogTableVisible=true;
            this.dialogTitle='新增';
        },
        editRow(){

        }
    }
}

</script>
<style lang='less' scoped>
</style>