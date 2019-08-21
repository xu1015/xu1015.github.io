<template>
  <div class="myMemvership">
    <div class="search-con" style="padding-top:10px;margin-left:40px;">
      <Input v-model="screen" :placeholder="$t('searchplace')" class="search-input"/>
      <Button class="search-btn" type="primary" @click="onSearch"><Icon type="md-search"/>&nbsp;search</Button>
    </div>
    <Table :row-class-name="rowClassName" :columns="columns1" :data="data1" class="billTable"></Table>
    
    <Page :total="dataCount" :page-size="pageSize" show-total  @on-change="changepage" style="text-align: right;margin-right:40px;"><span >{{$t('gong')}}<span> {{dataCount}} </span>{{$t('tiao')}}</span></Page>
  </div>
</template>
<script>
import {setToken,getToken} from "@/assets/js/baseMethods";
import Url from "@/assets/js/configUrl";
import iView from 'iview'
export default {
  name: "myMemvership",
  data() {
    return {
      screen:'',
      historyData:[],
      // 初始化信息总条数
      dataCount:0,
      // 每页显示多少条
      pageSize:10,
      columns1: [
        {
          title: this.$t('memberInfo.User'),
          key: "userName",
          className: 'rightBorder fontCenter',
        },
        {
          title: this.$t('memberInfo.Balance'),
          key: "balance",
          className: 'rightBorder fontCenter',
        },
        {
          title: this.$t('memberInfo.TotalBet'),
          key: "betTotal",
          className: 'rightBorder fontCenter',
        },
        {
          title: this.$t('memberInfo.CreateTime'),
          key: "createTime",
          className: 'rightBorder fontCenter',
        },
        {
          title: this.$t('memberInfo.lastTime'),
          key: "updateTime",
          className: 'rightBorder fontCenter',
        },
        {
          title:this.$t('memberInfo.Visit'),
          key: "count",
          className: 'rightBorder fontCenter',
        },
        {
          title:this.$t('memberInfo.Deposit'),
          key: "rechargeTotal",
          className: 'rightBorder fontCenter',
        },
        {
          title:this.$t('memberInfo.Profit'),
          key: "agentFeeTotal",
          className: 'fontCenter',
        }
      ],
      data1: []

    };
  },
  methods: {
    rowClassName (row, index) {
      if(index === 0){
        return 'borderTB';
      }else if (index === this.historyData.length-1) {
        return '';
      }else{
        return 'borderB';
      }
    },
    onSearch(){
      this.changepage(1)
    },
    changepage(index) {
      const token = getToken();
      const userName = sessionStorage.getItem("agentName")
      iView.LoadingBar.start()
      this.axios({
        method:'post',
        url:Url.agentMemberUrl,
        headers: {'token':token},
        params:{
          agentUser:userName,
          userName:this.screen,
          pageNum:index,
          pageSize:10,
        },
      }).then((res)=>{
        console.log("查看会员信息",res)
        iView.LoadingBar.finish()
        this.data1 = res.data.page.list;
        this.dataCount = res.data.page.total;
        this.data1.forEach((item,index) => {
          // 累积下注
          if (this.data1[index].betTotal==null) {
            this.data1[index].betTotal=0;
          }
          // 创建时间
          if (this.data1[index].createTime!=null) {
            this.data1[index].createTime = this.data1[index].createTime.slice(0,this.data1[index].createTime.length-2)
          }
          // 最后访问时间
          if (this.data1[index].updateTime!=null) {
            this.data1[index].updateTime = this.data1[index].updateTime.slice(0,this.data1[index].updateTime.length-2)
          }
          if (this.data1[index].updateTime==null) {
            this.data1[index].updateTime = this.data1[index].createTime
          }
          // 访问次数
          if (this.data1[index].count==null) {
            this.data1[index].count=0;
          }
          // 收取利润
          if (this.data1[index].agentFeeTotal==null) {
            this.data1[index].agentFeeTotal=0;
          }
        });
      }).catch((e)=>{
        iView.LoadingBar.finish()
      })
    }
  },
  created() {
    this.changepage(1)
  }
};
</script>
<style scope>
.myMemvership{
  background: #fbfbfb;
}
/* 表格样式 */
.myMemvership .billTable{
  /* margin:0 40px; */
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.myMemvership .billTitle th{
  border-bottom: none;
}
.myMemvership .ivu-table-overflowX{
  overflow-x: hidden!important;
}
.myMemvership .ivu-table .borderB td{
  border-bottom: 1px solid black;
}
.myMemvership .ivu-table .rightBorder{
  border-right: 1px solid black;
}
.myMemvership .ivu-table .fontCenter{
 text-align: center;
}
.myMemvership .ivu-table .borderTB td{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.myMemvership .ivu-table th{
  background-color: #c1c1c1;
}





.myMemvership .search-con{
  padding-bottom: 15px;
} 
.myMemvership .search-con .search-input{
    width: 200px;
    display: inline-block;
  }
</style>
