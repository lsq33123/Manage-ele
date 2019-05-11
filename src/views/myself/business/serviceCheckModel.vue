<!-- 运营检核模板 -->
<template>
    <div v-loading="loading">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="loadData()">查询</el-button>
                    <el-button type="primary" @click="saveData()">保存</el-button>
                </el-form-item>
            </el-form>
        </el-col>
         <!-- <el-tabs type="border-card">
            <el-tab-pane label="启用的模板">
                          </el-tab-pane>
            <el-tab-pane label="禁用的模板">
                禁用
            </el-tab-pane>
        </el-tabs>  -->

                <elx-editable ref='elxEditable' 
                    :data.sync='tableData' 
                    class='click-table11' 
                    border 
                    :height="tableHeight" 
                    size='small' 
                    row-key='id' 
                    :edit-config="{trigger:'click',mode:'cell'}">
                    <elx-editable-column type="selection" width="55"></elx-editable-column>
                    <elx-editable-column width="40">
                        <template v-slot:header="scope">
                        <el-tooltip class="item" placement="top">
                            <div slot="content">按住后可以上下拖动排序，<br>完成后点击保存即可！</div>
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                        </template>
                        <template>
                        <i class="el-icon-rank drag-btn"></i>
                        </template>
                    </elx-editable-column>
                    <elx-editable-column prop="MODELID" label="ID" width="80"></elx-editable-column>
                    <elx-editable-column prop="MENUID" label="MENUID" header-align="center" min-width="60" key="1" v-if="false"> </elx-editable-column>
                    <elx-editable-column prop="INDEXNO" label="排序" header-align="center" min-width="50" > </elx-editable-column>
                    <elx-editable-column prop="CHECKSCENES" label="检核场景" header-align="center" min-width="100" :edit-render="{type:'default'}"> 
                        <template v-slot:edit="scope">
                            <el-input type="textarea" v-model="scope.row.CHECKSCENES" size="mini" @input="$refs.elxEditable.updateStatue(scope)"></el-input>
                        </template>
                        <template v-slot="scope">{{ scope.row.CHECKSCENES }}</template>
                    </elx-editable-column>
                    <elx-editable-column prop="DEPARTMENT" label="归属部门" header-align="center" min-width="100" :edit-render="{type:'default'}"> 
                        <template v-slot:edit="scope">
                            <el-input type="textarea" v-model="scope.row.DEPARTMENT" size="mini" @input="$refs.elxEditable.updateStatue(scope)"></el-input>
                        </template>
                        <template v-slot="scope">{{ scope.row.DEPARTMENT }}</template>
                    </elx-editable-column>
                    <elx-editable-column prop="TYPENAME" label="服务类型" header-align="center" min-width="100" :edit-render="{type:'default'}"> 
                        <template v-slot:edit="scope">
                            <el-input v-model="scope.row.TYPENAME" size="mini" @input="$refs.elxEditable.updateStatus(scope)"></el-input>
                        </template>
                        <template v-slot="scope">{{ scope.row.TYPENAME }}</template>
                    </elx-editable-column>
                    <elx-editable-column prop="POINT" label="关键点" header-align="center" min-width="100" :edit-render="{type:'default'}"> 
                        <template v-slot:edit="scope">
                            <el-input v-model="scope.row.POINT" size="mini" @input="$refs.elxEditable.updateStatus(scope)"></el-input>
                        </template>
                        <template v-slot="scope">{{ scope.row.POINT }}</template>
                    </elx-editable-column>
                    <elx-editable-column prop="STANDARDREMARK" label="标准注释/检核要求" header-align="center" min-width="300" :edit-render="{type:'default'}"> 
                        <template v-slot:edit="scope">
                            <el-input type="textarea" v-model="scope.row.STANDARDREMARK" :autosize="{ minRows: 2, maxRows: 4}" @input="$refs.elxEditable.updateStatus(scope)"></el-input>
                        </template>
                        <template v-slot="scope">{{ scope.row.STANDARDREMARK }}</template>
                    </elx-editable-column>
                    <elx-editable-column prop="CHECKRULE" label="评分细则" header-align="center" min-width="250" :edit-render="{type:'default'}"> 
                        <template v-slot:edit="scope">
                            <el-input type="textarea" v-model="scope.row.CHECKRULE" :autosize="{ minRows: 2, maxRows: 4}" @input="$refs.elxEditable.updateStatus(scope)"></el-input>
                        </template>
                        <template v-slot="scope">{{ scope.row.CHECKRULE }}</template>
                    </elx-editable-column>
                    <elx-editable-column prop="STANDARDSCORE" label="标准分数" header-align="center" min-width="100" :edit-render="{type:'default'}"> 
                        <template v-slot:edit="scope">
                            <el-input v-model="scope.row.STANDARDSCORE" size="mini" @input="$refs.elxEditable.updateStatus(scope)"></el-input>
                        </template>
                        <template v-slot="scope">{{ scope.row.STANDARDSCORE }}</template>
                    </elx-editable-column> 
                    <elx-editable-column prop="ISDISABLED" label="是否启用" min-width="100" :edit-render="{type: 'visible'}">
                        <template v-slot:edit="scope">
                        <el-switch v-model="scope.row.ISDISABLED" size="mini"  @change="$refs.elxEditable.updateStatus(scope)"></el-switch>
                        </template>
                    </elx-editable-column>
                </elx-editable>
  
      
    </div>
</template>

<script>

import Sortable from 'sortablejs'
import { getIntfc,getMenuSave } from "@/api/bdbApi";
export default {
    data() {
        return {
            loading:false,
            tableData: [],
            tableHeight: window.innerHeight - 160 - 70,
            currentRow:{},
            dropCol: [{
                    label: '检核场景',
                    prop: 'CHECKSCENES'
                },
                {
                    label: '归属部门',
                    prop: 'DEPARTMENT'
                },
                {
                    label: '服务类型',
                    prop: 'TYPENAME'
                }
            ],
        };
    },

    components: {
    },

    computed: {},
    created(){
        this.rowDrop();
        this.loadData();
        //this.columnDrop() ;
    },
    methods: {
        loadData() {
            this.loading = true;
            let params = {
                p:{
                    def:{
                        ds:"saas",
                        url:"com.hsweb.management.operateCheck.getOperatingCheckModel"
                    },
                    "parentId":"1"
                }
            };
            getIntfc(params)
                .then(res => {
                    const data = res.result;
                    const dataTempArr = res.result;
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        element.ISDISABLED =(element.ISDISABLED == 0?true:false);
                        dataTempArr.push(element);
                    }
                    this.tableData = dataTempArr;
                    //this.tableData = res.result;
                    this.loading = false;
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                });
        },
        saveData(){
            let params = {
                serParamsArr: [],
                serAdd:[],
                serRemoved:[],
                serUpdate:this.getConvertArray(this.tableData)
            }
            getMenuSave(params).then(res =>{
                this.$message({
                    type:'success',
                    message:'保存成功'
                }) 
                this.loadData();
            }).catch(err =>{
                this.$message({
                    type:'error',
                    message:'保存失败'
                })
            })
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        rowDrop () {
            this.$nextTick(() => {
                Sortable.create(this.$el.querySelector('.el-table__body-wrapper tbody'), {
                handle: '.drag-btn',
                onEnd: ({ newIndex, oldIndex }) => {
                    let currRow = this.tableData.splice(oldIndex, 1)[0]
                    console.log(newIndex)
                    console.log(oldIndex)
                    console.log(currRow)
                    this.tableData.splice(newIndex, 0, currRow)
                }
                })
            })
        },
           //列拖拽
        // columnDrop() {
        //     this.$nextTick(() => {
        //         Sortable.create(this.$el.querySelector('.el-table__header-wrapper tr'), {
        //         animation: 180,
        //         delay: 0,
        //         onEnd: evt => {
        //             const oldItem = this.dropCol[evt.oldIndex]
        //             this.dropCol.splice(evt.oldIndex, 1)
        //             this.dropCol.splice(evt.newIndex, 0, oldItem)
        //         }
        //         })
        //     })
        // },
        getConvertArray(serviceList){//转化大小写
 		let serviceDetailArr = [];
            //服务流serviceDetailArr程
            for(let i = 0; i<serviceList.length; i++) {
                let serviceDetailData = {};
                serviceDetailData.menuid = serviceList[i].TYPEID;
                serviceDetailData.pointno = serviceList[i].POINTNO;
                serviceDetailData.id = serviceList[i].MODELID;
                serviceDetailData.orderno = serviceList[i].MODELNO;
                serviceDetailData.point = serviceList[i].POINT;
                serviceDetailData.standardscore = serviceList[i].STANDARDSCORE;
                serviceDetailData.standardremark = serviceList[i].STANDARDREMARK;
                serviceDetailData.standard = serviceList[i].STANDARD;
                serviceDetailData.indexno = serviceList[i].INDEXNO;
                serviceDetailData.menuname = serviceList[i].TYPENAME;
                serviceDetailData.checkscenes = serviceList[i].CHECKSCENES;
                serviceDetailData.department = serviceList[i].DEPARTMENT;
                serviceDetailData.checkrule = serviceList[i].CHECKRULE;
                serviceDetailData.isdisabled = serviceList[i].ISDISABLED == true?0:1;
                serviceDetailArr.push(serviceDetailData);
            }
            return serviceDetailArr;
        }
    }
};
</script>
<style lang='less' scoped>
.click-table11-oper {
  margin-bottom: 18px;
}
.click-table11-pagination {
  margin-top: 18px;
  text-align: right;
}
.click-table11 .drag-btn {
  font-size: 16px;
  cursor: move;
}
.click-table11.elx-editable .elx-editable-row.new-insert,
.click-table11.elx-editable .elx-editable-row.new-insert:hover>td {
  background-color: #f0f9eb;
}
.click-table11 .el-table__body tr.hover-row>td,
.click-table11 .el-table__body .el-table__row:hover>td {
  background-color: inherit;
}
.click-table11.elx-editable .elx-editable-row.sortable-ghost,
.click-table11.elx-editable .elx-editable-row.sortable-chosen {
  background-color: #fff6b2;
}
</style>