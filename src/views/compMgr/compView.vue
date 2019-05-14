<!-- 连锁门店分布 -->
<template>
    <div >
        <div id="pieC" style="height:220px;width:97%;" title>
            <!-- 饼图 -->
            <div style="width:40%;height:200px;float:left;position:relative;">
                <div id="mainProgress" style="width: 500px;height:200px;position:absolute;left:0;top:0"></div>
                <div style="position:absolute;left:0;top:0;">
                    <p id="tle" style="font-family:'微软雅黑';font-size: 18px;font-weight:bold;"></p>
                </div>
            </div>
            <!-- 建店数量 -->
            <div style="width:60%;height:200px;float:left">
                <div class id="form1">
                    <div style="height: 20px;"></div>
                    <table border="0">
                        <tr style="height:60px;">
                            <td class="trtitle" width="25%">直营</td>
                            <td class="trtitle" width="25%">加盟</td>
                            <td class="trtitle" width="25%"></td>
                            <td class="trtitle" width="25%"></td>
                        </tr>
                        <tr style="height:10px;">
                            <td class="trtitle"></td>
                            <td class="trtitle"></td>
                            <td class="trtitle"></td>
                            <td class="trtitle"></td>
                        </tr>
                        <tr style="height:50px;">
                            <td id="unfinishcount"></td>
                            <td id="delaycount"></td>
                            <td id="finishcount"></td>
                            <td id="scount"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <!-- 下部分 -->
        <div style="width:100%;height:350px;position: relative;">
            <div class="btnSty">
                <el-button size="small" @click="chnageType(0)">按区域分组</el-button>
                <el-button size="small" @click="chnageType(1)">按省份分组</el-button>
                <el-button size="small" @click="toMap()">查看地图分布</el-button>
            </div>    
            <div id="main" name="main" style="height:100%;width:100%;min-height:370px;" title="建店区域分布图"> </div>
        </div>
    </div>
</template>

<script>
import { getBySQL,queryCompProvince,queryCompArea } from "@/api/bdbApi";
import echarts from "echarts";
import  'echarts/theme/macarons.js'
export default {
    data() {
        return {
            onCount: 0,//直营数量
            warnCount: 0,//加盟数量
            delayCount: 0,
            noStartTaskCount: 0,
            delayTaskCount: 0,
            finishTaskCount: 0,
            taskCount: 0,
            sCount: 0,//全部分店的数量
            onCountRate: 0,//直营店占比
            warnCountRate: 0,//加盟店占比
            bEchartShowType:0,//区别底部echart显示 0按区域 1按省份
            areaArr:[],//图表的x轴
            obranchCount :0,//旗舰店数量
            tbranchCount :0,//标准店
            rbranchCount :0,//小型店
            fbranchCount :0//社区店
        };
    },

    components: {},

    computed: {},

    mounted() {
        this.loadData();
        this.loadBottomData();
    },

    methods: {
        loadData() {
            let params = {
                p: {
                    def: {
                        ds: "WbSystem", //数据源
                        url:
                            "com.saas.compdevelop.exand.getExandData.getExandCompType", //命名SQL路径
                        row2Cols: "COMPTYPE", //行转列转置列参数，多个用逗号隔开
                        sumCols: "NUM",
                        groupBy: "MANAGEMENT_DEPARTMENT", //行转列分组列参数，多个用逗号隔开
                        page: false //是否分页，配合分页参数使用
                    }
                }
            };
            getBySQL(params)
                .then(res => {
                    if (res.result) {
                        let sum = res.result[0];
                        this.onCount = sum["1_NUM"] || 0;
                        this.warnCount = sum["2_NUM"] || 0;
                        this.sCount = this.onCount + this.warnCount;
                        let tit = `&nbsp;&nbsp;华胜连锁分店<font size='6px' color='#40A9FF'>${
                            this.sCount
                        }</font>家`;
                        document.getElementById("tle").innerHTML = tit;
                        if (this.sCount > 0) {
                            this.onCountRate = Math.round(
                                (this.onCount / this.sCount) * 100
                            );
                            this.warnCountRate = Math.round(
                                (this.warnCount / this.sCount) * 100
                            );
                        } else {
                            this.onCountRate = 0;
                            this.warnCountRate = 0;
                        }
                        document.getElementById("unfinishcount").innerHTML =
                            "<font size='10px' face='微软雅黑 ' color='#40A9FF' >" +
                            this.onCount +
                            "</font>";
                        document.getElementById("delaycount").innerHTML =
                            "<font size='10px' face='微软雅黑 '  color='#5DD4D0'  >" +
                            this.warnCount +
                            "</font>";
                        this.loadTopEchart();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            
        },
        loadTopEchart() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById("mainProgress"));
            let option = {
                title: {
                    text: "",
                    //subtext: '纯属虚构',
                    //x:'center'
                    textStyle: {
                        fontFamily: "微软雅黑"
                    }
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    x: "left",
                    y: "center",
                    data: ["直营", "加盟"],
                    show: false
                },
                calculable: true,
                series: [
                    {
                        name: "",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: [
                            {
                                value: this.warnCount,
                                name: "加盟",
                                itemStyle: {
                                    normal: {
                                        color: "#5DD4D0"
                                    }
                                }
                            },
                            {
                                value: this.onCount,
                                name: "直营",
                                itemStyle: {
                                    normal: {
                                        color: "#40A9FF"
                                    }
                                }
                            }
                        ]
                    }
                ]
            };
            myChart.setOption(option);// 使用刚指定的配置项和数据显示图表。
        },
        loadBottomData(){
            //queryCompProvince,queryCompArea 
            if(this.bEchartShowType == 0){
                queryCompArea().then(res =>{
                this.areaArr = res.areaArr;
                this.obranchCount = res.obranchCount;
                this.tbranchCount = res.tbranchCount;
                this.rbranchCount = res.rbranchCount;
                this.fbranchCount = res.fbranchCount;
                this.loadBottomEchart();
                });
            }else{
                queryCompProvince().then(res =>{
                this.areaArr = res.areaArr;
                this.obranchCount = res.obranchCount;
                this.tbranchCount = res.tbranchCount;
                this.rbranchCount = res.rbranchCount;
                this.fbranchCount = res.fbranchCount;
                this.loadBottomEchart();
                });
            }
        },
        loadBottomEchart(){
            const myChart = echarts.init(document.getElementById('main'),'macarons');
            let rot = 0;//倾斜角度
            if(this.areaArr.length > 10){
                rot = -30;
            }
            const itemStyle = {
                normal: {
                    // color: [
                    // '#ff7f50','#87cefa','#da70d6','#32cd32'
                    // ]
                }
            }

            const soption = {
                title: {
                    text: '',
                    subtext: '',
                    x: 'center'
                },
                //color: ['#3398DB', '#ff7f50','#da70d6','#32cd32'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['旗舰店','标准店','小型店','社区店']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    //bottom: '3%',
                    //containLabel: true
                    y2:60
                },
                xAxis: [
                {
                    type: 'category',
                    axisLabel:{
                        interval:0,//横轴信息全部显示
                        rotate:rot,//-30度角倾斜显示 (省份)
                    },
                    data: this.areaArr,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
                ],
                yAxis: [
                {
                    type: 'value'
                }
                ],
                series: [
                {
                    name: '旗舰店',
                    type: 'bar',
                    data: this.obranchCount
                },
                {
                    name: '标准店',
                    type: 'bar',
                    barGap: 0,
                    data: this.tbranchCount
                },
                {
                    name: '小型店',
                    type: 'bar',
                    barGap: 0,
                    data: this.rbranchCount
                },
                {
                    name: '社区店',
                    type: 'bar',
                    barGap: 0,
                    data: this.fbranchCount
                }
                ]
            };
            //使用刚指定的配置项和数据显示图表。
            myChart.setOption(soption);
        },
        chnageType(e){
            this.bEchartShowType = e;
            this.loadBottomData();
        },
        toMap(){
            this.$router.push({path:'/compMap'});
        }

    }
};
</script>
<style lang='less' scoped>
.trtitle {
    font-size: 20px;
    /* color:#40A9FF; */
}

table {
    width: 100%;
    text-align: center;
    border-spacing: 2;
}
.btnSty{
    position: absolute;
    margin-left: 38px;
    z-index: 99;
}
</style>