<template>
    <div class="sellerInfo">
        <img :src="'/node' + userSecond.userBgImg" alt="" class="sellerInfo_img">
        <div class="sellerInfo_img02">
            <p>{{ userdata.userNickName }}</p><img :src="'/node' + userdata.userLogo" alt="">
        </div>
        <el-tag size="small" style="margin-left:5px;margin-top: 5px;">{{ this.userSecond.userPhoneNum }}</el-tag>
        <el-tag size="small" v-for="item in userSecond.userLabel" :key="item">{{ item }}</el-tag>
        <div class="textbox">{{ this.userSecond.userDescr }}</div>
        <span style="margin-left:5px;margin-right:5px;">想要的商品:</span>
        <el-tag size="small" v-for="item in userSecond.userWantsGoods" :key="item" type="success">{{ item }}</el-tag>
        <div class="sendMes" @click="gotosendmess"><span class="el-icon-chat-dot-round"></span> 协商</div>
    </div>
</template>

<script>
export default {
    // props:["userdata"],
    name: 'sellerInfo',
    data() {
        return {
            userdata: {userLogo:"/userImg/userLogo.webp"},
            userSecond: {userBgImg:"/userImg/selfInfoBg.webp"}
        }
    },
    methods: {
        async getSellerInfo() {
            try {
                let { data } = await this.$axios.post("/node/changeinfo/getSellerInfo", {
                    id: this.$route.query.data
                })
                // console.log(data);
                this.userdata = data.userData
                this.userSecond = data.userSec
            } catch { }

        },
        gotosendmess() {
            this.$router.push({ path: '/chatPage', query: { data: this.userdata._id } })
        }
    },
    mounted() {
        // console.log(this.$route.query.data);
        this.getSellerInfo()
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">
.sellerInfo {
    // position: fixed;
    // top: -100px;
    margin: 0 auto;
    border-radius: 10px;
    width: 500px;
    height: 700px;
    // background-color: rgb(145, 211, 236);
    box-shadow: 0 2px 12px 0 rgba(94, 199, 241, 0.8);
        background-color: white;

    .sellerInfo_img {
        width: 500px;
        height: calc(500px * 9 / 16);
        // background-color: #eee;
        border-radius: 10px 10px 0 0;
    }

    .sellerInfo_img02 {
        margin-top: -10px;
        border-radius: 0 0 40px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // margin-top: -17px;
        width: 100%;
        height: 40px;
        background: rgb(190, 231, 244);
        border-top: 2px solid #eee;

        // border-bottom: 1px solid #eee;
        p {
            width: 80%;
            // height: 100%;
            text-align: center;
            font-size: large;
            line-height: 0px;
        }

        img {
            z-index: 2;
            margin-top: -40px;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            // background: #99a9bf;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .textbox {
        margin: 5px auto;
        border-radius: 10px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        // padding-top: 10px;
        font-size: large;
        width: 200px;
        height: 100px;
        // background: #99a9bf;
        background-color: azure;
        overflow: scroll;
        overflow-wrap: break-word;
        box-shadow: 0px 0px 7px 0px #eee;
    }

    .sendMes {
        // margin-top: 10px;
        margin: 10px auto;
        width: 100px;
        line-height: 30px;
        text-align: center;
        height: 35px;
        border-radius: 10px;
        box-shadow: 0px 0px 7px 0px #eee;
        font-size: larger;
        background-color: rgba(94, 199, 241, 0.8);

        &:hover {
            cursor: pointer;
            font-weight: bolder;

            span {
                font-weight: bolder;
            }
        }
    }
}
</style>