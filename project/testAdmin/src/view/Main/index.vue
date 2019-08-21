<template>
  <div class="layout" style="height:100%">
    <Layout style="height:100%">
      <Sider :style="{background: '#515a6e'}">
        <sider-menu></sider-menu>
        <Menu theme="dark" accordion width="auto" @on-select="goto">
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
          <!-- 乐 -->
          <Submenu name="music">
            <template slot="title">
              <Icon type="ios-people" />
              <span>{{$t('header.music')}}</span>
            </template>
            <MenuItem name="music-yunmen">{{$t('header.music_yunmen')}}</MenuItem>
            <MenuItem name="music-daxian">{{$t('header.music_daxian')}}</MenuItem>
            <MenuItem name="music-dashao">{{$t('header.music_dashao')}}</MenuItem>
            <MenuItem name="music-daxia">{{$t('header.music_daxia')}}</MenuItem>
            <MenuItem name="music-dahao">{{$t('header.music_dahao')}}</MenuItem>
            <MenuItem name="music-dawu">{{$t('header.music_dawu')}}</MenuItem>
          </Submenu>
          <!-- 射 -->
          <Submenu name="shooting">
            <template slot="title">
              <Icon type="ios-stats" />
              <span>{{$t('header.shooting')}}</span>
            </template>
            <MenuItem name="shooting-baiyao">{{$t('header.shooting_baiyao')}}</MenuItem>
            <MenuItem name="shooting-shenlian">{{$t('header.shooting_shenlian')}}</MenuItem>
            <MenuItem name="shooting-injection">{{$t('header.shooting_injection')}}</MenuItem>
            <MenuItem name="shooting-taper">{{$t('header.shooting_taper')}}</MenuItem>
            <MenuItem name="shooting-wellgauge">{{$t('header.shooting_wellgauge')}}</MenuItem>
          </Submenu>
          <!-- 御 -->
          <Submenu name="royal">
            <template slot="title">
              <Icon type="ios-paper" />
              <span>{{$t('header.royal')}}</span>
            </template>
            <MenuItem name="royal-singingluan">{{$t('header.royal_singingluan')}}</MenuItem>
            <MenuItem name="royal-waterwheel">{{$t('header.royal_waterwheel')}}</MenuItem>
            <MenuItem name="royal-guojunwatch">{{$t('header.royal_guojunwatch')}}</MenuItem>
            <MenuItem name="royal-dancing">{{$t('header.royal_dancing')}}</MenuItem>
            <MenuItem name="royal-chasingleft">{{$t('header.royal_chasingleft')}}</MenuItem>
          </Submenu>
          <!-- 书 -->
          <Submenu name="books">
            <template slot="title">
              <Icon type="ios-paper" />
              <span>{{$t('header.books')}}</span>
            </template>
            <MenuItem name="books-hieroglyphic">{{$t('header.books_hieroglyphic')}}</MenuItem>
            <MenuItem name="books-referential">{{$t('header.books_referential')}}</MenuItem>
            <MenuItem name="books-understanding">{{$t('header.books_understanding')}}</MenuItem>
            <MenuItem name="books-phonetic">{{$t('header.books_phonetic')}}</MenuItem>
            <MenuItem name="books-transliteration">{{$t('header.books_transliteration')}}</MenuItem>
            <MenuItem name="books-borrowing">{{$t('header.books_borrowing')}}</MenuItem>
          </Submenu>
          <!-- 数 -->
          <Submenu name="numbers">
            <template slot="title">
              <Icon type="ios-paper" />
              <span>{{$t('header.numbers')}}</span>
            </template>
            <MenuItem name="numbers-computation">{{$t('header.numbers_computation')}}</MenuItem>
            <MenuItem name="numbers-mathematics">{{$t('header.numbers_mathematics')}}</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout :style="{padding: '0 0 24px',overflow:'hidden'}">
        <Header>
          <head-menu></head-menu>
        </Header>
        <Breadcrumb :style="{margin: '24px 0 24px 24px'}">
          <BreadcrumbItem v-for="(item,index) in menuList" :key="index" :to="item.path">
            {{$t(item.meta.title)}}
          </BreadcrumbItem>
          <!-- <BreadcrumbItem>Components</BreadcrumbItem> -->
          <!-- <BreadcrumbItem>Layout</BreadcrumbItem> -->
        </Breadcrumb>
        <Content :style="{margin: '0 24px', minHeight: '280px', background: '#fff'}">
          <router-view />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import routers from '@/router/routers'
import headMenu from "./components/headMenu";
import siderMenu from "./components/siderMenu";
import i18n from "../../i18n/i18n.js";
import config from '@/config'
let { locale } = config

// import siderMenu from './components/sider-menu'
export default {
  name: "Main",     //siderMenu
  components: {headMenu,siderMenu},
  data() {
    return {
    };
  },
  methods: {
    goto(name){
      this.$router.push({name:name})
    },
    ...mapMutations([
      'setBreadList',
    ]),
  },
  computed: {
    menuList () {
      return this.$store.state.app.BreadList
    }
  },
  watch: {
    // 监听路由变化，改变面包屑的显示
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.setBreadList(newRoute)
    }
  },
  mounted() {
    // 面包屑的动态防刷新机制之一
    this.setBreadList(this.$route);
    console.log("查看getter里面的具体数值",this.$store.getters)
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
</style>
