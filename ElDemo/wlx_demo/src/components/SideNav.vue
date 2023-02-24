<template>
  <div class="SideNav">
    <ul class="Side_list">
      <!-- 侧边栏的功能模块 -->
      <li v-for="(item, index) in liList" :key="index" ref="SideListLi" @mousedown="mousedowning(index)"
        @mouseup="mouseuping(index)">
        <router-link :to="item.path" class="linked">
          <div>
            <span :class="item.icon"></span>{{ item.li }}
          </div>
        </router-link>
      </li>
      <li>
        <router-link to="/collection" class="linked">
          <div>
            <span class="el-icon-star-on"></span>
            <el-badge :max="99" :value="this.$store.state.unReadmes.unreadTime" class="item" style="line-height:2;">我的
            </el-badge>
          </div>
        </router-link>
      </li>
      <!-- <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SideNav',
  data() {
    return {
      liList: [{
        li: "首页",
        path: "/",
        icon: "el-icon-s-home",
      },
      {
        li: "百货",
        path: "/allgoods",
        icon: "el-icon-s-shop",
      },
      {
        li: "拍卖行",
        path: "/auction",
        icon: "el-icon-s-check",
      },
      {
        li: "最新发布",
        path: "/newgoods",
        icon: "el-icon-s-opportunity",
      },
      {
        li: "购物车",
        path: "/shoppingcar",
        icon: "el-icon-s-goods",
      }],
    }
  },
  methods: {
    mousedowning(ind) {
      let list = this.$refs.SideListLi;
      list.forEach((item, index) => {
        if (index == ind) {
          // console.log(item.style);
          item.style.backgroundColor = "#5ec7f1"
          item.style.marginLeft = "5px"
          item.style.marginRight = "2px"
        }
      })
    },
    mouseuping(ind) {
      let list = this.$refs.SideListLi;
      list.forEach((item, index) => {
        if (index == ind) {
          item.style.backgroundColor = ""
          item.style.marginLeft = ""
          item.style.marginRight = ""
        }
      })
    },
    beforeDestroy() {
      removeEventListener('click', this.click, false)
    }
  },
}
</script>

<style lang="less">
.SideNav {
  width: 160px;
  height: calc(100vh - 69px);
  // rgb(182, 228, 243)
  // background: white;
  // background-image: url("../assets/Img/loginBg.webp");
  // background-repeat: no-repeat;
  border-radius: 0 0 20px 20px;
  z-index: 2;

  .Side_list {
    height: calc(100vh - 69px);
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: larger;

    li {
      background: #f5f9fb;
      border-radius: 15px 15px 15px 15px;
      height: 60px;
      line-height: 60px;
      font-family: "Microsoft YaHei";
      transition: .1s;
      border-right: 2px solid #ccc;
      border-bottom: 2px solid #ccc;

      // box-shadow: 0px 0px 5px 1px #ccc;
      // background: rgb(131, 197, 190);
      // border-right: 2px solid rgb(55, 120, 113);
      // border-bottom: 2px solid rgb(55, 120, 113);

      // &:nth-of-type(3) {
      //   background: wheat;
      // }

      &:hover {
        cursor: pointer;
        background: #5ec7f1;
        transition: .1s;
        border-right: 2px solid rgb(224, 239, 238);
        border-bottom: 2px solid rgb(224, 239, 238);
        box-shadow: 1px 2px 4px 1px rgb(173, 225, 219);
        // box-shadow: 0px 0px 7px 2px #ccc;

        // box-shadow: 2px 2px 7px 3px #ccc;

        .linked {
          transition: .5s;
          font-size: larger;
        }
      }

      .linked {
        transition: .5s;
        text-decoration: none;
        color: black;
      }

      span {
        font-size: larger;
        margin: 0px 15px;
      }
    }
  }
}

sup {
  position: absolute;
  top: 10px;
  right: 10px;
  transform: translateY(-50%) translateX(100%);
}

// @keyframes libtn {

// }
</style>