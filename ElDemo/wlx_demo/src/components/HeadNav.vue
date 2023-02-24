<template>
  <div class="HeadNav">

    <!-- logo区域 -->
    <div class="self_Logo">
      <img src="../assets/Img/proLogo.png" alt="" width="100px" height="65px" style="background-color:#eee;margin-left:30px;">
      <!-- <LogoChi></LogoChi> -->
    </div>
    <!-- 头部导航右侧功能区域 -->
    <div class="right_fun">
      <RightChi></RightChi>
    </div>

  </div>
</template>

<script>
import LogoChi from './HeadChi/LogoChi.vue';
import RightChi from './HeadChi/RightChi.vue';
export default {
  name: "HeadNav",
  components: { LogoChi, RightChi },
  beforeDestroy() {
    removeEventListener('click', this.click, false)
  }
}
</script>

<style lang="less">
.HeadNav {
  width: 100%;
  height: 65px;
  z-index: 3;
  display: flex;
  border-radius: 0 0 15px 15px;
  // background-color: #1c8ebb;
  // background: rgb(1, 131, 254);
  border-bottom: 3px solid #5ec7f1;
  border-top: 1px solid #5ec7f1;


  .self_Logo {
    height: calc(100% - 0px);
    width: 165px;
    // background: linear-gradient(to right, rgb(1, 131, 254), rgb(1, 131, 254));
    // background-color: #1c8ebb;
    border-radius: 0px 10px 10px 15px;
    // border-bottom: 3px solid rgb(80, 158, 151);
    // border-right: 3px solid rgb(80, 158, 151);
  }

  .right_fun {
    height: 65px;
    width: calc(100% - 165px);
    // background: linear-gradient(to right, rgb(3, 155, 230) 0%,white 20%,rgb(121, 188, 222) 40%,white 55%,rgb(106, 173, 207) 70%, rgb(180, 203, 214) 100%);
    // background-image: linear-gradient(45deg, #1c8ebb, #3e9af6);
    // background-color: rgb(203, 234, 239);
    border-radius: 0 0 15px 15px;

  }
}
</style>