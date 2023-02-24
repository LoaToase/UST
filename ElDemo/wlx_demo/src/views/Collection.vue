<template>
    <div class="collection">
        <ul class="collection_list">
            <el-tabs type="border-card">
            <el-tab-pane label="我的商品">
                <my-goods></my-goods>
            </el-tab-pane>
            <el-tab-pane label="我的收藏">
                <my-collection></my-collection>
            </el-tab-pane>
            <el-tab-pane label="我要卖出">
                <SoldOut></SoldOut>
            </el-tab-pane>
            <el-tab-pane label="我要拍卖">
                <iwanna-au></iwanna-au>
            </el-tab-pane>
            <el-tab-pane label="会话">
                <message></message>
            </el-tab-pane>
            <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
            </el-tabs>
        </ul>
    </div>
</template>

<script>
import IwannaAu from './ViewsChild/IwannaAu.vue';
import Message from './ViewsChild/Message.vue';
import MyCollection from './ViewsChild/myCollection.vue';
import MyGoods from './ViewsChild/myGoods.vue';
import SoldOut from './ViewsChild/SoldOut.vue';

export default {
    name: "Collection",
    data() {
        return {};
    },
    components: { SoldOut, MyGoods, MyCollection, Message ,IwannaAu},
    method:{},
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">
.collection{
    border-radius: 10px;
    border-top: 2px solid #eee;
    .collection_list {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;

        li {
            // align-items: center;
            width: 600px;
            height: 120px;
            background: pink;
            margin: 10px auto;
        }
    }

}
</style>