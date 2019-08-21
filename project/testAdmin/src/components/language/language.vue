<template>
  <Dropdown trigger="click" @on-click="changeI18n">
    <a href="javascript:void(0)" style="color:#fff">
      lang
      <Icon type="ios-arrow-down"></Icon>
    </a>
    <DropdownMenu slot="list">
      <DropdownItem name="cn">简体中文</DropdownItem>
      <DropdownItem name="en">English</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import i18n from "../../i18n/i18n.js";
export default {
  methods: {
    changeI18n(name) {
      // 多国语言动态改变
      if (name == "cn") {
        i18n.locale = "zh-CN";
        // locale = "zh-CN";
      } else {
        i18n.locale = "en-US";
        // locale = "en-US";
      }
    }
  }
};
</script>
<style scoped>
</style>
