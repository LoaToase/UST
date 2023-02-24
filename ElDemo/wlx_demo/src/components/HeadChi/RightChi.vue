<template>
  <div class="right_chi">

    <div class="selfTouX">
      <LogoChi></LogoChi>
    </div>

    <div class="search_fun" style="display:flex;">
      <el-input popper-class="my-autocomplete" v-model="state" placeholder="请输入内容">
      </el-input>
      <el-popover placement="bottom" width="400" trigger="click">
        <el-button slot="reference" class="el-icon-search el-input__icon" @click="searchBtn"
          style="padding-left:5px; border-radius: 0 15px 15px 0;"></el-button>
        <div class="showshow">
          <ul>
            <li v-for="(item, index) in btndata" :key="index" @click="intoGoods(index)">
              <p>名称: {{ item.goodsName }} ￥ {{ item.goodsPrize }}</p>
              <p>{{ item.goodsDescription }}</p>
            </li>
          </ul>
        </div>
      </el-popover>
    </div>

    <div class="funfun" style="display:flex;">
      <div class="button_fun">
        <p class="el-icon-arrow-left" @click="historyBack"></p>
        <p class="el-icon-refresh-right" @click="refreshPage"></p>
      </div>

      <el-popover placement="bottom" width="100" trigger="click" style="margin-top:0px;">
        <div class="wrap_location">武汉晴川学院</div>
        <el-button slot="reference" class="set_fun el-icon-location-outline" style="font-size:larger;color:black;">
        </el-button>
      </el-popover>
    </div>

  </div>
</template>

<script>
import LogoChi from './LogoChi.vue'

export default {
  name: "RightChi",
  data() {
    return {
      //搜索框数据
      btndata: [{ goodsName: "未查询到数据", goodsPrize: 0, goodsDescription: "未查询到数据" }],
      state: ""
    };
  },
  methods: {
    refreshPage() {
      location.reload();
    },
    historyBack() {
      window.history.back();
    },
    //
    async intoGoods(index) {
      this.$store.commit("ChangeifIntoGoodsPage", true);
      this.$router.push({ path: "/goodsPage", query: { data: this.btndata[index] } });
      let { data } = await this.$axios.post("/node/goodsRou/addGoodsHotOnce", {
        id: this.btndata[index]._id
      });
    },
    //搜索按钮的点击事件
    async searchBtn() {
      if (this.state == "") {
        this.$message.error("请输入查询内容");
        return;
      }
      let myid = this.$store.state.userForm._id;
      if (myid == " ") {
        let { data } = await this.$axios.post("/node/goodsRou/searchBtn", {
          value: this.state,
          id: "0"
        });
        // console.log(data);
        if (data.length == 0) {
          this.btndata = [{ goodsName: "未查询到数据", goodsPrize: 0, goodsDescription: "未查询到数据" }];
        }
        else {
          this.btndata = data;
        }
      }
      else {
        let { data } = await this.$axios.post("/node/goodsRou/searchBtn", {
          value: this.state,
          id: myid
        });
        // console.log(data);
        if (data.length == 0) {
          this.btndata = [{ goodsName: "未查询到数据", goodsPrize: 0, goodsDescription: "未查询到数据" }];
        }
        else {
          this.btndata = data;
        }
      }
    }
  },
  mounted() {
  },
  beforeDestroy() {
    removeEventListener("click", this.click, false);
  },
  components: { LogoChi }
}
</script>

<style lang="less">
.showshow {
  width: 400px;

  // background-color: pink;
  ul {
    list-style: none;
    margin: 0;
    padding: 0px;

    li {
      padding: 5px;
      margin: 5px;
      background-color: #DCDFE6;
      border-radius: 10px;

      &:hover {
        cursor: pointer;
      }

      p {
        margin: 0px;
        padding: 0px;
      }
    }
  }
}

.right_chi {
  justify-content: space-between;
  align-items: center;
  display: flex;
  height: 65px;

  .selfTouX{
    width: 100px;
    // background-color: #606266;
  }
  .search_fun{
    .el-input__inner {
    // -webkit-appearance: none;
    background-color: #FFF;
    border-radius: 10px 0 0 10px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 350px;
  }
  }


  .button_fun {
    display: flex;

    p {
      border: 1px solid #DCDFE6;
      margin-right: 5px;
      width: 30px;
      height: 25px;
      border-radius: 12.5px;
      line-height: 25px;
      text-align: center;
      transition: 0.5s;

      &:hover {
        cursor: pointer;
        background: #ffffff;
      }
    }
  }

  .searchArea {
    z-index: 20;
  }

  .set_fun {
    margin-top: 15.5px;
    margin-right: 20px;
    // width: 25px;
    height: 25px;
    // text-align: center;
    padding-left: 5px;
    padding-right: 5px;
    background: white;
    line-height: 0px;
    border-radius: 12.5px;
    transition: 0.5s;

    &:hover {
      cursor: pointer;
      background: #ffffff;
    }
  }
}
</style>