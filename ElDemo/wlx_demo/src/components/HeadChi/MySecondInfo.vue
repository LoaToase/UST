<template>
  <div class="MySecondInfo">
    <div class="leftChangeInfo">

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
        style="margin-right:10px;margin-top: 10px;" class="demo-ruleForm">
        <el-form-item label="简介" prop="selfDesc">
          <el-input type="textarea" v-model="ruleForm.selfDesc"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNum">
          <el-input type="text" v-model.number="ruleForm.phoneNum"></el-input>
        </el-form-item>
      </el-form>

      <div class="myLabel" style="margin-bottom:10px;">
        <el-tag :key="tag" v-for="tag in myLabel" closable :disable-transitions="false" @close="handleClose(tag)">
          {{ tag }}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="medium"
          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="medium" @click="showInput">我的标签</el-button>
      </div>

      <div class="myWannaLabel" style="margin-bottom:10px;">
        <el-tag :key="tag2" v-for="tag2 in wannaLabel" closable :disable-transitions="false"
          @close="handleClose2(tag2)">
          {{ tag2 }}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible2" v-model="inputValue2" ref="saveTagInput2" size="medium"
          @keyup.enter.native="handleInputConfirm2" @blur="handleInputConfirm2">
        </el-input>
        <el-button v-else class="button-new-tag" size="medium" @click="showInput2">我想要的物品</el-button>
      </div>

      <div class="myInfoBg">
        <el-upload class="upload-demo" action="/node/changeInfo/changeSecondInfo" :auto-upload="false" ref="selfInfoBg"
          :data="this.$store.state.userForm" :on-success="onSuccess" :file-list="fileList" :limit="1"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请上传个人资料背景图片</div>
        </el-upload>
        <el-button type="primary" @click="submitselfInfoBg">点击修改</el-button>
      </div>

    </div>
    <div class="rightshowInfo">
      <img :src="'/node' + userSecond.userBgImg" alt="" class="rightshowInfo_img">
      <div class="rightshowInfo_img02">
        <p>{{ this.$store.state.userForm.userNickName }}</p><img :src="'/node' + this.$store.state.userForm.userLogo"
          alt="">
      </div>
      <el-tag size="small" style="margin-left:5px;margin-top: 5px;">{{ this.userSecond.userPhoneNum }}</el-tag>
      <el-tag size="small" v-for="item in myLabel" :key="item">{{ item }}</el-tag>
      <div class="textbox">{{ this.userSecond.userDescr }}</div>
      <span style="margin-left:5px;margin-right:5px;">想要的商品:</span>
      <el-tag size="small" v-for="item in wannaLabel" :key="item" type="success">{{ item }}</el-tag>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MySecondInfo',
  data() {
    var validateselfDesc = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入自我介绍'));
      } else {
        callback();
      }
    };
    var validateselfphoneNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电话号码'));
      } else {
        callback();
      }
    };
    return {
      fileList: [],
      // uploadMess:{},
      //标签的东西
      //我的
      myLabel: [],
      inputVisible: false,
      inputValue: '',
      //商品
      wannaLabel: [],
      inputVisible2: false,
      inputValue2: '',
      ruleForm: {
        selfDesc: '',
        phoneNum: '',
      },
      rules: {
        selfDesc: [
          { validator: validateselfDesc, trigger: 'blur' }
        ],
        phoneNum: [
          { validator: validateselfphoneNum, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    userSecond() {
      return this.$store.state.userSecond
    }
  },
  methods: {
    //提交方法
    async submitselfInfoBg() {
      this.$refs.selfInfoBg.submit();
      let { data } = await this.$axios.post("/node/changeInfo/changeSecondInfoTwo", {
        myLabel: this.myLabel,
        wannaLabel: this.wannaLabel,
        id: this.$store.state.userForm._id,
        selfDesc: this.ruleForm.selfDesc,
        phoneNum: this.ruleForm.phoneNum
      })
      if (data.code) {
        this.$message.success(data.value)
        this.$store.commit("ChangeInfoSecond", data.user)
        // this.myLabel = '',
        // this.wannaLabel = '',
        // this.ruleForm.selfDesc = '',
        // this.ruleForm.phoneNum = ''
        this.$refs.selfInfoBg.clearFiles();
      }
    },
    //图片上传成功的钩子
    onSuccess(response, file, fileList) {
      console.log(response);
      this.$store.commit('ChangeInfoSecImg', response)
    },
    //登录成功后调用的事件
    async coverTheMess() {
      let { data } = await this.$axios.post("/node/changeInfo/getSecondMess", {
        id: this.$store.state.userForm._id,
      })
      // console.log(data);

      this.myLabel = data.userLabel
      this.wannaLabel = data.userWantsGoods
      this.ruleForm.selfDesc = data.userDescr
      this.ruleForm.phoneNum = data.userPhoneNum
      this.$store.commit("ChangeInfoSecond", data)
      this.$store.commit("ChangeInfoSecImg", data.userBgImg)

    },
    //请求session成功调用的事件
    onSession() {
      // console.log("123");
      this.myLabel = this.userSecond.userLabel
      this.wannaLabel = this.userSecond.userWantsGoods
      this.ruleForm.selfDesc = this.userSecond.userDescr
      this.ruleForm.phoneNum = this.userSecond.userPhoneNum
      // console.log(this.$store.state.userSecond.userPhoneNum);
    },
    //标签的方法
    handleClose(tag) {
      this.myLabel.splice(this.myLabel.indexOf(tag), 1);
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
        this.myLabel.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    handleClose2(tag2) {
      this.wannaLabel.splice(this.wannaLabel.indexOf(tag2), 1);
    },
    showInput2() {
      this.inputVisible2 = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput2.$refs.input.focus();
      });
    },

    handleInputConfirm2() {
      let inputValue2 = this.inputValue2;
      if (inputValue2) {
        this.wannaLabel.push(inputValue2);
      }
      this.inputVisible2 = false;
      this.inputValue2 = '';
    }
  },

  mounted() {
    // this.coverTheMess()
  },
  beforeDestroy() {
    removeEventListener('click', this.click, false)
  }
}
</script>

<style lang="less">
.MySecondInfo {
  display: flex;
  justify-content: space-around;

  .leftChangeInfo {
    width: calc(90% - 300px);
    height: 384px;
    border-radius: 10px;
    backdrop-filter: blur(8px);
    box-shadow: 0px 0px 7px 0px #eee;
    // background-color: pink;
    overflow: scroll;
    margin-top: 2px;
    padding-left: 10px;
    padding-top: 10px;
    // padding: 0;
  }

  .rightshowInfo {
    width: 300px;
    height: 400px;
    border-radius: 10px;
    background-color: rgb(145, 211, 236);
    // backdrop-filter: blur(8px);
    overflow: scroll;

    .rightshowInfo_img {
      width: 300px;
      height: calc(300px * 9 / 16);
      // background-color: #eee;
      border-radius: 10px 10px 0 0;
    }

    .rightshowInfo_img02 {
      margin-top: -10px;
      border-radius: 0 0 30px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // margin-top: -17px;
      width: 100%;
      height: 30px;
      // background: rgb(190, 231, 244);
      border-top: 2px solid #eee;

      // border-bottom: 1px solid #eee;
      p {
        width: 80%;
        // height: 100%;
        text-align: center;
        font-size: large;
        line-height: 0px;
      }

      img {
        z-index: 2;
        margin-top: -30px;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        // background: #99a9bf;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .textbox {
      margin: 5px auto;
      border-radius: 10px;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 10px;
      // padding-top: 10px;
      font-size: large;
      width: 200px;
      height: 100px;
      // background: #99a9bf;
      background-color: azure;
      overflow: scroll;
      overflow-wrap: break-word;
      box-shadow: 0px 0px 7px 0px #eee;
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