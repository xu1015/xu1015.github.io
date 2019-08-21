<template>
    <div class="shouyi">
        <div class="shouyiTop">
            <img :src="$t('earnings_title')" alt="">
        </div>
        <div class="shouyiCenter">
            <div class="shouyiContent">

                <!-- 第一行 -->
                <div class="oneContent">
                    <div class="content1">
                        <img src="../../assets/images/shouyi/C01-IMAGE01.png" alt="">
                    </div>
                    <div class="content1">
                        <img :src="$t('earnings_issue')" alt="">
                    </div>
                </div>
                <!-- 第二行 -->
                <div class="oneContent">
                    <div class="content1">
                        <img src="../../assets/images/shouyi/C01-IMAGE02.png" alt="">
                    </div>
                    <div class="content1">
                        <img :src="$t('earnings_Preparations')" alt="">
                    </div>
                </div>
                <!-- 第三行 -->
                <div class="oneContent">
                    <div class="content1">
                        <img src="../../assets/images/shouyi/C01-IMAGE03.png" alt="">
                    </div>
                    <div class="content1">
                        <img :src="$t('earnings_distribution')" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="shouyiBot">
            <a :href="$t('whitebook_href')" target="_blank">
                <img :src="$t('btnImg')" alt="">
            </a>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.shouyi{
    background: #ee7e6a;
}
/* 上半部分 */
.shouyiTop{
    box-sizing: border-box;
    /* margin-top: 5.8rem; */
    width: 100%;
    overflow: hidden;
}
.shouyiTop img{
    width:140%;
    margin-left: -20%;
    padding-top: 1.7rem;
    box-sizing: border-box;
}
/* 下半部分 */
.shouyiCenter{
    padding: 0 10%;
    margin-top: 2rem;
}
.shouyiCenter .oneContent{
    width: 100%;
    display: flex;
    align-items: center;
}
.shouyiCenter .content1{
    flex: 12;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
}

.shouyiCenter .oneContent img{
    width: 90%;
    box-sizing: border-box;
}
.shouyiCenter .content2 img{
    padding-top: 160%;
}
.shouyiBot{
    width: 30%;
    margin: -1rem auto 0;
    padding-bottom: 1rem;
    position: relative;
}
.shouyiBot img{
    width: 100%;
}
.shouyiBot div{
    font-size: 1.6rem;
    position: absolute;
    top:4%;
    left: 35%;
}

</style>
