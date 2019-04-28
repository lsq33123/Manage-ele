<!--  -->
<template>
    <div>
        <el-tabs v-model="activeTab" tabPosition="top" @tab-click="handleClick">
            <el-tab-pane label="车牌号" name="carNoTab"></el-tab-pane>
            <el-tab-pane label="车架号/底盘号" name="carVinTab"></el-tab-pane>
            <el-form
                ref="form"
                :model="form"
                :rules="formRule"
                label-position="right"
                label-width="120px"
            >
                <el-form-item label="车牌号:" v-show="showTab1" prop="carNo" >
                    <el-input placeholder="输入车牌号" v-model="form.carNo" class="inputWidth"></el-input>
                </el-form-item>
                <el-form-item label="车架号:" v-show="showTab2" prop="carVin" >
                    <el-input placeholder="输入车架号" v-model="form.carVin" class="inputWidth"></el-input>
                </el-form-item>
                <el-form-item label="发动机号:" v-show="showTab2" prop="engineNo" >
                    <el-input placeholder="输入发动机号" v-model="form.engineNo" class="inputWidth"></el-input>
                </el-form-item>

                <el-form-item label="发动机号:">
                    <el-select placeholder="选择投保地区" v-model="form.cityCode" class="inputWidth">
                        <el-option
                            v-for="item in cityCodeList"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上年投保公司:">
                    <el-select
                        placeholder="选择上年投保公司可提高查询速度"
                        v-model="form.insurComp"
                        class="inputWidth"
                    >
                        <el-option
                            v-for="item in insurCompList"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label>
                    <el-button icon="el-icon-search" @click="Search('form')">搜索</el-button>
                    <el-button icon="el-icon-close" @click="det('form')">清除</el-button>
                </el-form-item>
            </el-form>
        </el-tabs>
    </div>
</template>

<script>
import { getInsurCity } from "@/api/bdbApi";
export default {
    data() {
        return {
            activeTab: "carNoTab",
            form: {
                carNo: "",
                carVin: "",
                engineNo: "",
                cityCode: "",
                insurComp: ""
            },
            cityCodeList: [], //下拉数据
            insurCompList: [], //下拉数据
            showTab1: true,
            showTab2: false,
            formRule: {
                carNo: [
                    { required: true, message: "请输入车牌号", trigger: "blur" }
                ],
                carVin: [
                    { required: true, message: "请输入车架号", trigger: "blur" }
                ],
                engineNo: [
                    { required: true, message: "请输入底盘号", trigger: "blur" }
                ]
            }
        };
    },
    mounted() {
        this.setCityCodeList(); //设置投保城市
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
            if (tab.name == "carNoTab") {
                this.showTab1 = true;
                this.showTab2 = false;
            } else if (tab.name == "carVinTab") {
                this.showTab1 = false;
                this.showTab2 = true;
            }
            this.$refs["form"].resetFields();
        },
        Search(formEl) {
            let propList = [];
            if (this.activeTab == "carNoTab") {
                propList = ["carNo"];
            } else if (this.activeTab == "carVinTab") {
                propList = ["engineNo", "carVin"];
            }
            this.$refs[formEl].validateField(propList, valid => {
                if (!valid) {
                    this.$message({
                        message: "Do something",
                        type: "success"
                    });
                }
            });
        },
        setCityCodeList() {
            const compCode = "COM00000000000001";
            getInsurCity({ compCode: compCode }).then(res => {
                this.cityCodeList = res.data;
            });
        },
        det(formEl) {
            this.$refs["form"].clearValidate(); // 清除年龄的验证
        }
    }
};
</script>
<style lang='less' scoped>
@rowHeight: 50px;
.rowHeight {
    height: @rowHeight;
}
.inputWidth {
    width: 30%;
}
</style>