<template>
    <div class="newGoods">
        <div class="showP"></div>
        <div class="new_goodsArea">
            <ul class="New_goodsList">
                <li v-for="(item,index) in goodsdata" :key="index" @click="getIn(index)">
                    <div class="showImg_wrap">
                        <img :src="'/node' + item.goodsImg[0]" width="100%" height="100%" style="border-radius: 50%;">
                        <p class="prize_wrap">￥{{item.goodsPrize}}</p>
                    </div>
                    <div class="content_wrap">
                        <div class="description">
                            <h3 style="margin:0; padding:0;">{{item.goodsName}}</h3>
                            <p>{{item.goodsDescription}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewGoods',
    data() {
        return {
            goodsImgUrl: [],
            goodsdata:[],
        }
    },
    methods:{
        async getIn(index){
            // let date = new Date();
            // date.setDate(date.getDate() - 2)
            // console.log(date);
            // console.log(last.getDate());
            this.$store.commit("ChangeifIntoGoodsPage",true)
            this.$router.push({path:'/goodsPage',query:{data:this.goodsdata[index]}})
            let {data} = await this.$axios.post("/node/goodsRou/addGoodsHotOnce",{
                id:this.goodsdata[index]._id
            })
        },
        async getGoodsInfoNew(){
            let id = ''
            if(this.$store.state.userForm._id != " "){
                id = this.$store.state.userForm._id
            }
            let {data} = await this.$axios.post("/node/goodsRou/getGoodsInfoNew",{
                id:id
            })
            // console.log(data);
            this.goodsdata = data
        },
    },
    mounted(){
        this.getGoodsInfoNew()
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
    // destroyed(){
    //     console.log("123");
    // }
}
</script>

<style lang="less">
.newGoods {
    .showP {
        width: 100%;
        height: 50px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        box-shadow: 2px 3px 8px 2px #ccc;
        background-color: rgba(94, 199, 241, 0.8);
        border-radius: 10px;
    }

    .new_goodsArea {
        margin: 10px auto;
        border-radius: 20px;
        // box-shadow: 2px 3px 8px 2px rgb(173, 225, 219);
        // background-color: rgb(220, 243, 249);
        box-shadow: 0 2px 12px 0 rgba(94, 199, 241, 0.8);
        background-color: rgba(167, 219, 240, 0.8);

        .New_goodsList {
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
</style>