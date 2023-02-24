<template>
    <div class="message">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed label="头像">
                <template slot-scope="scope">
                    <img :src="'/node' + scope.row.userLogo" alt="" width="50px" height="50px"
                        style="border-radius:50%;">
                </template>
            </el-table-column>
            <el-table-column prop="userNickName" label="昵称">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-badge :is-dot="scope.row.times == 0 ? false : true" class="item">
                        <el-button size="small" @click="handleClick(scope.row.oppoId)">回复</el-button>
                    </el-badge>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'Message',
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        async getMyMes() {
            let mid = this.$store.state.userForm._id
            if (mid == " ") return
            let { data } = await this.$axios.post("/node/changeinfo/getMyMes", {
                id: mid
            })
            // console.log(data);
            this.tableData = data
        },
        handleClick(id) {
            this.$store.commit("ChangeifIntoGoodsPage", true)
            this.$router.push({ path: '/chatPage', query: { data: id } })
        }
    },
    mounted() {
        this.getMyMes()
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">
.el-badge__content.is-fixed.is-dot {
    top: 5px;
    right: 10px;
}
</style>