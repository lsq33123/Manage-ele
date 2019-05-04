<!-- 事故推送送修分析 -->
<template>
    <div>
        <el-container>
            <el-header></el-header>
            <el-main>
                <el-table
                    ref="table"
                    :data="tableData"
                    :height="tableHeight"
                    border
                    highlight-current-row
                >
                    <el-table-column type="index" label="序号" header-align="center" min-width="100"></el-table-column>
                    <el-table-column
                        property="areaName"
                        label="区域"
                        header-align="center"
                        min-width="100"
                    ></el-table-column>
                    <el-table-column
                        property="compNo"
                        label="店号"
                        header-align="center"
                        min-width="100"
                    ></el-table-column>
                    <el-table-column
                        property="compName"
                        label="店名"
                        header-align="center"
                        min-width="100"
                    ></el-table-column>
                    <el-table-column
                        property="srTotal"
                        label="事故车维修净收入"
                        header-align="center"
                        min-width="100"
                    ></el-table-column>
                    <el-table-column
                        property="netInCome"
                        label="维修净收入"
                        header-align="center"
                        min-width="100"
                    ></el-table-column>
                    <el-table-column
                        property="tcTotal"
                        label="事故车台次"
                        header-align="center"
                        min-width="100"
                    ></el-table-column>
                    <el-table-column
                        property="srRate"
                        label="事故车产值比"
                        header-align="center"
                        min-width="100"
                    ></el-table-column>
                    <el-table-column
                        property="srRateM2m"
                        label="环比"
                        header-align="center"
                        min-width="100"
                    ></el-table-column>
                    <el-table-column
                        property="srRateY2y"
                        label="同比"
                        header-align="center"
                        min-width="100"
                    ></el-table-column>
                </el-table>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
import { getAccidentReport } from "@/api/bdbApi";
export default {
    data() {
        return {
            tableData: [],
            tableHeight: "200"
        };
    },
    mounted(){
        this.loadData();
    },
    methods: {
        loadData() {
            let params = {
                params: {
                    toComp: 1,
                    areaId: "",
                    compCode: "",
                    year: "2019",
                    month: "04"
                },
                page: {
                    begin: 0,
                    length: 20000
                }
            };
            getAccidentReport(params).then(res =>{
                this.tableData = res.data;

            })
        }
    }
};
</script>
<style lang='less' scoped>
</style>