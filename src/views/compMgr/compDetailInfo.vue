<!-- 分店面积及车间工位数 -->
<template>
  <div>
      <el-container>
          <el-header></el-header>
          <el-main>
              <el-table ref="table" :data="tableData">
                    <el-table-column type="index" header-align="center" width="80" ></el-table-column>
                    <el-table-column property="customId" label="店号" header-align="center" min-width="100"> </el-table-column>
                    <el-table-column property="shortName" label="分店名称" header-align="center" min-width="100"> </el-table-column>
                    <el-table-column property="areaName" label="所属区域" header-align="center" min-width="100"> </el-table-column>
                    <el-table-column property="compLevel" label="分店类型" header-align="center" min-width="100"> </el-table-column>
                    <el-table-column property="compType" label="分店性质" header-align="center" min-width="100"> </el-table-column>
                    <el-table-column property="establishmentDate" label="开业日期" header-align="center" min-width="100"> </el-table-column>
                    <el-table-column label="建筑面积(㎡)" haeader-align="center"> 
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
                    <el-table-column label="工位" haeader-align="center"> 
                        <el-table-column property="jbStat" label="精保" header-align="center" min-width="100"> </el-table-column>
                        <el-table-column property="jdStat" label="机电" header-align="center" min-width="100"> </el-table-column>
                        <el-table-column property="lbStat" label="轮保" header-align="center" min-width="100"> </el-table-column>
                        <el-table-column property="bpStat" label="钣喷" header-align="center" min-width="100"> </el-table-column>
                        <el-table-column property="mrStat" label="美容" header-align="center" min-width="100"> </el-table-column>
                    </el-table-column>
                    <el-table-column label="产品工位" haeader-align="center"> 
                        <el-table-column property="jbgfStatQty" label="精保工坊" header-align="center" min-width="100"> </el-table-column>
                        <el-table-column property="jhltStatQty" label="嘉护轮胎" header-align="center" min-width="100"> </el-table-column>
                        <el-table-column property="xmgfStatQty" label="洗美工坊" header-align="center" min-width="100"> </el-table-column>
                        <el-table-column property="jrbpStatQty" label="匠人钣喷" header-align="center" min-width="100"> </el-table-column>
                    </el-table-column>
                    <el-table-column label="停车位" haeader-align="center"> 
                        <el-table-column property="forrepairp" label="待修" header-align="center" min-width="100"> </el-table-column>
                        <el-table-column property="completep" label="交车" header-align="center" min-width="100"> </el-table-column>
                        <el-table-column property="clientp" label="客停" header-align="center" min-width="100"> </el-table-column>
                        <el-table-column property="staffp" label="员工" header-align="center" min-width="100"> </el-table-column>
                    </el-table-column>
                    <el-table-column label="其他信息" haeader-align="center"> 
                        <el-table-column property="operateDate" label="修改日期" header-align="center" min-width="100"> </el-table-column>
                        <el-table-column property="operator" label="修改人" header-align="center" min-width="100"> </el-table-column>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer style="text-align: right;margin-right: 45px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrChange"
                    :current-page="currentPage" :page-sizes='[10,20,50,100]' :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                    :total="pagetotal">
                </el-pagination>
          </el-footer>
      </el-container>
  </div>
</template>

<script>
export default {
    data () {
        return {
            tableData:[],

            currentPage: 0, //当前页
            pageSize: 20, //分页数
            pagetotal: 0//总条数
        };
    },

    components: {},

    computed: {},

    mounted(){
        this.loadData();
    },

    methods: {
        loadData(){

        },
        handleSizeChange(val){

        },
        handleCurrentChange(val){

        }
    }
}

</script>
<style lang='less' scoped>
</style>