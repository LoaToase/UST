<template>
    <div class="normalGoods">
        <el-table :data="myGoodsData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称">
                            <span>{{ props.row.goodsName }}</span>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <span>￥ {{ props.row.goodsPrize }}</span>
                        </el-form-item>
                        <el-form-item label="是否推荐">
                            <span>{{ props.row.ifRecommand }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ props.row.goodsDescription }}</span>
                        </el-form-item>
                        <el-form-item label="商品标签">
                            <span>{{ props.row.goodsLabel }}</span>
                        </el-form-item>
                        <el-button type="danger" icon="el-icon-delete" @click="myGoodsOut(props.row._id)">下架</el-button>
                        <el-button  @click="changeRecom(props.row)">修改推荐</el-button>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="goodsName">
            </el-table-column>
            <el-table-column label="点击热度" prop="clickHotTimes">
            </el-table-column>
            <el-table-column label="发布时间" prop="goodsCreateTime">
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script>
export default {
    name: 'normalGoods',
    data() {
        return {
            myGoodsData: [],
        }
    },
    methods: {
        async getMyGoodsData() {
            if (this.$store.state.userForm._id == " ") return
            let { data } = await this.$axios.get("/node/goodsRou/getAllgoodsAdmin")
            this.myGoodsData = data
            // console.log(data);

            // console.log(this.myGoodsData.indexOf({goodsName: '猪肉铺'}));
        },
        async changeRecom(item){
            // console.log(item);
            let bool = item.ifRecommand
            let {data} = await this.$axios.post("/node/login/changeRecom",{
                ifRecommand:bool,
                id:item._id
            })
            // console.log(data);
            item.ifRecommand = !bool
            this.$message.success(data)
        },
        async myGoodsOut(id) {
            let { data } = await this.$axios.post("/node/goodsRou/removeMygoods", {
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