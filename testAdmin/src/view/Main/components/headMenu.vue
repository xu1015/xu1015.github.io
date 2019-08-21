<template>
  <Menu mode="horizontal" theme="dark" active-name="1">
    <div class="layout-logo"></div>
    <div class="layout-nav">
      <MenuItem name="1">
        <Icon type="ios-navigate"></Icon>Item 1
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-keypad"></Icon>Item 2
      </MenuItem>
      <MenuItem name="3">
        <language></language>
      </MenuItem>
      <MenuItem name="4">
        <account></account>
      </MenuItem>
    </div>
  </Menu>
</template>

<script>
import language from "../../../components/language/language";
import account from "../../../components/account/account";
import config from "@/config";
let { locale } = config;
export default {
  components: { language,account },
};
</script>
<style scoped>
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
