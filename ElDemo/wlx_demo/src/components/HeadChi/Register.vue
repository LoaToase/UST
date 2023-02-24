<template>
    <div class="register">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="name">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="capt" style="">
                <el-input v-model="ruleForm.capt" class="el03"></el-input>
            </el-form-item>
            <div class="svg" ref="svgBg" @click="getSvg()"></div>
            <el-form-item class="btn_wrap">
                <el-button @click="registerBtn('ruleForm')">注册</el-button>
                <el-button @click="changeShowBol">已有账号</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    props: [
        "changeShowBol",
        "changeLogin"
    ],
    data() {
        var checkcapt = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("验证码不能为空"));
            }
            else if (value !== this.svgBol) {
                return callback(new Error("验证码错误"));
            }
            else {
                callback();
            }
        };
        var validatename = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入账号"));
            }
            else {
                callback();
            }
        };
        var validatepass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }
            else {
                callback();
            }
        };
        return {
            svgBol: "",
            ruleForm: {
                name: "",
                pass: "",
                capt: ""
            },
            rules: {
                name: [
                    { validator: validatename, trigger: "blur" }
                ],
                pass: [
                    { validator: validatepass, trigger: "blur" }
                ],
                capt: [
                    { validator: checkcapt, trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        async getSvg() {
            let { data } = await this.$axios.get("/node/login/getSvg");
            console.log(data.text);
            this.$refs.svgBg.innerHTML = data.data;
            this.svgBol = data.text;
            // this.ruleForm.capt = data.text
        },
        //注册事件
        async registerBtn(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    // console.log(this.ruleForm);
                    let { data } = await this.$axios.post("/node/login/register", {
                        userName: this.ruleForm.name,
                        userPass: this.ruleForm.pass
                    })
                    console.log(data);
                    if (data.code) {
                        this.$message.success(data.value)
                        this.$props.changeLogin()
                        this.$store.commit("ChangeUserForm", data.user)
                    } else {
                        this.$message.error(data.value)
                    }
                }
                else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
    mounted() {
        this.getSvg();
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">
// .register {}
</style>