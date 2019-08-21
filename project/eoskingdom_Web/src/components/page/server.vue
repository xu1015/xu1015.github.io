<template>
    <div class="server">
        <div class="serverTop">
            <img :src="$t('server_title')" alt="">
        </div>
        <div class="serverBot">
            <div class="serverContent">
                <!-- 第一行 -->
                <div class="oneContent">
                    <div class="content1">
                        <img src="../../assets/images/server/ICON01.png" alt="">
                        <div>{{$t("service.games")}}</div>
                    </div>
                    <div class="content2">
                        <img src="../../assets/images/server/dot1.png" alt="">
                    </div>
                    <div class="content1">
                        <img src="../../assets/images/server/ICON02.png" alt="">
                        <div>{{$t("service.token")}}</div>
                    </div>
                </div>
                <!-- 第二行 -->
                <div class="oneContent">
                    <div class="content1">
                        <img src="../../assets/images/server/ICON04.png" alt="">
                        <div>{{$t("service.wallet")}}</div>
                    </div>
                    <div class="content2">
                        <img src="../../assets/images/server/dot1.png" alt="">
                    </div>
                    <div class="content1">
                        <img src="../../assets/images/server/ICON03.png" alt="">
                        <div>{{$t("service.dividends")}}</div>
                    </div>
                </div>
                <!-- 第三行 -->
                <div class="oneContent">
                    <div class="content1">
                        <img src="../../assets/images/server/ICON05.png" alt="">
                        <div>{{$t("service.dex")}}</div>
                    </div>
                    <div class="content2">
                        <img src="../../assets/images/server/dot1.png" alt="">
                    </div>
                    <div class="content1">
                        <img src="../../assets/images/server/ICON06.png" alt="">
                        <div>{{$t("service.community")}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.server{
    /* box-sizing: border-box; */
    margin-top: -5.8rem;
    /* background: red; */
}
/* 上半部分 */
.serverTop{
    box-sizing: border-box;
    padding-top: 7.3rem;
    width: 100%;
    overflow: hidden;
}
.serverTop img{
    width:140%;
    margin-left: -20%;
    margin-top: 0.7rem;
}
/* 下半部分 */
.serverBot{
    padding: 0 10%;
    margin-top: 3rem;
    margin-bottom: 3rem;
}
.serverBot .oneContent{
    width: 100%;
    margin-top: 3rem;
    display: flex;
}
.serverBot .content1{
    flex: 12;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 700;
}
.serverBot .content1 div{
    width: 100%;
}
.serverBot .content2{
    flex: 3;
    position: relative;
    padding: 0 10%;
}
.serverBot .content2 img{
    padding-top: 160%;
}
.serverBot .oneContent img{
    width: 100%;
    box-sizing: border-box;
}

</style>
