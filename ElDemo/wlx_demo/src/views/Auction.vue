<template>
    <div class="auction_wrap">
        <!-- 大显示屏 -->
        <div class="main_auct">
            <div class="leftSide_p"></div>
            <div class="midSide_good">
                <ul class="midSide_good_ul">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li><img :src="'/node' + auctionImgUrl[0].goodsImg" alt="" width="100%" height="100%"
                            style="border-radius:50%;"></li>
                </ul>
            </div>
            <div class="rightSide_p"></div>
        </div>

        <!-- 图片轮播栏 -->
        <div class="auct_listOne">
            <ul class="auct_listOne_ul01" ref="ulOne">
                <li v-for="(item, index) in arr" :key="index">
                    <img src="../assets/Img/5.webp" alt="" width="100%" height="100%" style="border-radius:10px;">
                </li>
            </ul>
            <ul class="auct_listOne_ul02" ref="ulTwo">
                <li v-for="(item, index) in arr" :key="index">
                    <img src="../assets/Img/2.webp" alt="" width="100%" height="100%" style="border-radius:10px;">
                </li>
            </ul>
        </div>
        <div class="auct_listTwo">
            <ul class="auct_goodsList">
                <li v-for="(item, index) in auctionImgUrl" :key="index" @click="getIntoAuctionPage(item.catoUser)">
                    <div class="showImg_wrap">
                        <img :src="'/node' + item.goodsImg" width="100%" height="100%" style="border-radius: 50%;">
                        <p class="prize_wrap">起拍价 ￥{{ item.goodsFirstPrize }}</p>
                    </div>
                    <div class="content_wrap">
                        <div class="description">
                            <h3 style="margin:0; padding:0;">{{ item.goodsName }}</h3>
                            <p>
                                <span>开始竞拍时间 :</span><br>
                                <span>{{ item.startTime }}</span><br>
                                {{ item.goodsDesc }}
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Auction',
    data() {
        return {
            arr: ["../assets/Img/1.webp", "../assets/Img/2.webp", "../assets/Img/3.webp",
                "../assets/Img/4.webp", "../assets/Img/5.webp", "../assets/Img/6.webp"],
            auctionImgUrl: [{ goodsImg: "/userImg/userLogo.webp" }],
        }
    },
    methods: {
        getIntoAuctionPage(catoUser) {
            // console.log(catoUser);
            if (this.$store.state.userForm._id == " ") {
                this.$message.error("未登录!!!")
                return
            }
            this.$router.push({ path: '/AuctionPage', query: { data: catoUser } })
        },
        async getAuctiondata() {
            let { data } = await this.$axios.post("/node/goodsRou/getAuctiondata", {})
            // console.log(new Date(data.auction[0].startTime));
            // console.log(data);

            this.auctionImgUrl = data.auction
            this.auctionImgUrl.forEach(item => {
                let time = item.startTime
                // console.log(time);
                let finalTime = new Date(time).getFullYear() + "-" + new Date(time).getMonth() + "-" + new Date(time).getDate()
                    + " " + new Date(time).getHours() + ":" + new Date(time).getMinutes()
                item.startTime = finalTime
            });
        },
        timer() {
            this.$refs.ulOne.style.left = "0px"    //0   1431   1543
            this.$refs.ulTwo.style.left = "260px" //260   2621

            // this.$refs.ulTwo.style.top = "0px"
            let sp = 50;
            let clo = setInterval(() => {
                let locat = parseInt(this.$refs.ulOne?.style.left);
                let locat2 = parseInt(this.$refs.ulTwo?.style.left);

                // console.log(locat);
                try {
                    this.$refs.ulTwo.style.transition = "1s linear"
                    this.$refs.ulOne.style.transition = "1s linear"
                    this.$refs.ulOne.style.left = `${locat - sp}px`
                    this.$refs.ulTwo.style.left = `${locat2 - sp}px`
                    if (parseInt(this.$refs.ulOne?.style.left) <= -1440) {
                        this.$refs.ulOne.style.transition = ""
                        this.$refs.ulOne.style.left = "1440px";
                    }
                    if (parseInt(this.$refs?.ulTwo.style.left) <= -2620) {
                        this.$refs.ulTwo.style.transition = ""
                        this.$refs.ulTwo.style.left = "260px";
                    }
                } catch {
                }
            }, 1000);
        },
    },
    mounted() {
        this.getAuctiondata()
        this.timer()
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">
.auction_wrap {
    .main_auct {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        height: 500px;
        border-radius: 20px;
        border-right: 2px solid #eee;
        // box-shadow: 2px 3px 8px 2px rgb(173, 225, 219);
        // background-color: rgb(220, 243, 249);
        box-shadow: 0 2px 12px 0 rgba(94, 199, 241, 0.8);
        background-color: white;

        @media screen and (max-width:1500px) {
            // background-color: aqua;
        }

        .leftSide_p {
            border-radius: 0 20px 20px 0;
            width: 50px;
            height: 80%;
            background-color: rgba(94, 199, 241, 0.8);
        }

        .midSide_good {
            width: 600px;
            height: 500px;
            border-radius: 20px;
            // background-color: rgba(94, 199, 241, 0.8);

            .midSide_good_ul {
                margin: 180px auto;
                position: relative;

                &:hover {
                    li:nth-of-type(1) {
                        transform: translateX(-60px) translateY(35px) rotateX(22deg) rotateZ(1deg) rotateY(50deg);
                    }

                    // li:nth-of-type(2){
                    //     transform: translateX(150px) translateY(110px) rotateX(65deg) rotateZ(20deg);
                    // }
                    li:nth-of-type(3) {
                        transform: translateX(260px) translateY(-160px) rotateX(22deg) rotateZ(1deg) rotateY(20deg);
                    }

                    li:nth-of-type(4) {
                        transform: translateX(366px) translateY(-50px) rotateX(25deg) rotateZ(1deg) rotateY(110deg);
                    }

                    li:nth-of-type(5) {
                        transform: translateX(-50px) translateY(-95px) rotateX(26deg) rotateZ(0deg) rotateY(110deg);
                    }

                    li:nth-of-type(6) {
                        transform: translateX(157px) translateY(-235px) rotateX(65deg) rotateZ(20deg);
                    }
                }

                li {
                    position: absolute;
                    width: 250px;
                    height: 250px;

                }

                li:nth-of-type(1) {
                    z-index: 3;
                    background-image: url("../assets/Img/1.webp");
                    background-size: 250px 250px;
                    opacity: .9;
                    border: 1px solid #eee;
                    transform: translateX(110px) translateY(-27px) rotateX(22deg) rotateZ(1deg) rotateY(20deg);
                    transition: 1s;
                }

                li:nth-of-type(2) {
                    z-index: 1;
                    background-image: url("../assets/Img/2.webp");
                    background-size: 250px 250px;
                    opacity: .9;
                    border: 1px solid #eee;
                    transform: translateX(150px) translateY(40px) rotateX(65deg) rotateZ(20deg);
                    transition: 1s;
                }

                li:nth-of-type(3) {
                    z-index: 1;
                    background-image: url("../assets/Img/3.webp");
                    background-size: 250px 250px;
                    opacity: .9;
                    border: 1px solid #eee;
                    transform: translateX(196px) translateY(-127px) rotateX(22deg) rotateZ(1deg) rotateY(20deg);
                    transition: 1s;
                }

                li:nth-of-type(4) {
                    z-index: 3;
                    background-image: url("../assets/Img/4.webp");
                    background-size: 250px 250px;
                    opacity: .9;
                    border: 1px solid #eee;
                    transform: translateX(271px) translateY(-58px) rotateX(25deg) rotateZ(1deg) rotateY(110deg);
                    transition: 1s;
                }

                li:nth-of-type(5) {
                    z-index: 1;
                    background-image: url("../assets/Img/5.webp");
                    background-size: 250px 250px;
                    opacity: .9;
                    border: 1px solid #eee;
                    transform: translateX(36px) translateY(-95px) rotateX(26deg) rotateZ(0deg) rotateY(110deg);
                    transition: 1s;
                }

                li:nth-of-type(6) {
                    z-index: 3;
                    background-image: url("../assets/Img/6.webp");
                    background-size: 250px 250px;
                    opacity: .9;
                    border: 1px solid #eee;
                    transform: translateX(157px) translateY(-193px) rotateX(65deg) rotateZ(20deg);
                    transition: 1s;
                }

                li:nth-of-type(7) {
                    z-index: 2;
                    background-image: url("../assets/Img/6.webp");
                    background-size: 250px 250px;
                    border-radius: 50%;
                    // opacity: .9;
                    // border: 1px solid #eee;
                    transform: translateX(155px) translateY(-45px);
                    transition: 1s;
                }
            }
        }

        .rightSide_p {
            border-radius: 20px 0px 0px 20px;
            width: 50px;
            height: 80%;
            background-color: rgba(94, 199, 241, 0.8);
            margin-right: -2px;
        }
    }

    .auct_listOne {
        border-radius: 10px;
        border-top: 5px solid rgb(94, 199, 241);
        border-bottom: 5px solid rgb(94, 199, 241);
        display: flex;
        width: 100%;
        height: 250px;
        box-shadow: 2px 3px 8px 2px rgb(173, 225, 219);
        // background-color: rgb(220, 243, 249);
        margin: 10px auto;
        overflow: hidden;
        

        .auct_listOne_ul01 {
            position: relative;
            left: 0%;
            margin: 0px;
            padding: 0;
            display: flex;
            flex-wrap: nowrap;
            width: 1190px;

            // transition: .1s linear;
            // transition-duration: 1s;
            // transition-timing-function: linear;
            li {
                border-radius: 10px;
                flex-shrink: 0;
                width: 200px;
                margin-top: 10px;
                margin-left: 40px;
                height: 230px;
                // background: pink;
            }
        }

        .auct_listOne_ul02 {
            position: relative;
            margin: 0px;
            padding: 0;
            display: flex;
            flex-wrap: nowrap;
            width: 1190px;

            li {
                flex-shrink: 0;
                width: 200px;
                margin: 10px 21px;
                height: 230px;
                border-radius: 10px;
                // background: rgb(223, 24, 57);
            }
        }
    }

    .auct_listTwo {
        // box-shadow: 2px 3px 8px 2px rgb(173, 225, 219);
        // background-color: rgb(220, 243, 249);
        border-right: 2px solid #eee;
        border-radius: 20px;
        box-shadow: 0 2px 12px 0 rgba(94, 199, 241, 0.8);
        background-color: rgba(167, 219, 240, 0.8);
        .auct_goodsList {
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
                    // background: rgb(173, 225, 219);
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
</style>