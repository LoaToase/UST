<template>
    <div class="main_page">
        <div class="gohorse_lifht">
            <el-carousel :interval="4000" type="card" height="250px">
                <el-carousel-item v-for="(item, index) in goodsImgUrl" :key="index">
                    <h3 class="medium"><img class="gogImg" width="100%" :height="index == 0 ? '600px' : '250px'" :src="'/node' + item.goodsImg[0]" alt=""
                            @click="getIntoGoodsInfoMain(index)"></h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="goodsShowArea">
            <ul class="main_goodsList">
                <li v-for="(item, index) in goodsdata" :key="index" @click="getIntoGoodsPage(index)">

                    <div class="showImg_wrap">
                        <img :src="'/node' + item.goodsImg[0]" width="100%" height="100%" style="border-radius: 50%;">
                        <p class="prize_wrap">￥{{ item.goodsPrize }}</p>
                    </div>
                    <div class="content_wrap">
                        <div class="description">
                            <h3 style="margin:0; padding:0;">{{ item.goodsName }}</h3>
                            <p>{{ item.goodsDescription }}</p>
                        </div>
                    </div>

                </li>

            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainPage',
    data() {
        return {
            goodsImgUrl: [],
            goodsdata: [],
        }
    },
    methods: {
        async getGoodsInfoMain() {
            let id = ''
            if (this.$store.state.userForm._id != " ") {
                id = this.$store.state.userForm._id
            }
            let { data } = await this.$axios.post("/node/goodsRou/getGoodsInfo", {
                id: id
            })
            // console.log(data);
            this.goodsdata = data
            if (data.length < 5) {
                this.goodsImgUrl = [{ goodsImg: ["/userImg/selfInfoBg"] },
                { goodsImg: ["/userImg/selfInfoBg"] }, { goodsImg: ["/userImg/selfInfoBg"] },
                { goodsImg: ["/userImg/selfInfoBg"] }, { goodsImg: ["/userImg/selfInfoBg"] },]
            } else {
                this.goodsImgUrl.push(data[0])
                this.goodsImgUrl.push(data[1])
                this.goodsImgUrl.push(data[2])
                this.goodsImgUrl.push(data[3])
                this.goodsImgUrl.push(data[4])
            }
            // console.log(this.goodsdata);

            // console.log(this.goodsImgUrl);
        },
        async getIntoGoodsInfoMain(index) {
            // console.log(index);
            this.$store.commit("ChangeifIntoGoodsPage", true)
            this.$router.push({ path: '/goodsPage', query: { data: this.goodsImgUrl[index] } })
            let { data } = await this.$axios.post("/node/goodsRou/addGoodsHotOnce", {
                id: this.goodsImgUrl[index]._id
            })
        },
        async getIntoGoodsPage(index) {
            // console.log(index);
            this.$store.commit("ChangeifIntoGoodsPage", true)
            this.$router.push({ path: '/goodsPage', query: { data: this.goodsdata[index] } })
            let { data } = await this.$axios.post("/node/goodsRou/addGoodsHotOnce", {
                id: this.goodsdata[index]._id
            })
        }
    },
    mounted() {
        this.getGoodsInfoMain()
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">
.main_page {
    // padding: 20px;

    .gohorse_lifht {
        border-radius: 10px;
        // box-shadow: 2px 3px 8px 2px rgb(173, 225, 219);
        box-shadow: 0 2px 12px 0 rgba(94, 199, 241, 0.8);
        margin-bottom: 20px;

        // .gogImg {
        //     // width: 522.5px;
        //     // margin: 0 auto;
        //     height: 250px;
        // }
        // .gogImg:nth-of-type(1){
        //     height: 250px;
        //     // height: 100%;
        // }
    }

    .goodsShowArea {
        border-radius: 10px;
        // box-shadow: 2px 3px 8px 2px rgb(173, 225, 219);
        // background-color: rgb(220, 243, 249);
        border-right: 2px solid #eee;
        box-shadow: 0 2px 12px 0 rgba(94, 199, 241, 0.8);
        background-color: rgba(167, 219, 240, 0.8);
        .main_goodsList {
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            li {
                position: relative;
                border-radius: 50%;
                // box-shadow: 2px 3px 8px 2px #eee;
                margin: 10px 100px;
                width: 280px;
                height: 280px;
                // background: pink;
                display: flex;
                justify-content: center;

                .showImg_wrap {
                    z-index: 4;
                    position: absolute;
                    left: 0;
                    width: 280px;
                    height: 100%;
                    border-radius: 50%;
                    box-shadow: 0px 0px 10px 0px rgb(173, 225, 219);
                    background: rgb(173, 225, 219);
                    transition: .5s;

                    .prize_wrap {
                        position: relative;
                        top: -75px;
                        left: 33px;
                        height: 35px;
                        width: 215px;
                        line-height: 35px;
                        text-align: center;
                        font-size: 1.5em;
                        color: black;
                        background: rgb(173, 225, 219);
                        clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%);
                    }

                }

                &:hover {
                    cursor: pointer;
                }

                &:hover .showImg_wrap {
                    transition: .5s;
                    left: -100px;
                }

                &:hover .content_wrap {
                    transition: .5s;
                    width: 340px;
                    opacity: 1;
                    visibility: visible;

                    .description {
                        width: 170px;
                    }
                }

                .content_wrap {
                    opacity: 0;
                    transition: .5s;
                    z-index: 3;
                    border-radius: 10px 20px 20px 10px;
                    background-image: url("../assets/Img/GoodsBg.webp");
                    background-position: -160px 300px;
                    position: absolute;
                    left: 30px;
                    width: 0px;
                    height: 100%;
                    // box-shadow: 2px 3px 8px 2px #eee;
                    visibility: hidden;

                    .description {
                        backdrop-filter: blur(5px);
                        color: rgb(0, 0, 0);
                        transition: .5s;
                        padding: 10px;
                        border-radius: 20px;
                        border-left: 1px solid #eee;
                        float: right;
                        width: 0px;
                        height: calc(100% - 20px);

                        // background: #eee;
                        p {
                            width: 100%;
                            height: 210px;
                            overflow: hidden;
                            // background: #475669;
                        }
                    }
                }
            }

        }
    }
}

//走马灯样式
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>