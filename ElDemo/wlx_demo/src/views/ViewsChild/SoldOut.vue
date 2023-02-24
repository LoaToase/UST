<template>
    <div class="SoldOut">
        <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>

        <div v-show="active == 0" class="stepMainWrap">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="90px"
                class="demo-ruleForm">
                <el-form-item label="商品名称" prop="goodsName">
                    <el-input type="text" v-model="ruleForm.goodsName"></el-input>
                </el-form-item>
                <el-form-item label="商品描述" prop="goodsDesc">
                    <el-input type="textarea" v-model="ruleForm.goodsDesc"></el-input>
                </el-form-item>

            </el-form>
        </div>

        <div v-show="active == 2 || active == 3" class="stepMainWrap">
            <el-upload class="upload-demo" action="/node/goodsRou/goodsImg" :auto-upload="false" ref="goodsImg"
                :data="this.imgdata" :file-list="fileList" :limit="5" :on-change="onChange" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">请至少上传两张图片,第一张为方形,第二张为3:1</div>
            </el-upload>
            <el-button type="primary" @click="submitGoodsImg">提交图片</el-button>
        </div>

        <div v-show="active == 1" class="stepMainWrap">
            <!-- 商品价格 -->
            <div class="stepMainWrap_prize">
                <span style="margin-right:20px;">商品价格</span>
                <el-input-number v-model="goodsPrize" :precision="2" :step="0.1"></el-input-number>
            </div>

            <!-- 商品标签 -->
            <div class="stepMainWrap_label">
                <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{ tag }}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
                    size="medium" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="medium" @click="showInput">添加商品标签</el-button>
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
    name: 'SoldOut',
    data() {
        var validategoodsName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入商品名称'));
            } else {
                callback();
            }
        };
        var validategoodsDesc = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请描述你的商品'));
            } else {
                callback();
            }
        };
        return {
            active: 0,
            buttonValue: '下一步',
            //上传的图片
            fileList: [],
            changeBol: false,
            imgdata: {},
            //商品价格
            goodsPrize: 0,
            goodsNext: false,
            //标签的东西
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            //表单
            ruleForm: {
                goodsName: '',
                goodsDesc: '',
            },
            //表单规则
            rules: {
                goodsName: [
                    { validator: validategoodsName, trigger: 'blur' }
                ],
                goodsDesc: [
                    { validator: validategoodsDesc, trigger: 'blur' }
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
                    } else if (!this.ruleForm.goodsDesc && !this.ruleForm.goodsName) {
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
                    this.$refs.goodsImg.clearFiles()
                    break;
                // case 3:
                //     this.active++
                //     break;
            }
            // if (this.active++ == 2) {
            //     this.buttonValue = "回到第一步"
            // }
            // if (this.active > 3) {
            //     this.active = 0
            //     this.buttonValue = "下一步"
            // };
        },
        //图片上传

        onChange() {
            this.changeBol = true;
        },
        //提交表单
        async submitGoods() {
            if (this.dynamicTags.length == 0 || this.goodsPrize == 0) {
                this.$message.error("请输入完整")
                return
            }
            let { data } = await this.$axios.post("/node/goodsRou/goodsInfo", {
                id: this.userForm._id,
                goodsDesc: this.ruleForm.goodsDesc,
                goodsName: this.ruleForm.goodsName,
                goodsPrize: this.goodsPrize,
                goodsLabel: this.dynamicTags
            })
            this.imgdata = { id: data.id }
            this.goodsNext = true;
            this.$message.success("成功提交商品信息")
        },
        //标签的方法
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        //提交图片方法
        async submitGoodsImg() {
            try {
                await this.$refs.goodsImg.submit();
                this.$message.success("发布商品成功")
                this.ruleForm.goodsDesc = ''
                this.ruleForm.goodsName = ''
                this.goodsPrize = 0
                this.dynamicTags = []
                this.changeBol = false
                this.goodsNext = false
                this.active = 3
            } catch { } finally {
                // this.$refs.goodsImg.clearFiles()
            }
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    },
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }

}
</script>

<style lang="less">
.SoldOut {
    .stepMainWrap {
        overflow: scroll;
        padding: 20px;
        // width: 100%;
        height: 450px;

        // background: pink;
        .stepMainWrap_prize {
            margin: 50px 30px 60px 50px;
        }

        .stepMainWrap_label {
            margin: 50px 30px 60px 50px;
        }

        .stepMainWrap_submit {
            margin: 50px 30px 60px 50px;

        }
    }

}

.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>