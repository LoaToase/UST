<template>
    <div>
        <b v-for="(item, index) of liuyans" :key="index" style="cursor: pointer;">{{ item }}</b>
    </div>
</template>
  
<script>
export default {
    name: 'qwe',
    props: ['liuyans'],
    beforeDestroy() {
        removeEventListener('click', this.click, false)
    }
}
</script>
  
<style lang='less'>

</style>