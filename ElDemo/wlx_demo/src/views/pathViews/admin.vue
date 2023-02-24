<template>
    <div class="admin">
        <div class="notInto" v-if="intoBol">
            <p>您不是管理员</p>
        </div>
        <div class="uCanInto" v-else>
            <div class="adminHeadNav">
                <div class="adminUlArea ulAreaOne">
                    <p>用户管理</p>
                    <ul class="ulOnOne" style="border-left:2px solid rgb(94, 199, 241);
                    border-bottom:2px solid rgb(94, 199, 241);border-right:2px solid rgb(94, 199, 241);">
                        <li @click="changeAdmin(4)">用户在线状态</li>
                        <li @click="changeAdmin(5)">用户权限</li>
                    </ul>
                </div>
                <div class="adminUlArea ulAreaTwo">
                    <p>商品管理</p>
                    <ul class="ulOnTwo" style="border-left:2px solid rgb(94, 199, 241);
                    border-bottom:2px solid rgb(94, 199, 241);border-right:2px solid rgb(94, 199, 241);">
                        <li @click="changeAdmin(3)">一般商品</li>
                        <li @click="changeAdmin(2)">拍卖商品</li>
                    </ul>
                </div>
                <div class="adminUlArea ulAreaThree">
                    <p>数据视图</p>
                    <ul class="ulOnThree" style="border-left:2px solid rgb(94, 199, 241);
                    border-bottom:2px solid rgb(94, 199, 241);border-right:2px solid rgb(94, 199, 241);">
                        <li @click="changeAdmin(1)">分析图</li>
                    </ul>
                </div>
                <div class="coverArea"></div>
            </div>
            <div class="adminMain">
                <analyse v-if="ifshow01"></analyse>
                <auc-goods v-if="ifshow02"></auc-goods>
                <normal-goods v-if="ifshow03"></normal-goods>
                <user-command v-if="ifshow04"></user-command>
                <user-privi v-if="ifshow05"></user-privi>
            </div>
        </div>
    </div>
</template>

<script>
import analyse from '../adminChi/analyse.vue'
import AucGoods from '../adminChi/aucGoods.vue'
import NormalGoods from '../adminChi/normalGoods.vue'
import UserCommand from '../adminChi/userCommand.vue'
import UserPrivi from '../adminChi/userPrivi.vue'
export default {
    components: { analyse, AucGoods, UserCommand, UserPrivi, NormalGoods },
    name: "admin",
    data() {
        return {
            admintype:1,
            intoBol: false,
            showWhickPage: 1,
            ifshow01: true,
            ifshow02: false,
            ifshow03: false,
            ifshow04: false,
            ifshow05: false,
        }
    },
    methods: {
        changeAdmin(index) {
            switch (index) {
                case 1:
                    this.ifshow01 = true
                    this.ifshow02 = false
                    this.ifshow03 = false
                    this.ifshow04 = false
                    this.ifshow05 = false
                    break;
                case 2:
                    this.ifshow01 = false
                    this.ifshow02 = true
                    this.ifshow03 = false
                    this.ifshow04 = false
                    this.ifshow05 = false
                    break;
                case 3:
                    this.ifshow01 = false
                    this.ifshow02 = false
                    this.ifshow03 = true
                    this.ifshow04 = false
                    this.ifshow05 = false
                    break;
                case 4:
                    this.ifshow01 = false
                    this.ifshow02 = false
                    this.ifshow03 = false
                    this.ifshow04 = true
                    this.ifshow05 = false
                    break;
                case 5:
                    this.ifshow01 = false
                    this.ifshow02 = false
                    this.ifshow03 = false
                    this.ifshow04 = false
                    if(this.admintype == 0){
                        this.ifshow05 = true
                    }else{
                        this.$message.error("抱歉,你不是一级管理员,没有权限访问")
                    }
                    break;
            }
        },
        async checkAdmin(){
            let {data} = await this.$axios.post("/node/login/checkAdmin",{
                id:this.$store.state.userForm._id
            })
            // console.log(data);
            this.intoBol = !data.isadmin
            this.admintype = data.type
        }
    },
    mounted(){
        this.checkAdmin()
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">
.admin {
    // background-color: #ccc;
    height: calc(100vh - 100px);
    padding: 10px;
    border-radius: 10px;

    .adminMain {
        padding: 10px;
        width: 90%;
        height: calc(100vh - 300px);
        border-radius: 10px;
        overflow: scroll;
        margin: 90px auto;
        // background-color: rgb(187, 240, 221);
        box-shadow: 0 2px 12px 0 rgba(94, 199, 241, 0.8);
        background-color: rgba(167, 219, 240, 0.8);
    }

    .adminHeadNav {
        position: relative;
        width: 450px;
        height: 50px;
        margin: 10px auto;
        z-index: 0;
        border-radius: 10px;
        background-color: rgb(255, 255, 255);
        display: flex;
        box-shadow: 2px 3px 7px 0px rgba(14, 14, 14, 0.5);

        .coverArea {
            display: none;
            width: 150px;
            height: 50px;
            z-index: -1;
            position: absolute;
            left: 0;
            border-radius: 10px;
            background-color: rgba(94, 199, 241, 0.4);
            transition: .5s;
        }

        .ulAreaOne:hover~.coverArea {
            display: block;
            left: 0px;
        }

        .ulAreaTwo:hover~.coverArea {
            display: block;
            left: 150px;
        }

        .ulAreaThree:hover~.coverArea {
            display: block;
            left: 300px;
        }

        .ulAreaOne:hover {
            .ulOnOne {
                display: block;
            }
        }

        .ulAreaTwo:hover {
            .ulOnTwo {
                display: block;
            }
        }

        .ulAreaThree:hover {
            .ulOnThree {
                display: block;
            }
        }

        .adminUlArea {
            width: 150px;
            margin: 0;
            padding: 0;
            text-align: center;

            &:hover {
                cursor: pointer;
            }

            ul {
                margin: -3px 0px 0 0;
                padding: 0;
                display: none;
                background-color: white;
                border-radius: 0 0 10px 10px;

                li {
                    height: 40px;
                    line-height: 40px;

                    &:not(&:nth-of-type(1)) {
                        border-top: 2px solid rgb(136, 131, 131);
                    }
                }
            }
        }
    }

    .notInto {
        font-size: 2em;
        width: 200px;
        height: 30px;
        border-radius: 10px;
        line-height: 30px;
        padding-left: 5px;
        padding-right: 5px;
        margin: 25% auto;
        background-color: aliceblue;
    }
}
</style>