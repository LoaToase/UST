<template>
    <div class="UserChar">
        <div class="demo-basic--circle">
            <div class="block">
                <el-avatar :size="100" :src="'/node' + userForm.userLogo"></el-avatar>
            </div>
            <el-upload class="upload-demo" drag ref="selfLogoUp" action="/node/changeInfo/changeLogo"
                :on-success="imgUpSuccess" :auto-upload="false" :data="userForm" :limit="1">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件,且不超过500kb</div>
            </el-upload>
        </div>
        <div class="user_detail">

            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="账户" prop="userName">
                    <span>
                        <el-input type="text" v-model="ruleForm.userName" :disabled="true" style="width:350px;">
                        </el-input>
                    </span>

                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <span>
                        <el-input type="password" v-model="ruleForm.pass" :disabled="swichBol" style="width:350px;"
                            :show-password="true"></el-input>
                    </span>
                    <span>
                        <el-switch v-model="swichBol" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </span>
                </el-form-item>
                <el-form-item label="昵称" prop="NickName">
                    <span>
                        <el-input v-model="ruleForm.NickName" :disabled="swichBol02" style="width:350px;"></el-input>
                    </span>
                    <span>
                        <el-switch v-model="swichBol02" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
export default {
    name: 'UserChar',
    // props: ["userForm"],
    data() {
        var validateNickName = (rule, value, callback) => {
            if (value === '' && !this.swichBol02) {
                callback(new Error('更改昵称不能为空'));
            } else {
                callback();
            }

        };
        var validateuserName = (rule, value, callback) => {
            callback();
        };
        var validatePass = (rule, value, callback) => {
            if (value === '' && !this.swichBol) {
                callback(new Error('更改密码不能为空'));
            } else {
                callback();
            }
        };
        return {
            // ww:'ww'
            changePass: "",
            swichBol: true,
            swichBol02: true,
            ruleForm: {
                userName: '',
                pass: '',
                NickName: ''
            },
            rules: {
                userName: [
                    { validator: validateuserName, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                NickName: [
                    { validator: validateNickName, trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        userForm() {
            return this.$store.state.userForm
        }
    },
    methods: {
        // submitInfo() {
        //     this.$refs.selfLogoUp.submit();
        // },
        //头像文件上传成功
        imgUpSuccess(response, file, fileList) {
            // console.log(response);
            this.$store.commit("ChangeSelfLogo", response.imgPath)
            this.$message.success(response.value)
        },
        //点击提交事件
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    //文件手动上传
                    try {
                        this.$refs.selfLogoUp.submit();

                        let { data } = await this.$axios.post("/node/changeInfo/changeselfInf", {
                            userId: this.userForm._id,
                            userNickName: this.ruleForm.NickName,
                            userPass: this.ruleForm.pass,
                            ifPass: this.swichBol,
                            ifNName: this.swichBol02
                        })
                        // console.log(data);
                        if (data.rlt.code) {
                            this.$store.commit("ChangeNName", data.name)
                        }
                        this.$message.success(data.rlt.value)
                        setTimeout(() => {
                            this.$refs.selfLogoUp.clearFiles();
                        }, 1000)
                    } catch { }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //重置事件
        resetForm(formName) {
            this.ruleForm.userName = this.userForm.userName
            this.ruleForm.NickName = this.userForm.userNickName
            this.ruleForm.pass = ''
            // this.removeImg()
            this.$refs.selfLogoUp.clearFiles();
        },
        //供父组件登录成功后调用的事件
        async loadUserMessage() {
            let { data } = await this.$axios.post("/node/changeInfo/loadUserMessage", {
                _id: this.userForm._id,
            })
            // console.log(data);
            this.ruleForm.NickName = data.userNickName
            this.ruleForm.userName = data.userName
        },

        //移除图片的钩子
        // removeImg(file, fileList){
        //     console.log("yichu");
        // },

        //
        uercharPage() {
            if (this.userForm._id != " ") {
                this.ruleForm.NickName = this.userForm.userNickName
                this.ruleForm.userName = this.userForm.userName
            }
        }
    },
    mounted() {

        // this.$emit("loadUserMessage")
        // this.loadUserMessage()
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">
.UserChar {

    .demo-basic--circle {
        height: 240px;
        overflow: hidden;

        .block {
            margin: 40px 0px;
        }

        padding: 10px;
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #ccc;
    }

    .user_detail {
        margin-top: 10px;
        margin-bottom: 10px;

        input {
            border-radius: 25px;
            width: 342px;
        }

        // .userDeinputone {
        //     margin: 5px;

        //     input {
        //         border-radius: 0 20px 20px 0;
        //     }
        // }
    }
}
</style>