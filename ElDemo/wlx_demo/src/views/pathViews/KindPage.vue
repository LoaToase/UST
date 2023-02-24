<template>
    <div class="KindPage">
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

                <li v-for="(item, index) in goodsImgUrl" :key="index" @click="getIntoKindGoods(index)">
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
    name: 'KindPage',
    data() {
        return {
            goodsImgUrl: [],
        }
    },
    methods: {
        async getKindGoods(type) {
            let { data } = await this.$axios.post("/node/goodsRou/getKindGoods", {
                type: type,
                id: this.$store.state.userForm._id
            })
            // console.log(data);
            this.goodsImgUrl = data
        },
        async getIntoKindGoods(index) {
            this.$store.commit("ChangeifIntoGoodsPage", true)
            this.$router.push({ path: '/goodsPage', query: { data: this.goodsImgUrl[index] } })
            let {data} = await this.$axios.post("/node/goodsRou/addGoodsHotOnce", {
                id: this.goodsImgUrl[index]._id
            })
        },
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
    },
    mounted() {
        // console.log(this.$route.query.data);
        this.getKindGoods(this.$route.query.data)
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">
.KindPage {
    .kindsArea {
        width: calc(100% - 4px);
        border-radius: 10px;
        border-right: 2px solid #eee;
        // box-shadow: 2px 3px 8px 2px rgb(173, 225, 219);
        // background-color: rgb(220, 243, 249);
        margin: 10px auto;
        box-shadow: 0 2px 12px 0 rgba(94, 199, 241, 0.8);
        background-color: rgba(167, 219, 240, 0.8);

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
                    background-image: url("../../assets/Img/GoodsBg.webp");
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
</style>