<template>
  <div class="monthBill">
    <Table :row-class-name="rowClassName" :columns="columns1" :data="data1" class="billTable"></Table>
  </div>
</template>
<script>
import {setToken,getToken} from "@/assets/js/baseMethods";
import Url from "@/assets/js/configUrl";
import iView from 'iview'
export default {
  name: "monthBill",
  data() {
    return {
      columns1: [
        {
          title:this.$t('monthBill.index'),
          type:'index',
          className: 'rightBorder fontCenter',
        },
        {
          title:this.$t('monthBill.date'),
          key: "createTime",
          className: 'rightBorder fontCenter',
        },
        {
          title: this.$t('monthBill.activeMember'),
          key: "count",
          className: 'rightBorder fontCenter',
        },
        {
          title: this.$t('monthBill.scale'),
          key: "scale",
          className: 'rightBorder fontCenter',
        },
        {
          title:this.$t('monthBill.myprofit'),
          key: "profit",
          className: 'rightBorder fontCenter',
        },
        {
          title:this.$t('monthBill.profit'),
          key: "platform",
          className: 'fontCenter',
        },
      ],
      data1: []
    };
  },
  methods: {
    rowClassName (row, index) {
      if(index === 0&&this.data1.length!=1){
        return 'borderTB';
      }else if (index === this.data1.length-1) {
        return '';
      }else{
        return 'borderB';
      }
    }
  },
  mounted() {
    const token = getToken();
    const userName = sessionStorage.getItem("agentName")
    iView.LoadingBar.start()
    this.axios({
      method:'post',
      url:Url.monthBillUrl,
      headers: {'token':token},
      params:{
        agentUser:userName
      },
    }).then((res)=>{
      console.log("查看日账单",res)
      iView.LoadingBar.finish()
      this.data1 = res.data.list;
      if (res.data.list.length>0) {
        this.data1.forEach((item,index) => {
          this.data1[index].platform = this.data1[index].profit / this.data1[index].scale;
          this.data1[index].platform = parseInt(this.data1[index].platform*100+0.00001)/100
          this.data1[index].scale=parseFloat(this.data1[index].scale)*100;
          this.data1[index].scale=this.data1[index].scale+"%";
        });
      }
    }).catch((e)=>{
      iView.LoadingBar.finish()
    })
  }
};
</script>
<style scope>
.monthBill{
  margin:0 0 100px 0;
  padding: 0 0 1px;
}
.ivu-table-header{
  border: none;
}
/* 表格样式 */

/* 四周 */
.monthBill .billTable{
  margin: 20px 0 40px;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.monthBill .ivu-table .borderB td{
  border-bottom: 1px solid black;
}
.monthBill .ivu-table .rightBorder{
  border-right: 1px solid black;
}
.monthBill .ivu-table .fontCenter{
 text-align: center;
}
.monthBill .ivu-table .borderTB td{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.monthBill .ivu-table th{
  background-color: #c1c1c1;
}

.monthBill .billTitle th{
  border-bottom: none;
}
.monthBill .ivu-table-overflowX,.ivu-table-tip{
  overflow-x: hidden!important;
}
.monthBill .centerRight{
  /* position:absolute; */
  line-height:75px;
  /* right:30px; */
  font-size:25px;
  text-decoration:underline;
  cursor:pointer;
  color: #F4F4F4;
}
.monthBill a {
  color: #666;
}
</style>
