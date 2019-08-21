<template>
  <div class="home">
    <div class="head" style="background:#1A2229;">
      <Menu mode="horizontal" theme="dark" active-name="1">
        <img
          src="../assets/img/LOGO1.png"
          style="position:absolute;left:0;top:50%;margin-top:-1.5%;width: 15%;"
          alt
        />
        <MenuItem name="1" class="itemLi">
          <router-link to="/home/myagent">{{$t("home")}}</router-link>
        </MenuItem>
        <MenuItem name="2" class="itemLi">
          <router-link to="/home/myMemvership">{{$t("mymember")}}</router-link>
        </MenuItem>
        <MenuItem name="3" class="itemLi">
          <router-link to="/home/cashOutRecord">{{$t("withdrawRecore")}}</router-link>
        </MenuItem>
        <MenuItem name="4" class="itemLi">
          <Dropdown trigger="click" class="itemLiDrop">
            <a href="javascript:void(0)">
              <img src="@/assets/img/admin.png" style="width:0.7rem" alt />
              <span style="padding-top:0.1rem;vertical-align:middle;display:inline-block;">{{name}}</span>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem class="DropdownItemLi" @click.native="changePass()">{{$t('changePass')}}</DropdownItem>
              <DropdownItem
                class="DropdownItemLi"
                @click.native="signOut(1)"
              >{{$t('signOutAccount')}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </MenuItem>
      </Menu>
    </div>
    <div class="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>


<script>
import { setToken, getToken } from "@/assets/js/baseMethods";
import Url from "@/assets/js/configUrl";
export default {
  name: "home",
  data() {
    return {
      name: "",
      oldpass: "",
      newpass: ""
    };
  },
  mounted() {
    // console.log("window",window);
    if (
      JSON.stringify(sessionStorage.getItem("agentName")) != null ||
      JSON.stringify(sessionStorage.getItem("agentName")) != ""
    ) {
      this.name = sessionStorage.getItem("agentName");
    }
    if (
      window.navigator.appVersion.indexOf("iPhone") != -1 ||
      window.navigator.appVersion.indexOf("Android") != -1
    ) {
      // 手机端
      document.getElementsByClassName("itemLiDrop")[0].style =
        "vertical-align: middle;display:flex;align-items: center;margin-top: -0.25rem";
    } else {
      // PC端
      document.getElementsByClassName("content")[0].style =
        "width:70%;margin-left:15%;";
      document.getElementsByClassName("itemLiDrop")[0].style =
        "vertical-align: middle;display:flex;align-items: center;";
    }
  },
  methods: {
    signOut() {
      setToken("");
      sessionStorage.setItem("agentName", "");
      this.$router.push({ name: "login" });
    },
    changeLabguage(name) {
      if (name == "zh-CN") {
        this.$i18n.locale = "zh-CN";
      } else if (name == "en-US") {
        this.$i18n.locale = "en-US";
      }
    },
    changePass() {
      let _this = this;
      this.$Modal.confirm({
        // okText: _this.$t('revisebankCard'),
        // cancelText: _this.$t('cancel'),
        loading: true,
        render: h => {
          return h("div", [
            // 修改密码
            h("h3", _this.$t("changePass")),
            // 旧密码
            h("div", { style: { marginTop: "10px" } }, [
              h(
                "span",
                { style: { width: "20%!important" } },
                _this.$t("oldPass") + "："
              ),
              h("Input", {
                props: {
                  type: "text",
                  value: `${this.oldpass}`
                },
                on: {
                  input: val => {
                    this.oldpass = val;
                  }
                }
              })
            ]),
            // 新密码
            h("div", { style: { marginTop: "10px" } }, [
              h(
                "span",
                { style: { width: "20%!important" } },
                _this.$t("NewPass") + "："
              ),
              h("Input", {
                props: {
                  type: "text",
                  value: `${this.newpass}`
                },
                on: {
                  input: val => {
                    this.newpass = val;
                  }
                }
              })
            ])
          ]);
        },
        onOk: function() {
          let isTrue = false;
          let pattern =  /^[a-zA-Z0-9]+$/
          let isTrue1 = pattern.test(_this.oldpass)&&pattern.test(_this.newpass)
          if (_this.oldpass.length<6||_this.oldpass.length>12||_this.newpass.length<6||_this.newpass.length>12) {
            this.$Message.error("Password length must be 6-12 bits");
            isTrue = false;
          }else if(isTrue1==false){
           this.$Message.error({
              content: "Incorrect password format",
              duration: 3
            });
          }else{
            isTrue = true;
          }
          const token = getToken();
          this.buttonLoading = false;
          if (isTrue==true&&isTrue1==true) {
            this.buttonLoading = true;
            _this
              .axios({
                method: "post",
                url: Url.changePassUrl,
                headers: { token: token },
                params: {
                  userName: _this.name,
                  password:_this.oldpass,
                  bankCard:_this.newpass
                }
              })
              .then(res => {
                console.log("查看修改密码返回的信息",res)
                if (res.data.code == 200) {
                  this.buttonLoading = false;
                  this.$Message.success("success");
                  this.$Modal.remove();
                  _this.oldpass = ""
                  _this.newpass = ""
                }else if(res.data.code == 1010){
                  this.buttonLoading = false;
                  this.$Message.error({
                    content:"The original password is wrong",
                    duration:3
                  });
                }
              })
              .catch(err => {
                this.buttonLoading = false;
                this.$Message.error({
                  content: "request failure",
                  duration: 3
                });
              });
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
// 通用样式
li {
  padding: 0;
}
.home .ivu-menu-horizontal .ivu-menu-item,
.home .ivu-menu-horizontal .ivu-menu-submenu {
  padding: 1%;
}
.list1 li {
  padding: 0 20px;
  margin: 0;
}
a {
  display: inline-block;
  font-family: "Microsoft YaHei";
  color: #b5b5b5;
  font-size: 0.5rem;
}
a:hover {
  color: rgb(245, 243, 243);
}
img {
  vertical-align: middle;
}
.home .router-link-active {
  color: #f4f4f4 !important;
}

// 针对样式
.head .ivu-menu-dark {
  background: none;
}
.head .ivu-menu-horizontal {
  width: 70%;
  margin-left: 15%;
  text-align: right;
  height: auto !important;
  line-height: normal;
  color: #2c2877;
}
.home .itemLi {
  float: none;
  // height: 70px;
  display: inline-block;
  vertical-align: middle;
}
.home .DropdownItemLi {
  height: 40px;
  line-height: 40px;
  margin: 0;
  text-align: center;
}
</style>
