<template>
    <el-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
    >
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input
                type="password"
                v-model="ruleForm2.checkPass"
                auto-complete="off"
                placeholder="密码"
            ></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button
                type="primary"
                style="width:100%;"
                @click.native.prevent="handleSubmit2"
                :loading="logining"
            >登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { getToken,getUserWorkInfo } from "@/api/myApi";
export default {
    data() {
        return {
            logining: false,
            ruleForm2: {
                account: "000lsq",
                checkPass: "1"
            },
            rules2: {
                account: [
                    { required: true, message: "请输入账号", trigger: "blur" }
                ],
                checkPass: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            },
            checked: true
        };
    },
    methods: {
        handleReset2() {
            this.$refs.ruleForm2.resetFields();
        },
        handleSubmit2(ev) {
            let _this = this;
            this.$refs.ruleForm2.validate(valid => {
                if (valid) {
                    this.logining = true;
                    var params = {
                        loginName: this.ruleForm2.account,
                        password: this.ruleForm2.checkPass,
                        platform: "38",
                        clientId: "5907a7aa-e98b-41d0-bb51-cdeba086a995",
                        clientSecret: "067edd58-47ca-4922-ac9e-6dc700e18a8b"
                    };
                    getToken(params).then(res => {
                            if (res.status == "success") {
                                var user = {
                                    account: this.ruleForm2.account,
                                    password: this.ruleForm2.checkPass,
                                    avatar:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=404630985,2256487394&fm=26&gp=0.jpg',
                                    token: res.data
                                };
                                localStorage.setItem("token", res.data);
                                localStorage.setItem(
                                    "user",
                                    JSON.stringify(user)
                                );
                                getUserWorkInfo().then(res =>{
                                    localStorage.setItem("atrr",JSON.stringify(res.atrr));
                                })
                                // 将登录名使用vuex传递到Home页面
                                //this.$store.commit('handleUserName',_this.ruleForm2.account);
                                //sessionStorage.setItem('user', JSON.stringify(user))
                                this.$router.push({ path: "/echarts" });
                                this.$message({
                                    message: "登录成功",
                                    type: "success"
                                });
                            }
                        }).catch(err => {
                            this.$message({
                                message: "密码错误！",
                                type: "warning"
                            });
                            this.logining = false;
                        });
                } else {
                    this.logining = false;
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .remember {
        margin: 0px 0px 35px 0px;
    }
}
</style>
