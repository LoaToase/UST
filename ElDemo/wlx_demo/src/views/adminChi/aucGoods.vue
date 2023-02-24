<template>
    <div class="aucGoods">
        <el-table :data="myGoodsData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称">
                            <span>{{ props.row.goodsName }}</span>
                        </el-form-item>
                        <el-form-item label="商品起拍价">
                            <span>￥ {{ props.row.goodsFirstPrize }}</span>
                        </el-form-item>
                        <el-form-item label="拍卖时间">
                            <span>{{ props.row.startTime }}</span>
                        </el-form-item>
                        <el-form-item label="商品照片">
                            <!-- <span>{{ props.row.goodsDesc }}</span> -->
                            <img :src="'/node' + props.row.goodsImg[0]" alt="" width="50px" height="50px">
                        </el-form-item>
                        <el-form-item label="起拍价格">
                            <span>￥ {{ props.row.goodsFirstPrize }}</span>
                        </el-form-item>
                        <el-button type="danger" icon="el-icon-delete" @click="myGoodsOut(props.row._id)">下架</el-button>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="goodsName">
            </el-table-column>
            <el-table-column label="起拍价" prop="goodsFirstPrize">
            </el-table-column>
            <el-table-column label="拍卖时间" prop="startTime">
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script>
export default {
    name: 'aucGoods',
    data() {
        return {
            myGoodsData: [],
        }
    },
    methods: {
        async getMyGoodsData() {
            if (this.$store.state.userForm._id == " ") return
            let { data } = await this.$axios.get("/node/login/getAllAucAdmin")
            this.myGoodsData = data
            // console.log(data);

            // console.log(this.myGoodsData.indexOf({goodsName: '猪肉铺'}));
        },
        async myGoodsOut(id) {
            let { data } = await this.$axios.post("/node/login/removeAuctiongoods", {
                id: id
            })
            // console.log(data);
            if (data.code) {
                this.$message.success(data.value)
                this.myGoodsData.forEach((item, index) => {
                    if (item._id == id) {
                        this.myGoodsData.splice(index, 1)
                    }
                })
            }
        }
    },
    mounted() {
        this.getMyGoodsData()
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>
  
<style lang="less">
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>