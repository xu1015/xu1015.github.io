<template>
  <Menu width="auto" theme="dark">
    <!-- 诗 -->
    <Submenu name="rites">
      <template slot="title">
        <Icon type="ios-paper" />
        <span>{{$t('header.rites')}}</span>
      </template>
      <MenuItem name="rites-ji">{{$t('header.rites_ji')}}</MenuItem>
      <MenuItem name="rites-xie">{{$t('header.rites_xie')}}</MenuItem>
      <MenuItem name="rites-guest">{{$t('header.rites_guest')}}</MenuItem>
      <MenuItem name="rites-army">{{$t('header.rites_army')}}</MenuItem>
      <MenuItem name="rites-jia">{{$t('header.rites_jia')}}</MenuItem>
    </Submenu>
  </Menu>
</template>


<script>
export default {
  mounted() {
    console.log("查看this.$route数值",this.$route)
  },
};
</script>

<style scoped>
</style>
