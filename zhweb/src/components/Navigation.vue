<template>
  <div class="navigation">
    <ul>
        <!-- <li><router-link :to="{path:'/news/detail'}"><span class="Nspan">机械</span></router-link></li>
        <li><span class="Nspan">汽车</span></li>
        <li><span class="Nspan">电力</span></li>
        <li><span class="Nspan">能源</span></li>
        <li><span class="Nspan">材料</span></li>
        <li><span class="Nspan">化工</span></li>
        <li><span class="Nspan">电子</span></li>
        <li><span class="Nspan">轻工</span></li>
        <li><span class="Nspan">纺织</span></li>
        <li><span class="Nspan">食品</span></li>
        <li><span class="Nspan">医药</span></li>
        <li><span class="Nspan">航空</span></li>
        <li><span class="Nspan">航天</span></li>
        <li><span class="Nspan">军工</span></li>
        <li><span class="Nspan">建材</span></li>
        <li><span class="Nspan">工业高校</span></li>
        <li><span class="Nspan">银行</span></li>
        <li><span class="Nspan">税务</span></li>
        <li><span class="Nspan">园区</span></li>
        <li><span class="Nspan">邮政</span></li>
        <li><span class="Nspan">设计</span></li>
        <li><span class="Nspan">施工</span></li>
        <li><span class="Nspan">建筑</span></li>
        <li><span class="Nspan">咨询</span></li>
        <li><span class="Nspan">销售</span></li>
        <li><span class="Nspan">交通运输</span></li> -->
    </ul>
  </div>
</template>
<script>
export default {
  name: 'navigation'
};
</script>
<style lang="less">
    .navigation{
        position: fixed;
        top:0px;
        right: 50px;
    }
    .navigation ul{
        width: 150px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    }
    .navigation ul li{
        width: 100%;
        border-bottom:1px solid #ececec;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top:8px;
        cursor: pointer;
    }
    .navigation ul li:last-child{
        border: none;
    }
    .Nspan{
        color: #000;
    }
    .navigation ul li:hover .Nspan{
        color:red;
    }
</style>