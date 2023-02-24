<template>
    <div class="selfImfor">
        <div class="login_wrap" v-show="showlogin">

            <div v-if="(this.userForm._id == ' ')">
                <div class="loginIn" v-if="showBol">
                    <transition class="animate__animated" name="animate__animated animate__bounce"
                        enter-active-class="animate__fadeIn" leave-active-class="animate__fadeOut">
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                            class="demo-ruleForm">
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
                                <el-button @click="loginForm('ruleForm')">登录</el-button>
                                <el-button @click="showBol = !showBol">注册</el-button>
                            </el-form-item>
                            <!-- <img :src="'/node' + userForm.userLogo" alt=""> -->
                        </el-form>
                    </transition>

                </div>
                <div class="register" v-else>
                    <transition class="animate__animated" name="animate__animated animate__bounce"
                        enter-active-class="animate__fadeIn" leave-active-class="animate__fadeOut">
                        <Register :changeShowBol="() => { showBol = !showBol; this.getSvg() }"
                            :changeLogin="() => { showlogin = !showlogin }">
                        </Register>
                    </transition>
                </div>
            </div>
            <div class="loginedWrap" v-else>
                <div style="margin-left:96%;margin-top: -5px;"><span class="el-icon-close"
                        @click="() => { this.showlogin = false }"></span></div>
                <div class="loginedWrap_logo"><img :src="'/node' + this.userForm.userLogo" alt=""></div>
                <p>{{ this.userForm.userNickName }}</p>
                <el-button type="primary" plain @click="quitLogin" style="margin:0 39%;">退出登录</el-button>
            </div>
        </div>
        <div class="changeImf">
            <el-tabs v-model="activeName">
                <el-tab-pane label="登录管理" name="first">
                    <el-button type="primary" plain @click="loginOrQuit" style="margin:30% 45%;">登录/退出</el-button>
                </el-tab-pane>
                <el-tab-pane label="资料管理" name="second">
                    <my-second-info ref="mysecondinfo"></my-second-info>
                </el-tab-pane>
                <el-tab-pane label="用户管理" name="fourth">
                    <UserChar ref="usca"></UserChar>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import vue from "vue";
import MySecondInfo from './MySecondInfo.vue';
import Register from './Register.vue';
import UserChar from './UserChar.vue';
export default {
    name: "SelfImfor",
    props: ["logoShowBol"],
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
            //show
            showBol: true,
            //if showlogin
            showlogin: true,
            //验证码
            svgBol: "",
            activeName: 'first',
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
        },

        loginForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    // alert("submit!");
                    // this.$emit('loadUserMessage')

                    let { data } = await this.$axios.post("/node/login/loginTest", {
                        Name: this.ruleForm.name,
                        Pass: this.ruleForm.pass
                    })
                    // console.log(this.userForm);
                    if (data.code) {
                        this.$message.success(data.value)
                        this.showlogin = false
                        //将登录资料存进vuex
                        this.$store.commit("ChangeUserForm", data.user)
                        this.$refs.usca.loadUserMessage()
                        this.$refs.mysecondinfo.coverTheMess()
                        //建立ws链接
                        const ws = new WebSocket("ws://localhost:80/webSocket/wsson")
                        ws.onopen = () => {
                            if (ws.readyState == 1) {
                                console.log("ws已建立链接...");
                            }
                        }
                        ws.onclose = function () {
                            console.log("ws链接已关闭...");
                        }

                        //创建websocket实例
                        vue.prototype.$socket = ws
                    } else {
                        this.$message.error(data.value)
                    }
                    // this.$refs.usca.loadUserMessage()
                    // this.$refs.mysecondinfo.coverTheMess()

                }
                else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        loginOrQuit() {

            this.showlogin = !this.showlogin

        },
        changeshowlogin() {
            // console.log("123");
            this.showlogin = false;
        },
        uercharPageagain() {
            this.$refs.usca.uercharPage()
        },
        coverTheMessTwo() {
            this.$refs.mysecondinfo.coverTheMess()
        },
        async quitLogin() {
            let { data } = await this.$axios.get("/node/login/quitLogin")
            // console.log(data);
            this.$store.commit("QuitLogin", '')
            this.$message.success(data)
            this.$socket.close(1000)
        }
    },
    computed: {
        userForm() {
            return this.$store.state.userForm
        }
    },
    created() {
    },
    components: { Register, UserChar, MySecondInfo },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">
.selfImfor {
    // border: 4px solid rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 20vh;
    left: 20vw;
    width: 60vw;
    height: 60vh;
    background-image: url("../../assets/Img/loginBg.webp");
    background-size: 60vw 60vh;
    // background: white;
    border-radius: 10px;
    box-shadow: 3px 4px 6px 0 rgb(173, 225, 219);
    z-index: 5;
    overflow: scroll;

    .changeImf {
        padding: 10px;
    }

    .login_wrap {
        z-index: 5;
        position: absolute;
        left: 23%;
        margin: 9% auto;
        width: 50%;
        height: 70%;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 1px 2px 6px 0 #eee;
        backdrop-filter: blur(8px);

        .loginedWrap {
            span:hover {
                cursor: pointer;
            }

            .loginedWrap_logo {
                width: 150px;
                height: 150px;
                overflow: hidden;
                margin: 20px auto;

                img {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                }

            }

            p {
                font-size: 2em;
                font-family: 'STXingkai';
                text-align: center;
            }
        }

        .loginIn {
            width: 100%;
            position: absolute;
            top: 0;
        }

        .register {
            width: 100%;
            position: absolute;
            top: 0;
        }

        .demo-ruleForm {
            padding: 0px 15% 0px 0%;
            margin: 20px auto;
            // background: pink;
        }

        .el03 {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 50%;
        }

        .svg {
            position: relative;
            top: -60px;
            left: 70%;
            width: 30%;
            height: 50px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #eee;
        }

        .btn_wrap {
            position: relative;
            top: -45px;
        }

    }

}
</style>