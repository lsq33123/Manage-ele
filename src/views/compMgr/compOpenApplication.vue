<!-- ERP开通申请 -->
<template>
    <div>
        <div style="text-align:center;margin-top: 20px;">
            <h1 style="margin: 10px 0px 10px 0px;display: inline;">新店系统启动申请表</h1>
            <br>以下信息将以系统结算单的形式
            <span class="red">面对客户且关系底层数据</span>，请
            <span class="red">慎重</span>填写
        </div>
        <el-form
            ref="form"
            :model="form"
            :rules="formRules"
            label-width="200px"
            size="small"
            style="margin-left:40px;"
        >
            <div class="titleDiv">
                <span class="titleText">基本信息</span>
            </div>
            <br>
            <el-row class="wlRowDiv">
                <el-col :span="8" class="colHeight">
                    <el-form-item label="申请人" prop="creator">
                        <el-input class="inputWidth" v-model="form.creator" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="colHeight">
                    <el-form-item label="申请日期" prop="creator">
                        <el-input class="inputWidth" v-model="form.creator" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="wlRowDiv">
                <el-col :span="8" class="colHeight">
                    <el-form-item label="门店简称" prop="compShortName">
                        <el-input class="inputWidth" v-model="form.compShortName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="colHeight">
                    <el-form-item label="门店店号" prop="compCode">
                        <el-input class="inputWidth" v-model="form.compCode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="门店注册名称" prop="compName">
                <el-col :span="15">
                    <el-input type="textarea" v-model="form.compName" style="width:648px;"></el-input>
                </el-col>
            </el-form-item>

            <div class="titleDiv">
                <span class="titleText">联系信息</span>
            </div>
            <br>

            <el-row class="wlRowDiv">
                <el-col :span="8" class="colHeight">
                    <el-form-item label="省份" prop="provinces">
                        <el-select class="inputWidth" v-model="form.provinces">
                            <el-option
                                v-for="item in provincesList"
                                :key="item.Code"
                                :value="item.name"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="colHeight">
                    <el-form-item label="简称" prop="provincesShort">
                        <el-input class="inputWidth" v-model="form.provincesShort" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="wlRowDiv">
                <el-col :span="8" class="colHeight">
                    <el-form-item label="城市" prop="city">
                        <el-select class="inputWidth" v-model="form.city">
                            <el-option
                                v-for="item in cityList"
                                :key="item.Code"
                                :value="item.name"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="colHeight">
                    <el-form-item label="县/市区" prop="county">
                        <el-select class="inputWidth" v-model="form.county">
                            <el-option
                                v-for="item in countyList"
                                :key="item.Code"
                                :value="item.name"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="详细地址" prop="address">
                <el-col :span="15">
                    <el-input type="textarea" v-model="form.address" style="width:648px;"></el-input>
                </el-col>
            </el-form-item>

            <el-row class="wlRowDiv">
                <el-col :span="8" class="colHeight">
                    <el-form-item label="邮编" prop="postalCode">
                        <el-input class="inputWidth" v-model="form.postalCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="colHeight">
                    <el-form-item label="分店电话" prop="tel">
                        <el-input class="inputWidth" v-model="form.tel"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="wlRowDiv">
                <el-col :span="8" class="colHeight">
                    <el-form-item label="传真" prop="fax">
                        <el-input class="inputWidth" v-model="form.fax"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="colHeight">
                    <el-form-item label="筹建负责人" prop="principal">
                        <el-input class="inputWidth" v-model="form.principal"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <div class="titleDiv" style="margin-top:0px;">
                <span class="titleText">业务信息</span>
            </div>
            <br>

            <el-row class="wlRowDiv">
                <el-col :span="8" class="colHeight">
                    <el-form-item label="事业类型" prop="compType">
                        <el-select class="inputWidth" v-model="form.compType">
                            <el-option
                                v-for="item in compTypeList"
                                :key="item.id"
                                :value="item.text"
                                :label="item.text"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="colHeight">
                    <el-form-item label="门店级别" prop="compLevel">
                        <el-select class="inputWidth" v-model="form.compLevel">
                            <el-option
                                v-for="item in compLevelList"
                                :key="item.id"
                                :value="item.text"
                                :label="item.text"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="wlRowDiv">
                <el-col :span="8" class="colHeight">
                    <el-form-item label="行政区域" prop="area">
                        <el-input class="inputWidth" v-model="form.area"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="colHeight">
                    <el-form-item label="投资模式" prop="model">
                        <el-select class="inputWidth" v-model="form.model">
                            <el-option
                                v-for="item in modelList"
                                :key="item.id"
                                :value="item.text"
                                :label="item.text"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="wlRowDiv">
                <el-col :span="8" class="colHeight">
                    <el-form-item label="启用财务系统" prop="useFinancialSystem">
                        <el-select class="inputWidth" v-model="form.useFinancialSystem">
                            <el-option
                                v-for="item in isTrueList"
                                :key="item.id"
                                :value="item.text"
                                :label="item.text"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="colHeight">
                    <el-form-item label="启用OA流程" prop="useOaProcess">
                        <el-select class="inputWidth" v-model="form.useOaProcess">
                            <el-option
                                v-for="item in isTrueList"
                                :key="item.id"
                                :value="item.text"
                                :label="item.text"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="wlRowDiv">
                <el-col :span="8" class="colHeight">
                    <el-form-item label="结算格式" prop="settleAccounts">
                        <el-select class="inputWidth" v-model="form.settleAccounts">
                            <el-option
                                v-for="item in settleAccountsList"
                                :key="item.id"
                                :value="item.text"
                                :label="item.text"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="colHeight">
                    <el-form-item label="营业日期" prop="openDate">
                        <el-date-picker
                            class="inputWidth"
                            v-model="form.openDate"
                            type="date"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <div class="titleDiv" style="margin-top:0px;">
                <span class="titleText">注册信息</span>
            </div>
            <br>

            <el-row class="wlRowDiv">
                <el-col :span="8" class="colHeight">
                    <el-form-item label="开户银行" prop="bank">
                        <el-input class="inputWidth" v-model="form.bank"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="colHeight">
                    <el-form-item label="银行账户" prop="bankAccount">
                        <el-input class="inputWidth" v-model="form.bankAccount"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="wlRowDiv">
                <el-col :span="8" class="colHeight">
                    <el-form-item label="启用维修电子档案" prop="useElectronicRecords">
                        <el-select class="inputWidth" v-model="form.useElectronicRecords">
                            <el-option
                                v-for="item in isTrueList"
                                :key="item.id"
                                :value="item.text"
                                :label="item.text"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="colHeight">
                    <el-form-item label="道路运输许可证号" prop="roadTransportPermit">
                        <el-input class="inputWidth" v-model="form.roadTransportPermit"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交申请</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import util from "@/common/js/util";
import { queryAddress } from "@/api/bdbApi";
const typeArr = [{ id: 1, text: "直营" }, { id: 0, text: "加盟" }];
const levelArr = [
    { id: 0, text: "旗舰店" },
    { id: 1, text: "标准店" },
    { id: 2, text: "小型店" },
    { id: 3, text: "社区店" }
];
const modelArr = [
    { id: 1, text: "控股" },
    { id: 2, text: "参股" },
    { id: 3, text: "加盟" }
];
const isTrueArr = [{ id: 1, text: "是" }, { id: 2, text: "否" }];
const settlementArr = [
    { id: 1, text: "正常格式" },
    { id: 2, text: "含配件管理费格式" }
];
export default {
    data() {
        return {
            form: {
                creator: "", //申请人
                createDate: "", //申请日期
                compName: "", //门店注册名称
                compShortName: "", //门店简称
                compCode: "", //门店店号
                provinces: "", //省份
                provincesShort: "", //省份简称
                city: "", //城市
                county: "", //县/市区
                address: "", //详细地址
                postalCode: "", //邮政编码
                tel: "", //分店电话
                fax: "", //传真
                principal: "", //筹建负责人
                compType: "", //事业类型
                compLevel: "", //门店级别
                area: "", //行政区域
                model: "", //投资模式
                useFinancialSystem: "", //启用财务系统
                useOaProcess: "", //启用OA审批流程
                settleAccounts: "", //结算格式
                openDate: "", //营业时间
                bank: "", //开户银行
                bankAccount: "", //银行账户
                useElectronicRecords: "", //启用维修电子档案上传
                roadTransportPermit: "" //道路运输许可证号
            },
            formRules: {
                creator:[{required:true,trigger:'blur',message:'请输入申请人'}],
                createDate:[{required:true,trigger:'blur',message:'请输入申请日期'}],
                compName:[{required:true,trigger:'blur',message:'请输入门店注册名称'}],
                compShortName:[{required:true,trigger:'blur',message:'请输入门店简称'}],
                compCode:[{required:true,trigger:'blur',message:'请输入门店店号'}],
                provinces:[{required:true,trigger:'change',message:'请选择省份'}],
                provincesShort:[{required:true,trigger:'blur',message:'请输入省份简称'}],
                city:[{required:true,trigger:'change',message:'请选择城市'}],
                county:[{required:true,trigger:'change',message:'请选择县/市区'}],
                address:[{required:true,trigger:'blur',message:'请输入详细地址'}],
                postalCode:[{required:true,trigger:'blur',message:'请输入邮政编码'}],
                compType:[{required:true,trigger:'blur',message:'请选择事业类型'}],
                compLevel:[{required:true,trigger:'change',message:'请选择门店级别'}],
                area:[{required:true,trigger:'change',message:'请选择行政区域'}],
                model:[{required:true,trigger:'change',message:'请选择投资模式'}],
                useFinancialSystem:[{required:true,trigger:'change',message:'请选择是否启用财务系统'}],
                useOaProcess:[{required:true,trigger:'change',message:'请选择是否启用OA审批流程'}],
                settleAccounts:[{required:true,trigger:'change',message:'请选择结算格式'}],
                openDate:[{required:true,trigger:'change',message:'请选择营业时间'}],
            },
            provincesList: [], //省份列表
            cityList: [], //城市列表
            countyList: [], //县/市区列表
            compTypeList: typeArr, //事业类型
            compLevelList: levelArr, //门店级别
            modelList: modelArr, //投资模式
            settleAccountsList: settlementArr, //结算格式
            isTrueList: isTrueArr
        };
    },

    components: {},

    computed: {},

    mounted() {
        this.initData();
    },

    methods: {
        initData() {
            let atrr = localStorage.getItem("atrr");
            if (atrr) {
                atrr = JSON.parse(atrr);
                this.form.creator = atrr.userName;
                this.form.createDate = util.formatDate.format(
                    new Date(),
                    "yyyy-MM-dd"
                );
            }
            //获取省份列表
            queryAddress().then(res => {
                this.provincesList = res.rs;
            });
        },
        onSubmit(formEl) {
            this.$refs[formEl].validate(valid => {
                if (valid) {
                    this.$message({
                        type: "success",
                        message: "提交成功"
                    });
                }
            });
        }
    }
};
</script>
<style lang='less' scoped>
.colHeight {
    height: 32px;
}
.titleDiv {
    border-bottom: 1px solid #ccc;
    margin-top: 20px;
}
.titleText {
    font-weight: 400;
    font-size: 18px;
    color: #666;
    border-bottom: 2px solid #23c0fa;
    display: inline-block;
    // line-height: 26px;
}
.red {
    color: red;
}
.inputWidth {
    width: 250px;
}
.wlRowDiv {
    margin-bottom: 20px;
}
</style>