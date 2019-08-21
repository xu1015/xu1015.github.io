<template>
  <div class="cashOutRecord">
    <div style="height:1rem;"></div>
    <Table :row-class-name="rowClassName" :columns="columns1" :data="cashoutRecordList"  class="billTable"></Table>
    <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage" style="text-align: right;margin-right:40px;"><span >{{$t('gong')}}<span> {{dataCount}} </span>{{$t('tiao')}}</span></Page>
  </div>
</template>
<script>
import {setToken,getToken} from "@/assets/js/baseMethods";
import Url from "@/assets/js/configUrl";
import iView from 'iview'
export default {
  name: "cashOutRecord",
  data() {
    return {
      historyData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      columns1: [
        {
          title: this.$t('withdrawRecord.index'),
          type:'index',
          className: 'rightBorder fontCenter',
        },
        {
          title: this.$t('withdrawRecord.applyDate'),
          key: "createTime",
          className: 'rightBorder fontCenter',
        },
        {
          title: this.$t('withdrawRecord.withdrawMoney'),
          key: "amount",
          className: 'rightBorder fontCenter',
        },
        {
          title: this.$t('withdrawRecord.status'),
          key: "status",
          className: 'fontCenter',
          render: (h, params) => {
            let _this = this
            if (params.row.status=="fail") {
              return h('div', [
                h('span',params.row.status),
                h('Button',{
                  props:{
                    type:'error',
                    ghost:true,
                  },
                  on:{
                    click:()=>{
                      if (params.row.failCause==null||params.row.failCause=="") {
                        this.$Message.error({
                          content:_this.$t('withdrawRecord.reason'),
                          duration:3
                        })
                      }else{
                        this.$Message.error({
                          content:params.row.failCause,
                          duration:3
                        })
                      }
                    }
                  }
                },_this.$t('seeReason')),
              ]);
            }else{
              return h('div', [
                h('span',params.row.status),
              ]);
            }
          }
        }
      ],
      cashoutRecordList:[],
    };
  },
  methods: {
    rowClassName (row, index) {
      // 边的样式
      if(index === 0&this.cashoutRecordList.length!=1){
        return 'borderTB';
      }else if (index === this.cashoutRecordList.length-1) {
        return '';
      }else{
        return 'borderB';
      }
    },
    changepage(index) {
      const token = getToken();
      const userName = sessionStorage.getItem("agentName")
      iView.LoadingBar.start()
      this.axios({
        method:'get',
        url:Url.withdrawListUrl,
        headers: {'token':token},
        params:{
          userName:userName,
          pageNum:index,
          pageSize:10,
        },
      }).then((res)=>{
        iView.LoadingBar.finish()
        this.cashoutRecordList = res.data.page.list;
        if (res.data.page.list.length>0) {
          this.cashoutRecordList.forEach((ietm,index) => {
            if (this.cashoutRecordList[index].status==1) {
              this.cashoutRecordList[index].status="apply"
              this.cashoutRecordList[index].cellClassName={
                status:'bgYellow'
              }
            }else if(this.cashoutRecordList[index].status==2){
              this.cashoutRecordList[index].status="success"
              this.cashoutRecordList[index].cellClassName={
                status:'bgGreen'
              }
            }else if(this.cashoutRecordList[index].status==3){
              this.cashoutRecordList[index].status="fail"
              this.cashoutRecordList[index].cellClassName={
                status:'bgRed'
              }
            }
          });
        }
        this.dataCount = res.data.page.total;
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
.cashOutRecord{
  background: #fbfbfb;
}
/* 颜色状态样式开始 */
.cashOutRecord .bgYellow{
  color: rgb(241, 157, 37);
  font-size: 18px;
}
.cashOutRecord .bgGreen{
  color: rgb(94, 216, 169);
  font-size: 18px;
}
.cashOutRecord .bgRed{
  color: rgb(244, 78, 78);
  font-size: 18px;
}
/* 颜色状态样式结束 */
.cashOutRecord .billTable{
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.cashOutRecord .ivu-table .borderB td{
  border-bottom: 1px solid black;
}
.cashOutRecord .ivu-btn{
  position: absolute;
  right: 2%;
}
.cashOutRecord .ivu-table .rightBorder{
  border-right: 1px solid black;
}
.cashOutRecord .ivu-table .fontCenter{
 text-align: center;
}
.cashOutRecord .ivu-table .borderTB td{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.cashOutRecord .ivu-table th{
  background-color: #c1c1c1;
}

.cashOutRecord .billTitle th{
  border-bottom: none;
}
.cashOutRecord .ivu-table-overflowX,.ivu-table-tip{
  overflow-x: hidden!important;
}
.cashOutRecord .billTitle th{
  border-bottom: none!important;
}
</style>
