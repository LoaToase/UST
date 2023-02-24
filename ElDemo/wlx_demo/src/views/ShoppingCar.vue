<template>
    <div class="shoppingCar">
        <ul class="shop_list">
            <li v-for="item in shopCarInfo" :key="item._id">
                <div>
                    <el-checkbox-group v-model="checkedPrize">
                        <el-checkbox :label="item" @change="onChange">-</el-checkbox>
                    </el-checkbox-group>
                    <img :src="'/node' + item.goodsImg[0]" alt="" class="shoppingCar_li_img">
                    <p class="shoppingCar_li_p1">{{ item.goodsName }}</p>
                </div>
                <p class="shoppingCar_li_p2">￥{{ item.goodsPrize }}</p>

            </li>

        </ul>
        <div class="outer_wrap">
            <div class="shop_logo">
                <div class="shop_pay_app">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="CheckAllChange">全选
                    </el-checkbox>
                    <p>总价: ￥{{ totalPrize }}</p>
                    <el-button type="primary" round @click="buyTheGoods" style="margin-left:45%;">下单</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShoppingCar',
    data() {
        return {
            showBol: true,
            shopCarInfo: [],
            checkedPrize: [],
            checkAll: false,
            isIndeterminate: true,
            totalPrize: 0,
        }
    },
    methods: {
        async buyTheGoods() {
            if (this.checkedPrize == 0) {
                this.$message.error("请选择物品下单")
                return
            }
            let goodinfo = []
            this.checkedPrize.forEach(item => {
                goodinfo.push(item._id)
            })
            let { data } = await this.$axios.post("/node/goodsRou/buyTheGoods", {
                catoUser: this.$store.state.userForm._id,
                cargoods: goodinfo
            })
            // console.log(data);
            if (data.code) {
                this.$message.success(data.value)
                this.checkedPrize.forEach(item => {
                    for (let j = 0; j < this.shopCarInfo.length; j++) {
                        if (item == this.shopCarInfo[j]) {
                            this.shopCarInfo.splice(j, 1)
                        }
                    }
                })
                this.checkedPrize = []
                this.totalPrize = 0

            }
        },
        async getShopCarInfo() {
            if (this.$store.state.userForm._id == " ") return
            let { data } = await this.$axios.post("/node/goodsRou/getShopCarInfo", {
                id: this.$store.state.userForm._id
            })
            if (data) {
                this.shopCarInfo = data;
            }
            // console.log(data);
            // let logo = document.getElementsByName("getDom")
            // console.log(logo[0].className == "shop_pay_app");
            // if(logo[0].className == "shop_pay_app"){
            //     logo[0].className = "shop_pay_none"
            //     return ;
            // }
            // // console.log(logo[0].className);
            // if(logo[0].className == "shop_pay_none"){
            //     logo[0].className = "shop_pay_app"
            //     return ;
            // }
        },
        onChange(value) {
            // console.log(value);
            // if(value){
            //     // this.totalPrize += 
            // }
            let temp = 0;
            if (this.checkedPrize) {
                this.checkedPrize.forEach(item => {
                    temp += item.goodsPrize
                })
            }
            this.totalPrize = temp
        },
        CheckAllChange(val) {
            // console.log(value);
            // console.log(this.checkedPrize);
            if (val) {
                let arr = [];
                this.shopCarInfo.forEach(item => {
                    arr.push(item)
                });
                this.checkedPrize = arr
            } else {
                this.checkedPrize = []
            }
            let temp = 0;
            if (this.checkedPrize) {
                this.checkedPrize.forEach(item => {
                    temp += item.goodsPrize
                })
            }
            this.totalPrize = temp
            // this.checkedPrize = val ? cityOptions : [];
            this.isIndeterminate = false;
        }
    },
    mounted() {
        this.getShopCarInfo()
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">
.shoppingCar {
    border-radius: 10px;
    // border-top: 2px solid #eee;

    // border-left: 2px solid #eee;
    // .shopWrap_line{}
    .shop_list {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;


        li {
            // align-items: center;
            width: 700px;
            height: 130px;
            margin: 10px auto;
            display: flex;
            justify-content: space-between;
            border-radius: 10px;
            // box-shadow: 2px 3px 8px 2px rgb(173, 225, 219);
            // background-color: rgb(220, 243, 249);
            box-shadow: 0 2px 12px 0 rgba(94, 199, 241, 0.8);
            background-color: white;

            div {
                display: flex;
            }

            .shoppingCar_li_img {
                border-radius: 50%;
                width: 100px;
                height: 100px;
                margin-top: 15px;
                background-color: pink;
            }

            .shoppingCar_li_p1 {
                margin-left: 10px;
                font-size: 1.4em;
            }

            .shoppingCar_li_p2 {
                height: 45px;
                padding-right: 5px;
                border-radius: 10px;
                border: 1px solid #ccc;
                color: red;
                margin-right: 20px;
                font-size: 2em;
            }
        }
    }

    .outer_wrap {
        .shop_logo {
            position: fixed;
            bottom: 130px;
            right: 0px;
            border-radius: 50px;
            width: 100px;
            height: 100px;
            background-image: url("../assets/Img/shopIcon.png");
            background-color: rgb(94, 199, 241);
            background-size: 90px 90px;
            background-position: 7px 10px;
            background-repeat: no-repeat;
            transition: 0.5s;

            &:hover {
                background-image: url("");
                width: calc(100vw - 160px);
                height: 180px;
                border-radius: 10px 10px 0 0;
                bottom: 0px;
                right: 0px;
            }

            &:hover .shop_pay_app {
                visibility: visible;
                opacity: 1;
                transition: 0.5s;
            }

            .shop_pay_app {
                margin: 10px;
                opacity: 0;
                visibility: hidden;
                transition: 0.5s;

                p {
                    width: 100%;
                    height: 45px;
                    padding-right: 5px;
                    border-radius: 10px;
                    border: 1px solid #ccc;
                    color: white;
                    margin-right: 20px;
                    margin-bottom: 10px;
                    font-size: 2em;
                }

                // ul {
                //     margin: 0;
                //     padding: 0;
                // }
            }
        }

    }

}
</style>