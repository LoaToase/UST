<template>
  <div class="myCollection">
    <el-table :data="myColGoodsData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称">
                            <span>{{ props.row.goodsName }}</span>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <span>￥ {{ props.row.goodsPrize }}</span>
                        </el-form-item>
                        <el-form-item label="发布时间">
                            <span>{{ props.row.goodsCreateTime }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ props.row.goodsDescription }}</span>
                        </el-form-item>
                        <el-form-item label="商品标签">
                            <span>{{ props.row.goodsLabel }}</span>
                        </el-form-item>
                        <el-button type="danger" icon="el-icon-delete" @click="myColGoodsOut(props.row._id)">取消收藏</el-button>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="goodsName">
            </el-table-column>
            <el-table-column label="商品价格" prop="goodsPrize">
            </el-table-column>
            <el-table-column label="发布时间" prop="goodsCreateTime">
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default {
    name:"myCollection",
    data() {
        return {
            tableData: [],
            myColGoodsData: [],
        }
    },
    methods: {
        async getMyColGoodsData() {
            if (this.$store.state.userForm._id == " ") return
            let { data } = await this.$axios.post("/node/goodsRou/getColMyGoodsData", {
                id: this.$store.state.userForm._id
            })
            this.myColGoodsData = data
            // console.log(data);

            // console.log(this.myGoodsData.indexOf({goodsName: '猪肉铺'}));
        },
        async myColGoodsOut(id) {
            let { data } = await this.$axios.post("/node/goodsRou/removeMyColgoods", {
                goodsid: id,
                catoUser:this.$store.state.userForm._id
            })
            // console.log(data);
            if (data.code) {
                this.$message.success(data.value)
                this.myColGoodsData.forEach((item, index) => {
                    if (item._id == id) {
                        // console.log(index);
                        this.$store.commit("RemoveCol",id)
                        this.myColGoodsData.splice(index, 1)
                    }
                })
            }
        }
    },
    mounted() {
        this.getMyColGoodsData()
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">

</style>