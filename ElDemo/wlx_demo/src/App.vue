<template>
  <div id="app">
    <mask-canvas></mask-canvas>
    <!-- 头部导航 -->
    <HeadNav></HeadNav>
    <div class="bottom_nav">
      <!-- 侧边导航 -->
      <SideNav></SideNav>
      <!-- 主要功能展现区域 -->
      <MainNav></MainNav>
    </div>
  </div>
</template>

<script>
// import 'animate.css';
import HeadNav from './components/HeadNav.vue';
import SideNav from './components/SideNav.vue';
import MainNav from './components/MainNav.vue';
import MaskCanvas from './components/HeadChi/MaskCanvas.vue';
export default {
  components: { HeadNav, SideNav, MainNav, MaskCanvas },
}
</script>

<style lang="less">
#app {
  // background-image: url("./assets/Img/loginBg.webp");
  // background-repeat: no-repeat;
  // background-position: 0px 2px;
  // background-size: 100% 100%;
  // background: linear-gradient(to bottom,rgb(113, 186, 218) 20%,rgb(33, 54, 78) 50%,rgb(33, 54, 78) 100%);
  margin: 0px;

  .bottom_nav {
    display: flex;
  }

  ul {
    list-style: none;
  }
}

//滚动条样式
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background: #ffffff;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(248, 248, 248);
  border-radius: 10px;
  background: #ffffff;
}

/* 滚动条滑块 */

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #6ccf99;
  -webkit-box-shadow: inset 0 0 6px rgb(255, 255, 255);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: #ffffff;
}

// .el-header {
//     background-color: #B3C0D1;
//     color: #333;
//     text-align: center;
//     line-height: 60px;
//   }

//   .el-aside {
//     background-color: #D3DCE6;
//     color: #333;
//     text-align: center;
//     line-height: 200px;
//   }
//   .el-main {
//     background-color: #E9EEF3;
//     color: #333;
//     text-align: center;
//     line-height: 160px;
//   }
</style>
