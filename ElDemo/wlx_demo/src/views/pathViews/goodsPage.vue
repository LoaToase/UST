<template>
    <div class="goodsPage">
        <div class="left">
            <p
                style="margin:20px;padding: 10px;border-radius: 10px;border:2px solid rgba(94, 199, 241, 0.8);">
                我的商品</p>
            <p style="margin:20px;padding: 10px;border-radius: 10px;border:2px solid rgba(94, 199, 241, 0.8);"
                v-for="(item, index) in userdata.mygoods" :key="index">{{ item.goodsName }} + ￥ {{ item.goodsPrize }}
            </p>
            <p
                style="margin:20px;padding: 10px;border:2px solid rgba(94, 199, 241, 0.8);border-radius: 10px;color: red;">
                以物换物请与卖家协商!</p>
        </div>
        <div class="right">
            <div class="swiperTop">
                <div class="block">
                    <el-carousel height="300px" style="border-radius:30px 30px 0 0;">
                        <el-carousel-item v-for="item in this.goodsdataOne.goodsImg" :key="item">
                            <img :src="'/node' + item" alt="" height="300px" width="100%">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="mainInfo">
                <p>{{ goodsdataOne.goodsName }} ￥{{ goodsdataOne.goodsPrize }}</p><img
                    :src="'/node' + this.$store.state.goodsUserLogo" alt="#" @click="intoSeller">
            </div>
            <div class="information">
                <el-tag style="margin-right:10px;" v-for="tag in goodsdataOne.goodsLabel" :key="tag">
                    {{ tag }}
                </el-tag>
                <br><br>
                <span style="font-size:1.5em; border-left: 3px solid pink;padding-left: 5px;">发布时间: &nbsp;</span>
                <span>{{ goodsdataOne.goodsCreateTime }}</span>
                <br><br>
                <span style="font-size:1.5em; border-left: 3px solid pink;padding-left: 5px;">商品描述: </span>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ goodsdataOne.goodsDescription }}</p>
            </div>
            <div class="choice">
                <span style="font-size:2em;" :class="collectIcon" @click="goodsCollection"></span>
                <span style="font-size:2em;" class="el-icon-chat-dot-round" @click="gototalkwith"></span>
                <div class="buy_wrap">
                    <p class="p1" @click="buybuybuy">购买</p>
                    <p class="p2" @click="addIntoShopCar">加入购物车</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'goodsPage',
    data() {
        return {
            goodsdataOne: {},
            userdata: { mygoods: { goodsName: "未登录", goodsPrize: 0 } },
            collectIcon: 'el-icon-star-off',
            // myGoodsData:{},
        }
    },
    methods: {
        gototalkwith() {
            if (this.$store.state.userForm._id == " ") {
                this.$message.error("未登录!!!")
                return
            }
            this.$router.push({ path: '/chatPage', query: { data: this.$route.query.data.categoryOwner } })
        },
        intoSeller() {
            if (this.$store.state.userForm._id == " ") {
                this.$message.error("未登录!!!")
                return
            }
            this.$router.push({ path: '/seller', query: { data: this.userdata._id } })
        },
        async buybuybuy() {
            if (this.$store.state.userForm._id == " ") {
                this.$message.error("未登录!!!")
                return
            }
            let arr = []
            arr.push(this.$route.query.data._id)
            let { data } = await this.$axios.post("/node/goodsRou/buyTheGoods", {
                catoUser: this.$store.state.userForm._id,
                cargoods: arr
            })
            if (data.code) {
                this.$message.success(data.value)
            }
        },
        async getData() {
            console.log(this.$route.query.data._id);
            if (this.$store.state.userForm._id == " ") {
                this.goodsdataOne = this.$route.query.data
                if (this.$route.query.data.length) return
                let { data } = await this.$axios.post("/node/goodsRou/getUserData", {
                    id: this.$route.query.data.categoryOwner,
                })
                this.userdata = data;
                this.$store.commit("ChangeGoodsUserLogo", data.userLogo)
                this.$store.state.userSecond.collectGoods.forEach((item, index) => {
                    // console.log(item);
                    if (item == this.$route.query.data._id) {
                        this.collectIcon = 'el-icon-star-on'
                    }
                });
            } else {
                this.goodsdataOne = this.$route.query.data
                if (this.$route.query.data.length) return
                let { data } = await this.$axios.post("/node/goodsRou/getUserData", {
                    id: this.$route.query.data.categoryOwner,
                    myid: this.$store.state.userForm._id
                })
                this.userdata = data;
                this.$store.commit("ChangeGoodsUserLogo", data.userLogo)
                this.$store.state.userSecond.collectGoods.forEach((item, index) => {
                    // console.log(item);
                    if (item == this.$route.query.data._id) {
                        this.collectIcon = 'el-icon-star-on'
                    }
                });
            }

        },
        async goodsCollection() {
            if (this.$store.state.userForm._id == " ") {
                this.$message.error("未登录!!!")
                return
            }
            let ifnext = true;
            this.$store.state.userSecond.collectGoods.forEach((item, index) => {
                if (item == this.$route.query.data._id) {
                    this.$message.error("您已收藏该商品,取消收藏请至我的页面")
                    ifnext = false
                }
            });
            if (ifnext) {
                let { data } = await this.$axios.post("/node/changeInfo/goodsCollection", {
                    goodsid: this.$route.query.data._id,
                    userid: this.$store.state.userForm._id
                })


                if (data.code) {
                    this.$message.success(data.value)
                    this.$store.state.userSecond.collectGoods.push(this.$route.query.data._id)
                    this.collectIcon = 'el-icon-star-on'
                }
            }
        },
        async addIntoShopCar() {
            if (this.$store.state.userForm._id == " ") {
                this.$message.error("未登录!!!")
                return
            }
            let { data } = await this.$axios.post("/node/goodsRou/addIntoShopCar", {
                goodsid: this.$route.query.data._id,
                userid: this.$store.state.userForm._id
            })
            if (data.code) {
                this.$message.success(data.value)
            } else {
                this.$message.error(data.value)
            }
        }
    },
    created() {
        this.getData()
        // this.getget()

    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
    // computed:{
    // }
}
</script>

<style lang="less">
.goodsPage {
    display: flex;
    justify-content: space-evenly;
    padding: 20px;
    // width: 100%;
    border-radius: 10px;
    // box-shadow: 2px 3px 8px 2px rgb(173, 225, 219);
    // margin-bottom: 20px;
    // background: pink;
    box-shadow: 0 2px 12px 0 rgba(94, 199, 241, 0.8);
    background-color: rgba(167, 219, 240, 0.8);

    .left {
        width: 40%;
        border-radius: 30px;
        height: 85vh;
        box-shadow: 2px 3px 8px 2px #eee;
        background: white;
        overflow: scroll;
    }

    .right {
        width: 400px;
        height: 85vh;
        border-radius: 30px;
        overflow: hidden;
        background: white;
        box-shadow: 2px 3px 8px 2px #eee;

        .swiperTop {
            // margin: 0px auto;
            border-radius: 30px 30px 0 0;
            // width: 80%;
            height: 300px;
        }

        .mainInfo {
            border-radius: 0 0 50px 0;
            display: flex;
            justify-content: space-between;
            // margin-top: -17px;
            width: 100%;
            height: 48px;
            background: rgb(190, 231, 244);
            border-top: 2px solid #eee;

            // border-bottom: 1px solid #eee;
            p {
                width: 80%;
                text-align: center;
                font-size: large;
                line-height: 10px;
            }

            img {
                z-index: 2;
                margin-top: -50px;
                border-radius: 50%;
                width: 100px;
                height: 100px;
                // background: #99a9bf;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        .information {
            padding-left: 20px;
            padding-top: 20px;
            width: calc(100% - 20px);
            height: calc(100% - 300px - 113px);
            overflow: scroll;

            // background-color: rgb(144, 186, 170);
            p {
                font-size: 1.2em;
                margin-left: 40px;
                width: 70%;
                overflow-wrap: break-word;
                // background-color: #eee;
            }
        }

        .choice {
            display: flex;
            justify-content: flex-end;
            // align-content: center;
            align-items: center;
            // border-top: 3px solid pink;
            border-top:3px solid rgba(94, 199, 241, 0.8);
            width: 100%;
            height: 40px;
            // background-color: #eee;

            .buy_wrap {
                display: flex;
                justify-content: space-between;
                line-height: 0%;
                margin-left: 10px;
                margin-right: 20px;
                width: 160px;
                height: 86%;
                border-radius: 30px 30px 30px 30px;
                background: linear-gradient(to right, pink 0%, pink 35%, skyblue 35%, skyblue 100%);

                .p1 {
                    width: 35%;
                    text-align: center;

                    &:hover {
                        cursor: pointer;
                    }
                }

                .p2 {
                    width: 65%;
                    text-align: center;

                    &:hover {
                        cursor: pointer;
                    }
                }

            }

            span:hover {
                // transition: 1s;
                font-weight: bolder;
                cursor: pointer;
            }
        }
    }

}


//走马灯样式
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>