<template>
  <div class="yearBill">
    <Table :row-class-name="rowClassName" :columns="columns12" :data="data6" class="billTable"/>
  </div>
</template>
<script>
import {setToken,getToken} from "@/assets/js/baseMethods";
import Url from "@/assets/js/configUrl";
import iView from 'iview'
export default {
  name: "yearBill",
  data() {
    return {
      columns12: [
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
          className: ' fontCenter',
        },
      ],
      data6: []
    };
  },
  mounted() {
    this.getYearBill()
  },
  methods: {
    getYearBill(){
      let token = getToken();
      let date = new Date();
      let year = date.getUTCFullYear();
      const userName = sessionStorage.getItem("agentName")
      iView.LoadingBar.start()
      this.axios({
        method:'post',
        url:Url.yearsBillUrl,
        headers: {'token':token},
        params:{
          agentUser:userName,
          year:year
        },
      }).then((res)=>{
        iView.LoadingBar.finish()
        this.data6 = res.data.list;
        if (res.data.list.length>0) {
          this.data6.forEach((item,index) => {
            this.data6[index].platform = this.data6[index].profit / this.data6[index].scale;
            this.data6[index].platform = parseInt(this.data6[index].platform*100+0.00001)/100
            this.data6[index].scale=parseFloat(this.data6[index].scale)*100;
            this.data6[index].scale=this.data6[index].scale+"%";
          });
        }
      }).catch((e)=>{
        iView.LoadingBar.finish()
      })
    },
    rowClassName (row, index) {
      if(index === 0){
        return 'borderTB';
      }else if (index === this.data6.length-1) {
        return '';
      }else{
        return 'borderB';
      }
    },
    show(index) {
      this.$router.push({path:"/home/myagent/monthBill",query:{month:index}});
    }
  }
};
</script>
<style scope>
.yearBill{
  margin:0 0 100px 0;
  padding: 0 0 1px;
}
.ivu-table-header{
  border: none;
}
.yearBill .ivu-table .borderB td{
  border-bottom: 1px solid black;
}
.yearBill .ivu-table .rightBorder{
  border-right: 1px solid black;
}
.yearBill .ivu-table .fontCenter{
 text-align: center;
}
.yearBill .ivu-table .borderTB td{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.yearBill .ivu-table th{
  background-color: #c1c1c1;
}

.yearBill .billTable{
  margin: 20px 0 40px;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.yearBill .billTitle th{
  border-bottom: none;
}
.yearBill .billTitle .titleCenter{
  font-size:40px;
  color: #F4F4F4;
}
.yearBill .billTitle .centerRight{
  position:absolute;
  line-height:75px;
  right:30px;
  font-size:25px;
  text-decoration:underline;
  cursor:pointer;
  color: #F4F4F4;
}
.yearBill .ivu-table-overflowX,.ivu-table-tip{
  overflow-x: hidden!important;
}
</style>
