<template>
    <div class="way">
        <div class="wayTop">
            <img :src="$t('line_figure')" alt="">
            <!-- <img :src="$t('way_title')" alt=""> -->
        </div>
        <div class="wayCenter">
            <div class="wayContent">
                <img :src="$t('line_map')" style="width:100%" alt="">
            </div>
        </div>
        <div class="wayBot">
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
.way{
    background: white;
    z-index: 2!important;
}
/* 上半部分 */
.wayTop{
    box-sizing: border-box;
    /* margin-top: 5.8rem; */
    width: 100%;
    overflow: hidden;
}
.wayTop img{
    width:140%;
    margin-left: -20%;
    margin-top: 1.7rem;
}
/* 下半部分 */
.wayCenter{
    padding: 0 10%;
    margin-top: 32%;
    padding-bottom: 32%;
    background: white;
}
.wayCenter .oneContent{
    width: 100%;
    display: flex;
    /* align-items: center; */
}
.wayCenter .oneContent img{
    width: 10rem;
}
.wayBot{
    width: 30%;
    margin: -1rem auto 0;
    padding-bottom: 1rem;
    position: relative;
}
.wayBot img{
    width: 100%;
}
.wayBot div{
    font-size: 1.6rem;
    position: absolute;
    top:4%;
    left: 35%;
}

</style>
