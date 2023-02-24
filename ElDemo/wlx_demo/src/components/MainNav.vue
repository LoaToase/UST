<template>
  <div class="MainNav">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'MainNav',
  beforeDestroy() {
    removeEventListener('click', this.click, false)
  }
}
</script>

<style lang="less">
.MainNav {
  border-radius: 20px;
  width: calc(100vw - 180px);
  height: calc(100vh - 90px);
  z-index: 1;
  overflow: hidden;
  overflow-y: scroll;
  padding: 10px;
}
</style>