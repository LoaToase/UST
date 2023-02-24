<template>
    <div class="userCommand">
        <p>在线用户 :</p>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="date" label="账号" width="200">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.userName"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="账号昵称" width="200">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.userNickName"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="province" label="账号密码" width="200">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.userPass" :disabled="true" show-password></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="city" label="账户头像" width="100">
                <template slot-scope="scope">
                    <img :src="'/node' + scope.row.userLogo" alt="" width="50px" height="50px"
                        style="background-color:pink;">
                </template>
            </el-table-column>
            <el-table-column prop="province" label="注册时间" width="300">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.userCreateTime" :disabled="true"></el-input>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">点击修改</el-button>
                    <el-button type="text" size="small" @click="forceOffline(scope.row._id)">强制下线</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'userCommand',
    data() {
        return {
            wwss: {},
            tableData: []
        }
    },
    methods: {
        forceOffline(id) {
            let data = {
                type: 3,
                userId: id
            }
            this.wwss.send(JSON.stringify(data))
            this.$message.success("强制下线成功")
        },
        async handleClick(row) {
            // console.log(row);
            let data = {
                type: 2,
                userName: row.userName,
                userNickName: row.userNickName,
                userPass: row.userPass,
                id: row._id
            }
            this.wwss.send(JSON.stringify(data))

            this.$message.success("修改成功,将其强制下线后生效")
        },
        getOnlineUser() {
            const ws = new WebSocket("ws://localhost:80/webSocket/adminUser")
            this.wwss = ws
            ws.onmessage = (mes) => {
                // console.log(mes.data);
                let ress = JSON.parse(mes.data)
                console.log(ress);
                if (ress.type == 1) {
                    this.tableData = ress.onlineUser
                }
            }
            ws.onopen = () => {
                if (ws.readyState == 1) {
                    console.log("admin ws已建立链接...");
                    setTimeout(() => {
                        let data = {
                            type: 1,
                        }
                        ws.send(JSON.stringify(data))
                    }, 500)
                }
            }
            ws.onclose = function () {
                console.log("admin ws链接已关闭...");
            }
        }
    },
    mounted() {
        this.getOnlineUser()
    },
    beforeDestroy(){
        removeEventListener('click', this.click, false)
        this.wwss.close(1000)
    }
}
</script>

<style lang="less">

</style>