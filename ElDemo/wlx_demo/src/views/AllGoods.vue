<template>
    <div class="allGoods">
        <div class="kindsGoods">
            <ul class="kind_list">
                <li v-for="(item, index) in kindListOne" :key="index" @click="getIntoKindPage(index + 1)">
                    <div class="kind_list_bg">
                        <p>{{ item.kindName }}</p>
                    </div>
                    <div :class="item.className"></div>
                </li>
            </ul>
            <ul class="kind_list">
                <li v-for="(item, index) in kindListTwo" :key="index" @click="getIntoKindPage(index + 6)">
                    <div class="kind_list_bg">
                        <p>{{ item.kindName }}</p>
                    </div>
                    <div :class="item.className"></div>
                </li>
            </ul>
        </div>
        <div class="kindsArea">
            <div style="height: 30px;display: flex;justify-content: flex-end;margin-right: 40px;">
                <!-- <select name="" id="">
                    <option value="热度升序">热度升序</option>
                    <option value="热度降序">热度降序</option>
                </select> -->
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link" style="color:red;">
                        热度<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">降序</el-dropdown-item>
                        <el-dropdown-item command="b">升序</el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>

                <el-dropdown trigger="click" style="margin-left:20px;" @command="handleCommand">
                    <span class="el-dropdown-link" style="color:red;">
                        价格<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">

                        <el-dropdown-item command="c">降序</el-dropdown-item>
                        <el-dropdown-item command="d">升序</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

            <ul class="kinds_goodsList">

                <li v-for="(item, index) in goodsImgUrl" :key="index" @click="getIntoAllGoods(index)">
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
    name: 'AllGoods',
    data() {
        return {
            goodsImgUrl: [],
            kindListOne:
                [{ className: "kind_list_p img1", kindName: "手机", pathTo: "" },
                { className: "kind_list_p img2", kindName: "家具", pathTo: "" },
                { className: "kind_list_p img3", kindName: "电器", pathTo: "" },
                { className: "kind_list_p img4", kindName: "电脑", pathTo: "" },
                { className: "kind_list_p img5", kindName: "运动", pathTo: "" }],
            kindListTwo:
                [{ className: "kind_list_p img6", kindName: "男装", pathTo: "" },
                { className: "kind_list_p img7", kindName: "女装", pathTo: "" },
                { className: "kind_list_p img8", kindName: "鞋子", pathTo: "" },
                { className: "kind_list_p img9", kindName: "食品", pathTo: "" },
                { className: "kind_list_p img10", kindName: "饰品", pathTo: "" }]
        }
    },
    methods: {
        getIntoKindPage(type) {
            // console.log(type);
            this.$router.push({ path: "/KindPage", query: { data: type } })
        },
        // ss(){
        //     console.log("--");
        // },
        handleCommand(command) {
            // this.$message('click on item ' + command);
            switch (command) {
                case "a":
                    // console.log("a");
                    this.goodsImgUrl.sort((x, y) => {
                        return (y.clickHotTimes - x.clickHotTimes)
                    })
                    // this.goodsImgUrl = []
                    // this.getAllGoods(command)
                    break;
                case "b":
                    this.goodsImgUrl.sort((x, y) => {
                        return (x.clickHotTimes - y.clickHotTimes)
                    })
                    // console.log("b");
                    // this.getAllGoods(command)
                    break;
                case "c":
                    this.goodsImgUrl.sort((x, y) => {
                        return (y.goodsPrize - x.goodsPrize)
                    })
                    // console.log("c");
                    // this.getAllGoods(command)
                    break;
                case "d":
                    this.goodsImgUrl.sort((x, y) => {
                        return (x.goodsPrize - y.goodsPrize)
                    })
                    // console.log("d");
                    // this.getAllGoods(command)
                    break;
            }
        },
        async getAllGoods() {

            let id = ''
            if (this.$store.state.userForm._id != " ") {
                id = this.$store.state.userForm._id
            }
            // console.log(command);
            let { data } = await this.$axios.post("/node/goodsRou/getAllGoods", {
                mode: "a",
                id: id
            })
            this.goodsImgUrl = data
            // console.log(data);
        },
        async getIntoAllGoods(index) {
            // console.log(index);
            this.$store.commit("ChangeifIntoGoodsPage", true)
            this.$router.push({ path: '/goodsPage', query: { data: this.goodsImgUrl[index] } })
            let {data} = await this.$axios.post("/node/goodsRou/addGoodsHotOnce", {
                id: this.goodsImgUrl[index]._id
            })
        },
    },
    mounted() {
        this.getAllGoods()
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">
.allGoods {
    .kindsGoods {
        width: calc(100% - 4px);
        height: 200px;
        border-radius: 10px;
        // border: 2px solid #5ec7f1;
        // box-shadow: 2px 3px 8px 2px #5ec7f1;
        box-shadow: 0 2px 12px 0 rgba(94, 199, 241, 0.8);
        background-color: white;

        .kind_list {
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;

            li {
                user-select: none;
                margin: 5px 0px;
                border-radius: 10px;
                border: 2px solid rgba(94, 199, 241, 0.8);
                width: 86px;
                height: 86px;
                box-shadow: 0 2px 12px 0 rgba(94, 199, 241, 0.8);
                // background-color: white;

                &:hover {
                    cursor: pointer;
                }

                // background: pink;
                .kind_list_bg {
                    // z-index: 4;
                    width: 100%;
                    height: 43%;
                    border-radius: 0px 0px 10px 10px;
                    background-color: rgba(94, 199, 241, 0.8);
                    margin-top: 57%;

                    p {
                        line-height: 53px;
                        text-align: center;
                    }
                }

                .kind_list_p {
                    // z-index: 3;
                    margin-top: -100%;
                    border-radius: 10px 10px 15px 15px;
                    width: 100%;
                    height: 76%;
                    // background-color: aquamarine;
                }

                .img1 {
                    background-image: url("../assets/Img/phone.webp");
                    background-size: 86px 66px;
                }

                .img2 {
                    background-image: url("../assets/Img/jiaju.webp");
                    background-size: 86px 66px;
                }

                .img3 {
                    background-image: url("../assets/Img/dianqi.webp");
                    background-size: 86px 66px;
                }

                .img4 {
                    background-image: url("../assets/Img/diannao.webp");
                    background-size: 86px 76px;
                }

                .img5 {
                    background-image: url("../assets/Img/yundong.webp");
                    background-size: 86px 86px;
                }

                .img6 {
                    background-image: url("../assets/Img/nanzhuang.webp");
                    background-size: 86px 66px;
                }

                .img7 {
                    background-image: url("../assets/Img/nvzhuang.webp");
                    background-size: 86px 86px;
                }

                .img8 {
                    background-image: url("../assets/Img/xiezi.webp");
                    background-size: 86px 70px;
                }

                .img9 {
                    background-image: url("../assets/Img/shipin.webp");
                    background-size: 86px 70px;
                }

                .img10 {
                    background-image: url("../assets/Img/shoushi.webp");
                    background-size: 86px 66px;
                }
            }
        }
    }

    .kindsArea {
        width: calc(100% - 4px);
        border-radius: 10px;
        border-right: 2px solid #eee;
        // box-shadow: 2px 3px 8px 2px rgb(173, 225, 219);
        // background-color: rgb(220, 243, 249);
        box-shadow: 0 2px 12px 0 rgba(94, 199, 241, 0.8);
        background-color: rgba(167, 219, 240, 0.8);
        margin: 10px auto;

        .kinds_goodsList {
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

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
}
</style>