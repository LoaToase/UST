<template>
    <div class="logo_chi">
        <img :src="'node' + userForm.userLogo" alt="" class="touxiang" @click="logoClick">
        <!-- 个人资料页面过度动画 -->
        <div class="simpleInfo">
            <p class="simpleInfo_p1">{{this.$store.state.userForm.userNickName}}</p>
            <p class="simpleInfo_p2">{{this.$store.state.userForm.userName}}</p>
            <p class="simpleInfo_p2">{{this.$store.state.userForm.createDate}}</p>
        </div>
        <transition class="animate__animated" name="animate__animated animate__bounce"
            enter-active-class="animate__zoomIn" leave-active-class="animate__zoomOut">
            <!-- 个人资料页面 -->
            <SelfImfor v-show="logoShowBol" :logoShowBol="logoShowBol" ref="selfImfor"></SelfImfor>
        </transition>
    </div>
</template>

<script>
import vue from 'vue';
import SelfImfor from './SelfImfor.vue';
export default {
    name: "LogoChi",
    data() {
        return {
            logoUrl: "",
            //是否展示个人资料页面
            logoShowBol: false,
        };
    },
    methods: {
        logoClick() {
            this.logoShowBol = !this.logoShowBol
            if (this.userForm._id == " ") { this.$refs.selfImfor.getSvg() }

        },

        async getSession() {
            let { data } = await this.$axios.get("/node/login/getSession")
            // console.log(data);
            if (data.code == 1) {
                this.$message.success("已登录")
                this.$store.commit("ChangeUserForm", data.user)
                //建立ws链接
                const ws = new WebSocket("ws://localhost:80/webSocket/wsson")
                ws.onopen = () => {
                    if (ws.readyState == 1) {
                        console.log("ws已建立链接...");
                        // setInterval(()=>{
                        // ws.send("avoid sleep,too!")
                        // },120000)
                    }
                    ws.onmessage = async (mes) => {
                        // console.log(mes.data);
                        let data = JSON.parse(mes.data)
                        if (data.type == 1) {
                            this.$store.commit("changeUnRead", data.shuju)
                            let total = 0
                            data.shuju.forEach(element => {
                                total += element
                            });
                            if (total != 0) {
                                this.$notify.info({
                                    title: '消息',
                                    message: '您有' + total + '条消息未读'
                                });
                            }
                        }
                        if (data.type == 2) {
                            let { data } = await this.$axios.get("/node/login/quitLogin")
                            // console.log(data);
                            this.$store.commit("QuitLogin", '')
                            this.$message.success(data)
                            this.$socket.close(1000)
                        }

                        // ws.send("avoid sleep,too!")
                        // setInterval(()=>{
                        // ws.send("avoid sleep,too!")
                        // },120000)
                    }
                    setTimeout(() => {
                        ws.send("请求未读聊天数据")
                    }, 500)

                }
                ws.onclose = function () {
                    console.log("ws链接已关闭...");
                }


                //创建websocket实例
                vue.prototype.$socket = ws
                // console.log(this.$socket);
                this.$refs.selfImfor.changeshowlogin();
                this.$refs.selfImfor.uercharPageagain();
                this.$refs.selfImfor.coverTheMessTwo();
            } else {
                this.$message.error("未登录")
            }

        }
    },
    computed: {
        userForm() {
            return this.$store.state.userForm
        }
    },
    created() {
        // console.log(this.userForm);
        this.getSession();

    },
    components: { SelfImfor },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">
.logo_chi {
    display: flex;
    flex-wrap: nowrap;

    .touxiang {
        z-index: 11;
        position: relative;
        top: 0;
        // background: pink;
        user-select: none;
        padding: 0;
        margin: 5px 8px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        transition: .5s;
        overflow: hidden;


        &:hover {
            transition: .5s;
            top: 10px;
            width: 80px;
            height: 80px;
            // border-bottom: 1px solid rgba(255, 255, 255,1);
            // border-right: 1px solid rgba(255, 255, 255,1);
            cursor: pointer;
            // box-shadow: ;
        }
    }

    .touxiang:hover~.simpleInfo {
        // transition: 1s;
        visibility: visible;
    }

    .simpleInfo {
        // transition: .5s;
        visibility: hidden;
        position: absolute;
        top: 65px;
        left: 110px;
        width: 200px;
        height: 170px;
        background-color: white;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        z-index: 10;

        .simpleInfo_p1 {
            margin-top: 20px;
            font-size: 1.6em;
            text-align: center;
        }
        .simpleInfo_p2{
            // margin-top: 0px;
            text-align: center;
            overflow: hidden;
        }
    }

    // .p_logo:hover ~ .p_name{
    //     visibility: visible;
    //     transition: .5s;
    //     width: 50%;
    // }

    // .p_name {
    //     visibility: hidden;
    //     transition: .5s;
    //     margin-left: 0px;
    //     margin-top: 13px;
    //     width: 0;
    //     height: 35px;
    //     // background: white;
    //     overflow: hidden;
    //     line-height: 35px;
    //     font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    //     font-size: 1.2em;
    //     border: 1px solid rgb(67, 65, 65);
    //     padding-left: 5px;
    //     border-radius: 17px;
    //     padding-right: 5px;
    //     color: rgb(255, 255, 255);
    //     text-align: center;
    //     font-weight: bolder;
    //     // text-decoration: underline;

    //     &:hover {
    //         // text-decoration-line: underline;
    //         text-shadow: 2px -2px 3px skyblue;
    //     }
    // }
}
</style>