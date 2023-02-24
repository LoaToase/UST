<template>
    <div class="IwannaAu">
        <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>

        <div v-show="active == 0" class="stepMainWrap">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="90px"
                class="demo-ruleForm">
                <el-form-item label="商品名称" prop="auctionName">
                    <el-input type="text" v-model="ruleForm.auctionName"></el-input>
                </el-form-item>
                <el-form-item label="商品描述" prop="auctionDesc">
                    <el-input type="textarea" v-model="ruleForm.auctionDesc"></el-input>
                </el-form-item>

            </el-form>
        </div>

        <div v-show="active == 2 || active == 3" class="stepMainWrap">
            <el-upload class="upload-demo" action="/node/goodsRou/goodsImgTwo" :auto-upload="false" ref="goodsImg02"
                :data="this.imgdata" :file-list="fileList" :limit="5" :on-change="onChange" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">请上传商品实物图片</div>
            </el-upload>
            <el-button type="primary" @click="submitGoodsImg">提交图片</el-button>
        </div>

        <div v-show="active == 1" class="stepMainWrap">
            <!-- 商品价格 -->
            <div class="stepMainWrap_prize">
                <span style="margin-right:20px;">商品价格</span>
                <el-input-number v-model="auctionPrize" :precision="2" :step="0.1"></el-input-number>
            </div>

            <div class="block" style="margin-top:20px;margin-bottom:20px;">
                <span class="demonstration">设置拍卖开始时间 : </span>
                <el-date-picker v-model="setTime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </div>

            <div class="stepMainWrap_submit">
                <el-button type="primary" @click="submitGoods">提交</el-button>
            </div>
        </div>

        <el-button style="margin-top: 12px;" @click="next">{{ buttonValue }}</el-button>
    </div>
</template>

<script>
export default {
    name: 'IwannaAu',
    data() {
        var validateauctionName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入拍卖商品名称'));
            } else {
                callback();
            }
        };
        var validateauctionDesc = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请描述你的拍卖商品'));
            } else {
                callback();
            }
        };
        return {
            //日期
            setTime: new Date(),
            active: 0,
            buttonValue: '下一步',
            //上传的图片
            fileList: [],
            changeBol: false,
            imgdata: {},
            //商品价格
            auctionPrize: 0,
            goodsNext: false,
            //表单
            ruleForm: {
                auctionName: '',
                auctionDesc: '',
            },
            //表单规则
            rules: {
                auctionName: [
                    { validator: validateauctionName, trigger: 'blur' }
                ],
                auctionDesc: [
                    { validator: validateauctionDesc, trigger: 'blur' }
                ],

            }
        }
    },
    computed: {
        userForm() {
            return this.$store.state.userForm
        }
    },
    methods: {
        //步骤的按钮
        next() {
            switch (this.active) {
                case 0:
                    this.buttonValue = "下一步"
                    // console.log(this.userForm);
                    if (this.userForm._id == ' ') {
                        this.$message.error("您还未登录")
                    } else if (!this.ruleForm.auctionDesc && !this.ruleForm.auctionName) {
                        this.$message.error("请填写成功进入下一步")
                    } else {
                        this.active++;
                    }
                    break;
                case 1:
                    //上传图片
                    if (this.goodsNext) {
                        this.active++
                        this.buttonValue = "回到第一步"
                    } else {
                        this.$message.error("请提交后在进入下一步")
                    }
                    break;
                case 2:
                case 3:
                    this.active = 0
                    this.buttonValue = "下一步"
                    this.$refs.goodsImg02.clearFiles()
                    break;
                // case 3:
                //     this.active++
                //     break;
            }
        },
        //图片上传

        onChange() {
            this.changeBol = true;
        },
        //提交表单
        async submitGoods() {
            let date = new Date()
            // console.log(date - this.setTime);
            if (this.setTime - date < (1000 * 60 * 5)) {
                this.$message.error("请设置距离现在大于五分钟的时间")
                return
            }
            if (this.auctionPrize == 0) {
                this.$message.error("请输入竞拍起拍价")
            }
            let { data } = await this.$axios.post("/node/goodsRou/auctionInfo", {
                id: this.userForm._id,
                goodsDesc: this.ruleForm.auctionDesc,
                goodsName: this.ruleForm.auctionName,
                goodsPrize: this.auctionPrize,
                startTime: this.setTime
            })
            console.log(data);
            if (data.code) {
                this.imgdata = { id: data.goods._id }
                this.goodsNext = true;
                this.$message.success(data.value)
            } else {
                this, this.$message.error(data.value)
            }
        },
        //提交图片方法
        async submitGoodsImg() {
            try {
                await this.$refs.goodsImg02.submit();
                this.$message.success("发布竞拍商品成功")
                this.ruleForm.auctionDesc = ''
                this.ruleForm.auctionName = ''
                this.auctionPrize = 0
                this.changeBol = false
                this.goodsNext = false
                this.active = 3
            } catch { } finally {
                // this.$refs.goodsImg.clearFiles()
            }
        },
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>

<style lang="less">

</style>