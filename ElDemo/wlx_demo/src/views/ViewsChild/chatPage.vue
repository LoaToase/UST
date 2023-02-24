<template>
    <div class="chatPage">
        <div class="toparea">
            <p class="getter">{{ getter.userNickName }}</p>
            <div class="showarea">
                <ul class="message_ul" ref="ulul">
                    <li v-for="(item, index) in allMessage" :key="index"
                        :class="item.sender == senderId ? 'senderli' : 'getterli'">
                        <div class="wrap22">
                            <img :src="'/node' + (item.sender == senderId ? senderlogo : getter.userLogo)" alt="">
                            <p class="pp1">{{ item.sendTime }}</p>
                            <div class="pp2">
                                <p>{{ item.mes }}</p>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
        <div class="bottomarea">
            <div class="submit_value">

                <div class="p_one">
                    <textarea type="textarea" placeholder="聊天吧" @keyup.enter="submitMessage" ref="inputwrap" rows="10"
                        v-model="textValue"></textarea>

                </div>
                <div class="p_two">
                    <el-popover placement="top-end" heiht="400" width="174" trigger="click">
                        <el-button slot="reference"><b>😊</b></el-button>
                        <el-tabs v-model="activeName" style="z-index:5;">
                            <el-tab-pane label="😀" name="first">
                                <qwe :liuyans="emoji" @mouseup.native="handlerEmoji" />
                            </el-tab-pane>

                            <el-tab-pane label="⚽" name="second">
                                <qwe :liuyans="movement" @mouseup.native="handlerEmoji" />
                            </el-tab-pane>

                            <el-tab-pane label="🐵" name="third">
                                <qwe :liuyans="animals" @mouseup.native="handlerEmoji" />
                            </el-tab-pane>

                            <el-tab-pane label="🍉" name="fourth">
                                <qwe :liuyans="food" @mouseup.native="handlerEmoji" />
                            </el-tab-pane>

                            <el-tab-pane label="✈️" name="fifth">
                                <qwe :liuyans="traffic" @mouseup.native="handlerEmoji" />
                            </el-tab-pane>
                        </el-tabs>
                    </el-popover>
                    <span class="el-icon-right" @click="submitMessage"></span>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import qwe from './qwe.vue';
export default {
    components: { qwe },
    name: 'chatPage',
    data() {
        return {
            mesWs: {},
            textValue: "",
            activeName: "first",
            allMessage: [],
            senderId: "",
            getter: {},
            senderlogo: '',
        }
    },
    methods: {
        submitMessage() {
            if (!this.textValue) {
                this.$message.error("请输入消息内容")
                return
            }
            let date = new Date()
            let data = {
                mesValue: this.textValue,
                sender: this.$store.state.userForm._id,
                getter: this.$route.query.data,
                type: 1,
                sendTime: date,
                ifcheck: false
            }
            this.allMessage.push({
                sender: this.senderId,
                mes: this.textValue,
                sendTime: date.toISOString()
            })
            let fin = JSON.stringify(data)
            this.mesWs.send(fin)
            this.$message.success("发送成功")
            this.textValue = ""
            setTimeout(() => {
                this.$refs.ulul.scrollTop = this.$refs.ulul.scrollHeight;
            }, 100)
        },
        handlerEmoji(e) {
            let emo = e.target.outerText;
            // console.log(this.$refs);
            // 给input框绑定ref值,selectionStart取得光标所处位置的下标
            let ind = this.$refs.inputwrap.selectionStart;

            //substring()方法==> 截取 0 > ind 的字符串
            this.textValue =
                this.textValue.substring(0, ind) +
                emo +
                this.textValue.substring(ind);
        },
        async getmessff() {
            this.senderId = this.$store.state.userForm._id
            this.senderlogo = this.$store.state.userForm.userLogo
            // console.log(this.senderId);
            const mesWs = new WebSocket("ws://localhost:80/webSocket/sendandget")
            mesWs.onopen = () => {
                console.log("消息连接已打开");
                this.mesWs = mesWs
                let data2 = {
                    sender: this.$store.state.userForm._id,
                    getter: this.$route.query.data,
                    type: 2,
                }
                setTimeout(() => {
                    mesWs.send(JSON.stringify(data2))
                }, 500)
            }
            mesWs.onmessage = (mes) => {
                let data11 = JSON.parse(mes.data)
                // console.log(data11);
                data11.forEach(item => {
                    // console.log(item);
                    this.allMessage.push(item)
                })
                setTimeout(() => {
                    this.$refs.ulul.scrollTop = this.$refs.ulul.scrollHeight;
                }, 100)
            }
            let { data } = await this.$axios.post("/node/changeInfo/getallmess", {
                sender: this.senderId,
                getter: this.$route.query.data,
            })
            // console.log(data);
            data.bol?.message.forEach(item => {
                // console.log(item);
                this.allMessage.push({
                    sender: data.bol.senderId,
                    // getter:data.bol.getterId,
                    mes: item.mesValue,
                    sendTime: item.sendTime
                })
            });
            data.bol2?.message.forEach(item => {
                // console.log(item);
                this.allMessage.push({
                    sender: data.bol2.senderId,
                    // getter:data.bol.getterId,
                    mes: item.mesValue,
                    sendTime: item.sendTime
                })
            });
            this.getter = data.getter
            this.allMessage.sort((x, y) => {
                return (new Date(x.sendTime) - new Date(y.sendTime))
            })
            // console.log(this.allMessage);
            setTimeout(() => {
                this.$refs.ulul.scrollTop = this.$refs.ulul.scrollHeight;
            }, 100)
        }
    },
    computed: {
        //取得数据库的数据
        ...mapState([
            "emoji",
            "movement",
            "animals",
            "food",
            "traffic",
            "userForm",
        ]),
    },
    mounted() {
        // console.log(this.$route.query.data);
        // console.log(this.$refs.ulul.scrollHeight);
        this.getmessff()
    },
    destroyed() {
        // console.log("cloase");
        this.mesWs.close(1000)
    }
}
</script>

<style lang="less">
.toparea {
    margin: 10px auto;
    border-radius: 20px 20px 0 0;
        // background-color: rgba(94, 199, 241, 0.8);
    border-top: 20px solid rgb(94, 199, 241);
    border-left: 5px solid rgb(94, 199, 241);
    border-right: 5px solid rgb(94, 199, 241);
    width: 70%;
    height: 400px;
    background-color: pink;

    .getter {
        margin-top: 0px;
        font-size: 1.8em;
        line-height: 5px;
        text-align: center;
        width: 100%;
        height: 30px;
        background-color: rgb(94, 199, 241);
    }

    .showarea {
        margin-top: -30px;
        width: 100%;
        height: 100%;
        background-color: aliceblue;

        .message_ul {
            margin-bottom: 0px;
            margin: 0px;
            padding: 0px;
            height: 371px;
            background-color: rgb(255, 255, 255);
            overflow: scroll;

            .getterli {
                width: 100%;

                .wrap22 {
                    display: flex;

                    img {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        // background-color: aquamarine;
                    }

                    .pp1 {
                        width: 250px;
                        height: 25px;
                        margin-top: 3px;
                        margin-left: 5px;
                    }

                    .pp2 {
                        margin-top: 40px;
                        margin-left: -250px;
                        overflow-wrap: break-word;
                        font-size: larger;
                        max-width: 260px;

                        p {
                            max-width: 260px;
                            border-radius: 0 10px 10px 10px;
                            background-color: #ccc;
                            padding: 10px;
                            margin: 0;
                        }
                    }
                }

            }

            .senderli {
                width: 100%;
                display: flex;
                justify-content: flex-end;

                .wrap22 {


                    img {
                        margin-left: 577px;
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        // background-color: aquamarine;
                    }

                    .pp1 {
                        margin-left: 321px;
                        margin-top: -60px;
                        width: 250px;
                        height: 25px;
                        line-height: 25px;
                        text-align: end;
                        // background-color: red;
                    }

                    .pp2 {
                        margin-top: -5px;
                        margin-left: 321px;
                        display: flex;
                        justify-content: flex-end;
                        font-size: larger;
                        max-width: 250px;
                        overflow-wrap: break-word;

                        p {
                            padding: 10px;
                            margin: 0;
                            max-width: 250px;
                            border-radius: 10px 0px 10px 10px;
                            overflow-wrap: break-word;
                            background-color: #ccc;
                        }
                    }
                }
            }
        }
    }
}

.bottomarea {
    margin: -10px auto;
    border-top: 5px solid rgb(94, 199, 241);
    border-left: 5px solid rgb(94, 199, 241);
    border-right: 5px solid rgb(94, 199, 241);
    border-bottom: 5px solid rgb(94, 199, 241);
    width: 70%;
    height: 200px;
    background-color: white;

    .submit_value {


        .p_one {
            width: 100%;
            // height: calc(100% - 100px);
            height: 160px;
            background-color: rgb(209, 209, 209);

            textarea {
                font-size: 1.6em;
                font-weight: bolder;
                width: calc(100% - 4px);
                height: 100%;
                // outline-color: pink;
                background-color: rgb(255, 255, 255);
                outline: none;
                border: 0px solid;

            }

            ::-webkit-input-placeholder {
                color: #ccc;
            }
        }

        .p_two {
            display: flex;
            justify-content: flex-end;

            .el-button {
                margin-top: 4px;
                height: 37px;
                width: 37px;
                display: inline-block;
                // line-height: 1;
                // white-space: nowrap;
                cursor: pointer;
                background: rgb(182, 182, 182);
                border: -1px solid rgb(182, 182, 182);
                color: #606266;
                text-align: center;
                outline: 0;
                transition: 0.1s;
                font-weight: 500;
                padding: 7px 5px;
                font-size: 14px;
                border-radius: 50%;
            }

            .el-icon-right {
                border-radius: 50%;
                margin-top: 4px;
                margin-left: 10px;
                margin-right: 10px;
                line-height: 36px;
                text-align: center;
                font-size: 2em;
                width: 36px;
                height: 36px;
                background-color: rgb(190, 231, 244);

                &:hover {
                    cursor: pointer;
                    background-color: rgb(130, 212, 237);
                }
            }

        }

    }
}
</style>