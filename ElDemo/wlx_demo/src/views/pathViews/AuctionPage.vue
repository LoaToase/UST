<template>
  <div class="AuctionPage">
    <!-- <el-popover placement="top-end" heiht="400" width="174" trigger="click">
      <el-button slot="reference"><img src="../../assets/Img/1.webp" alt="" width="60px" height="60px"></el-button>
      <div>222</div>
    </el-popover> -->
    <div class="topImg"><img :src="'/node' + auctionGoods.goodsImg[0]" alt=""></div>
    <div class="auction_detail">
      <p>商品名称 : {{ auctionGoods.goodsName }}</p>
      <p>目前商品价格 : ￥ {{ auctionGoods.goodsFirstPrize }}</p>
      <p>商品描述 : {{ auctionGoods.goodsDesc }}</p>
    </div>
    <div class="auctingPer">
      <div v-if="this.theUser.length == 0" style="padding-left:10px;">暂时没有用户上座竞拍</div>
      <ul v-else>
        <li v-for="item in theUser" :key="item.userId">
          <img :src="'/node' + item.userLogo" alt="" width="70px" height="70px" style="border-radius:50%;">
        </li>
      </ul>
    </div>
    <div class="AufunWrap">
      <el-input-number v-model="prize" :precision="2" :step="0.1"></el-input-number>
      <el-button type="primary" plain @click="clickFun">{{ ifOnSeat ? "输入价格后点击喊价" : "上座竞价" }}</el-button>
    </div>
    <div class="AuMessage" ref="auMes">
      <p>请不要刷新页面，卡顿重进</p>
      <p v-for="(item, index) in robotMes" :key="index">{{ item }}</p>
    </div>
  </div>
</template>

<script>
import vue from 'vue'
export default {
  name: 'AuctionPage',
  data() {
    return {
      id: "",
      ifstart: false,
      ifOnSeat: false,
      prize: 0,
      wwss: {},
      auctionGoods: { goodsImg: ["/userImg/userLogo.webp"] },
      theUser: [],
      robotMes: [],
      endsIt: false,
    }
  },
  methods: {
    clickFun() {
      try {
        if (this.endsIt) {
          this.$message.error("竞拍已经结束!!")
          return
        }
        if (this.id == " ") {
          this.$message.error("您未登录，请登录后在尝试")
          return
        }
        this.id = this.$store.state.userForm._id
        // if(this.ifstart == false){
        //   this.$message("竞拍还未开始，请开始再上座")
        //   return
        // }
        if (!this.ifOnSeat) {
          let data = {
            code: 2,
            userId: this.id
          }
          this.ifOnSeat = true
          this.wwss.send(JSON.stringify(data))
        } else {
          //if 是否开始
          if (this.prize <= this.auctionGoods.goodsFirstPrize) {
            this.$message.error("竞拍价不能低于当前价格")
            return
          }
          let data = {
            code: 4,
            prize: this.prize,
            userId: this.id
          }
          this.wwss.send(JSON.stringify(data))
        }
      } catch { }
    },
    // closeWS(){
    //   this.wwss.close()
    // },
    getAuc() {
      //该模块是多用户用的
      let ws = new WebSocket("ws://localhost:12345")

      this.wwss = ws
      ws.onopen = () => {
        console.log("连接好了");
        // console.log(ws.OPEN);
        let mes = {
          code: 1,
          catoUser: this.$route.query.data
        }
        ws.send(JSON.stringify(mes))
        vue.prototype.$wwss = ws
      }

      ws.onmessage = (mes) => {
        // 1 获取拍卖商品数据
        // 2 上座
        // 3 实时更新
        // 4 机器人说话
        try {
          let res = JSON.parse(mes.data)
          // console.log(res);
          if (res.code == 1) {
            this.auctionGoods = res
          } else if (res[0] && res[0].code == 2) {
            this.theUser = res
            // console.log(this.theUser);
          } else if (res.code == 3) {
            // console.log(res.code);
            this.theUser = res.theUsers;

            this.auctionGoods.goodsFirstPrize = res.prize
          } else if (res.code == 4) {
            this.robotMes.push(res.value)
            setTimeout(() => {
              this.$refs.auMes.scrollTop = this.$refs.auMes.scrollHeight;
            }, 100)
            if (res?.start) {
              this.ifstart = true
            }
            if (res?.tpye) {
              this.endsIt = true
              ws.close()
            }
            // console.log(this.robotMes);
          }



          ws.onerror = (e) => {
            console.log(e)
          }
        } catch { }
      }
      // ws.close()
      ws.onclose = () => {
        console.log("close");
      }
    }
  },
  created() {
    // console.log(this.$route.query.data);
    this.getAuc()
  },

  beforeDestroy() {
    this.wwss.close()
    removeEventListener('click', this.click, false)
  }
}
</script>

<style lang="less">
.AuctionPage {
  .topImg {
    width: 200px;
    height: 200px;
    // background-color: pink;
    border-radius: 50%;
    margin: 20px auto;

    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      // background-color: aqua;
    }
  }

  .auction_detail {
    width: calc(90% - 20px);
    // height: 200px;
    padding: 10px;
    margin: 10px auto;
    background-color: rgb(246, 207, 213);
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .auctingPer {
    margin: 10px auto;
    width: 90%;
    // height: 100px;
    background-color: rgb(246, 207, 213);
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      width: 100%;
      height: 100%;

      // background-color: aqua;
      li {
        margin: 10px;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        // background-color: aliceblue;
      }
    }
  }

  .AufunWrap {
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
    width: calc(90% - 20px);
    height: 40px;
    background-color: rgb(246, 207, 213);
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    padding: 10px;
  }

  .AuMessage {
    overflow: scroll;
    overflow-wrap: break-word;
    position: absolute;
    top: 100px;
    left: 80%;
    width: 200px;
    height: 200px;
    background-color: rgba(115, 118, 117, 0.5);
    border-radius: 0 0 10px 10px;
    border-top: 2px solid black;
  }
}
</style>