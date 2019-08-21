<template>
    <div class="team">
        <div class="teamTop">
            <img :src="$t('teamImg')" alt="">
        </div>
        <div class="teamCenter">
            <div class="teamContent">
                <!-- 第一行 -->
                <div class="oneContent">
                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER01.png" alt="">
                    </div>
                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER02.png" alt="">
                    </div>
                </div>
                <!-- 第二行 -->
                <div class="oneContent">
                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER03.png" alt="">
                    </div>

                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER04.png" alt="">
                    </div>
                </div>
                <!-- 第三行 -->
                <div class="oneContent">
                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER05.png" alt="">
                    </div>
                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER06.png" alt="">
                    </div>
                </div>
                <!-- 第四行 -->
                <div class="oneContent">
                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER07.png" alt="">
                    </div>
                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER08.png" alt="">
                    </div>
                </div>
                <!-- 第五行 -->
                <div class="oneContent">
                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER09.png" alt="">
                    </div>
                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER10.png" alt="">
                    </div>
                </div>
                <!-- 第六行 -->
                <div class="oneContent">
                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER11.png" alt="">
                    </div>
                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER12.png" alt="">
                    </div>
                </div>
                <!-- 第七行 -->
                <div class="oneContent">
                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER13.png" alt="">
                    </div>
                    <div class="content1">
                        <img src="../../assets/images/team/C01-PARTNER14.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="teamBot">
            <div class="teamBotContent">
                <div class="teamBotImg">
                    <img @click="showInfo('contact@eoskingdom.io')" src="../../assets/images/team/01MAIL.png" alt="">
                    <a href="https://t.me/EosKingDom_global" target="_blank">
                        <img src="../../assets/images/team/02TELEGRAM.png" alt="">
                    </a>
                    <a href="https://twitter.com/eoskingdom" target="_blank">
                        <img src="../../assets/images/team/03TWITTER.png" alt="">
                    </a>
                    <img @click="changeStatus" src="../../assets/images/team/04WECHAT.png" alt="">
                    <!-- <img src="../../assets/images/team/05FACEBOOK.png" alt=""> -->
                    <!-- <img src="../../assets/images/team/06STEEMIT.png" alt=""> -->
                    <!-- <img src="../../assets/images/team/07MEDIUM.png" alt="">  -->
                </div>
            </div>
                <div class="teamBotfont"><span>copyright © 2019 EOSKINGDOM. All Rights Reserved.</span></div>
        </div>
        <message-box :title="showHideInfo" :showHide="showHide" :change="shchange"></message-box>
        <div v-show="this.wechat_img" class="wechatInfo">
            <img src="../../assets/images/phone/wechat_scan.jpg" alt="">
            <p @click="wechat_img = false">OK</p>
        </div>
    </div>
</template>

<script>
import messageBox from './messageBox'

export default {
    components:{messageBox},
    data(){
        return{
            // 弹框显示隐藏
            showHide: false,
            // 往弹框传的信息
            showHideInfo: "",
            wechat_img:false,
        }
    },
    methods:{
        shchange(val) {
            this.showHide = val;
        },
        showInfo(val){
            this.showHide=true;
            this.showHideInfo="邮箱:"+val;
        },
        changeStatus(){
            this.wechat_img = true;
        }
    }
}
</script>

<style scoped>
.team{
    background: #384D57;
}
/* 上半部分 */
.teamTop{
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
}
.teamTop img{
    width:130%;
    margin-left: -15%;
    margin-top: 1.7rem;
}
/* 中间部分 */
.teamCenter{
    padding: 0 7%;
    margin-top: 15%;
    margin-bottom: 15%;
}
.teamCenter .oneContent{
    width: 100%;
    display: flex;
    margin-top: 5%;
}
.teamCenter .content1{
    flex: 12;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
}
.teamCenter .content2{
    flex: 3;
    position: relative;
    padding: 0 10%;
}
.teamCenter .content2 img{
    padding-top: 160%;
}
.teamCenter .oneContent img{
    width: 100%;
    box-sizing: border-box;
}
.teamBot{
    width: 100%;
    /* height: 4.5rem; */
    background:#0F2331; 
}
.teamBotContent{
    padding: 0 15%;
    padding-top: 1rem;
}
.teamBotImg{
    display: flex;
    justify-content: space-between;
}
.teamBotImg img{
    width: 2rem;
    height: 2rem;
}
.teamBotfont{
    text-align: center;
}
.teamBotfont span{
    display: block;
    font-size: 1rem;
    word-break:keep-all;
    white-space:nowrap;
    transform: scale(.7)
}
.wechatInfo{
    width: 80%;
    position: fixed;
    top: 30%;
    left: 50%;
    margin-left: -40%;
    font-size: 0;
}
.wechatInfo img{
    width: 100%;
}
.wechatInfo p{
    width: 100%;
    background-color: #4cd964;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    font-size: 2rem;
}
</style>
