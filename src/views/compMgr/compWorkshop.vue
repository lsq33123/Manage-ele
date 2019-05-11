<!-- 分店面积及车间工位数 -->
<template>
    <div>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <selectAreaComp @getValue="getValue" :areaClear="true" :compClear="true"></selectAreaComp>
                    <el-input placeholder="店号" v-model="customId" style="width:100px;"></el-input>
                    <el-button type="primary" @click="loadData()">查询</el-button>
                    <el-button type="primary" @click="addRow">新增</el-button>
                    <el-button type="primary" @click="editRow">修改</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <el-table ref="table" :data="tableData" :height="tableHeight" size="small" v-loading="loading" @row-change="handleRowChange">
            <el-table-column type="index" header-align="center" label="序号" width="70" fixed></el-table-column>
            <el-table-column property="id" label="ID" header-align="center" min-width="80" v-if="false "> </el-table-column>
            <el-table-column property="customId" label="店号" header-align="center" min-width="80" fixed> </el-table-column>
            <el-table-column property="shortName" label="分店名称" header-align="center" min-width="100" fixed> </el-table-column>
            <el-table-column property="areaName" label="所属区域" header-align="center" min-width="100" fixed> </el-table-column>
            <el-table-column property="compLevel" label="分店类型" header-align="center" min-width="100" fixed :formatter="levelForat"> </el-table-column>
            <el-table-column property="compType" label="分店性质" header-align="center" min-width="100" fixed :formatter="typeFormat"> </el-table-column>
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
        <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" top="10vh">
            <el-form ref="form" :model="form"  :rules="formRule" size="small" label-width="120px">
                <el-tabs type="card">
                    <el-tab-pane label="基本信息">
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="门店名称" prop="compCode">
                                    <el-select class="inputWidth" v-model="form.compCode">
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="门店编号" >
                                    <el-input class="inputWidth" v-model="form.customId" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="门店性质" >
                                    <el-input class="inputWidth" v-model="form.compLevel" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="所属区域" >
                                    <el-input class="inputWidth" v-model="form.areaName" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="面积信息">
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="接待办公区" >
                                    <el-input class="inputWidth" v-model="form.receptionOfficeArea"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="接待工位数" >
                                    <el-input class="inputWidth" v-model="form.mtstationtTatol"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="客休室" >
                                    <el-input class="inputWidth" v-model="form.customerLoungeArea"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="员工办公区" >
                                    <el-input class="inputWidth" v-model="form.staffOfficeArea"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="车间总面积" >
                                    <el-input class="inputWidth" v-model="form.workshopArea"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="机电面积" >
                                    <el-input class="inputWidth" v-model="form.jdWorkshop"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="钣喷面积" >
                                    <el-input class="inputWidth" v-model="form.bpWorkshop"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="洗车美容" >
                                    <el-input class="inputWidth" v-model="form.xmWorkshop"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="使用面积总数" >
                                    <el-input class="inputWidth" v-model="form.totalArea"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="停车区面积" >
                                    <el-input class="inputWidth" v-model="form.parkingArea"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="工位数量">
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="精保" >
                                    <el-input class="inputWidth" v-model="form.jbStat"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="机电" >
                                    <el-input class="inputWidth" v-model="form.jdStat"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="轮保" >
                                    <el-input class="inputWidth" v-model="form.lbStat"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="钣喷" >
                                    <el-input class="inputWidth" v-model="form.bpStat"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="美容" >
                                    <el-input class="inputWidth" v-model="form.mrStat"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="产品工位">
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="精保工坊" >
                                    <el-input class="inputWidth" v-model="form.jbgfStatQty"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="嘉护轮胎" >
                                    <el-input class="inputWidth" v-model="form.jhltStatQty"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="洗美工坊" >
                                    <el-input class="inputWidth" v-model="form.xmgfStatQty"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="匠人钣喷" >
                                    <el-input class="inputWidth" v-model="form.jrbpStatQty"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="停车位数量">
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="待修" >
                                    <el-input class="inputWidth" v-model="form.forrepairp"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="交车" >
                                    <el-input class="inputWidth" v-model="form.completep"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="wlRowDiv">
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="客停" >
                                    <el-input class="inputWidth" v-model="form.clientp"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" class="colHeight">
                                <el-form-item label="员工" >
                                    <el-input class="inputWidth" v-model="form.staffp"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <div style="text-align:right;padding-right:20px;">
            <el-button type="primary" @click="saveForm('form')">保存</el-button>
            <el-button @click="dialogTableVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getCompWorkShop } from "@/api/bdbApi";
import selectAreaComp from "@/components/selectAreaComp";
const clevel = [
    { id: "01070102", text: "旗舰店" },
    { id: "01070103", text: "标准店" },
    { id: "01070104", text: "小型店" },
    { id: "01070105", text: "社区店" }
];
const ctype = [{ id: "1", text: "直营" }, { id: "2", text: "加盟" }];
export default {
    data() {
        return {
            tableData: [],
            tableHeight: window.innerHeight - 160 - 70,
            currentPage: 0, //当前页
            pageSize: 20, //分页数
            pagetotal: 0, //总条数
            dialogTitle: "",//弹出框标题
            dialogTableVisible: false,
            areaName: "",//状态栏
            compName: "",//状态栏
            customId: "",//状态栏
            loading:false,
            currentRow:{},
            form: {
                customId:'',//店号
                compCode:'',//分店名称
                compLevel:'',//分店性质
                areaName:'',//所属区域
                receptionOfficeArea:'',//接待工位数
                mtstationtTatol:'',//接待工位数
                customerLoungeArea:'',//客休室面积
                staffOfficeArea:'',//员工办公区面积
                workshopArea:'',//车间总面积
                jdWorkshop:'',//机电面积
                bpWorkshop:'',//钣喷面积
                xmWorkshop:'',//洗车美容
                totalArea:'',//使用面积总数
                parkingArea:'',//停车区面积
                jbStat:'',//精保
                jdStat:'',//机电
                lbStat:'',//轮保
                bpStat:'',//钣喷
                mrStat:'',//美容
                jbgfStatQty:'',//精保工坊
                jhltStatQty:'',//嘉护轮胎
                xmgfStatQty:'',//洗美工坊
                jrbpStatQty:'',//匠人钣喷
                forrepairp:'',//待修
                completep:'',//交车
                clientp:'',//客停
                staffp:'',//员工
            },
            formRule:{
                compCode:[{required:true,message:'请选择门店',trigger:'change'}]
            }
        };
    },

    components: {
        selectAreaComp
    },

    computed: {},

    mounted() {
        this.loadData();
    },

    methods: {
        loadData() {
            this.loading = true;
            let params = {
                areaName:this.areaName,
                compName:this.compName,
                customId:this.customId,
                pageIndex: this.currentPage -1,
                pageSize: this.pageSize,
                page:{

                }
            };
            getCompWorkShop(params)
                .then(res => {
                    this.tableData = res.mm;
                    this.pagetotal = res.total;
                    this.loading = false;
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.loadData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.loadData();
        },
        getValue(val) {
            if(val.area != {}){
                this.areaName = val.area.areaName;
            }
            if(val.comp != {}){
                this.compName = val.comp.shortName;
            }
        },
        levelForat: function(row, col) {
            if (row.compLevel && col.property == "compLevel") {
                return clevel.find(item => item.id === row.compLevel).text;
            }
            return;
        },
        typeFormat(row,col){
            if (row.compType && col.property == "compType") {
                return ctype.find(item => item.id == row.compType).text;
            }
            return;
        },
        handleRowChange(row){
            this.currentRow = row;
        },
        addRow() {
            this.dialogTitle = "新增";
            this.dialogTableVisible = true;
        },
        editRow() {
            if(this.currentRow.id == null){
                this.$message({
                    type:'warning',
                    message:'请选择需要修改的数据'
                });
            }else{
                this.dialogTitle = '修改';
                this.dialogTableVisible = true;
                this.form = this.currentRow;
            }
        },
        saveForm(formEl){
           this.$refs[formEl].validate(valid =>{
               if(valid){

               }
           }) 
        }
    }
};
</script>
<style lang='less' scoped>
.el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
}
.el-dialog__body {
    padding: 10px 20px;
}
.wlRowDiv {
    margin-bottom: 20px;
}
.inputWidth {
    width: 200px;
}
</style>