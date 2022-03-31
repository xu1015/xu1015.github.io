<template>
    <div>
        <con-title title="购买记录"></con-title>
        <div class="content">
            <img src="../img/person.png" alt="" srcset="">
            <p>没有购买记录</p>
        </div>
    </div>
</template>

<script>
import conTitle from '../conTitle'
export default {
    name:"invoiceRecord",
    components:{
        conTitle
    }
}
</script>

<style scoped>
.content{
    height: 26.5rem;
    text-align: center;
    background: #fff;
    font-size: .6rem;
    color: rgb(134, 134, 134);
}
img{
    width: 8rem;
    margin-top: 5rem;
}
p{
    line-height: 1rem;
    margin-top: .5rem;
}
</style>