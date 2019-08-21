<template>
  <Dropdown trigger="click" @on-click="test1111">
    <a href="javascript:void(0)" :style="{height:heightSize+'px',display:'flex',alignItems:'center'}">
      <img src="@/assets/images/admin.png" alt width="30px" />
    </a>
    <DropdownMenu slot="list">
      <DropdownItem name="Password">Password</DropdownItem>
      <DropdownItem name="Signout">Signout</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
export default {
  props:{
    heightSize:{
      type:Number,
      default:60
    }
  },
  methods: {
    test1111(name) {
      console.log("点击了" + name);
      if(name=="Password"){
        
      } else if(name=="Signout")  {
        this.signOut()
      }
    },
    signOut(){
      sessionStorage.setItem('userName','')
      this.$router.push({name:'login'})
    },
  }
};
</script>
<style scoped>
</style>
