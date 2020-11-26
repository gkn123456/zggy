<template>
  <div class="layout">
    <Layout id="index">
      <Content class="cotent" style="display: inline-block;position: relative;border-right:1px solid #ececec;">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Breadcrumb>
          <BreadcrumbItem to="/"> <Icon type="ios-home-outline"></Icon>首页</BreadcrumbItem>
          <BreadcrumbItem to="/books"><Icon type="logo-buffer"></Icon>列表</BreadcrumbItem>
        </Breadcrumb>
        <div class="details">
          <div style="width:100%;display: flex;justify-content: space-between;">
            <div style="width:164px;height:200px;border:1px solid #ececec;overflow: hidden">
                <Carousel v-model="value1" style="height:200px;">
                    <CarouselItem v-for="(item,index) in books.images" :key="index">
                        <img :src="item" alt="" style="width:100%;height:100%;">
                    </CarouselItem>
                </Carousel>
            </div>
            <div style="width:75%;">
              <div>
                <ul class="bookdul">
                  <li class="bookdli">
                    <div class="bookdli_l">名称</div><div class="bookdli_r">{{books.writer}}</div>
                  </li>
                  <li class="bookdli">
                    <div class="bookdli_l">作家</div><div class="bookdli_r">{{books.b_name}}</div>
                  </li>
                  <li class="bookdli">
                    <div class="bookdli_l">出版社</div><div class="bookdli_r">{{books.press}}</div>
                  </li>
                  <li class="bookdli">
                    <div class="bookdli_l">版次</div><div class="bookdli_r">{{books.num}}</div>
                  </li>
                  <li class="bookdli">
                    <div class="bookdli_l">包装</div><div class="bookdli_r">{{books.packs}}</div>
                  </li>
                  <li class="bookdli">
                    <div class="bookdli_l">售价</div><div class="bookdli_r">{{books.s_price}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div style="height:80px;">
            <Button @click="pay" type="primary" icon="ios-card" style="float:right;" >购买</Button>
          </div>
          <div v-html="books.des" style="background:#fff;padding:0 16px;"></div>
        </div>
        
      </Content>
      <Sider hide-trigger width="230" style="background:#fff"> 
        <LeftView />
      </Sider>
    </Layout>
    <Member ref="member" type="1" />
    <Login ref="Logins" />
  </div>
</template>
<script>
import Member from './member';
import LeftView from './leftView';
import Login from './Login';
import commons from '@/components/common.js';
export default {
  components: {
    Member,LeftView,Login
  },
  data() {
    return { 
      list: [],
      codeShow:false,
      isprice:false,
      value1:0,
      books:'',
      spinShow:true,
    };
  },
  created() {
    this.nav_id = this.$route.query.book_id;
    this.getDetails(this.$route.query.book_id)
  },
  methods:{
    cancel(){
      this.$router.go(-1)
    },
    getDetails(id){
      var _this = this;
      const ids = Number(id);
      _this.$hapi.getBookDetail({book_id:ids}).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _this.books = data.data;
        } else {
          _this.$Message.error(data.msg);
          if(data.code === 100||data.code === 101){
            commons.loginOut();
            _this.$refs.Logins.login()
          }
        }
        setTimeout(function(){
          _this.spinShow = false;
        },300)
      });

    },
    pay(){
      const _this =this;
      _this.$router.push({ path: '/recharge', query: { type: 2,price:_this.books.price,id:_this.books.book_id,title:_this.books.b_name }});
    },
  }
};
</script>
<style>
@import '../../less/index.less';
  .modal{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .codeimg{
    display: flex;
    justify-content: center;
  }
.detailsTitle{
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin: 20px auto 15px auto;
    line-height: 32px;
  }
  .details{
    background: #fff;
    padding: 10px;
  }
  .detailscent{
    display: flex;
    justify-content: center;
    margin-bottom:20px ;
  }
  .bookdul{
    border:1px solid #333;

  }
  .bookdli{
    display: flex;
    border-bottom:1px solid #ececec;
  }
  .bookdli:last-child{
    border: none;
  }
  .bookdli_l{
    width: 20%;
    border-right:1px solid #ececec;
    padding:5px 0;
    text-align: center;
  }
  .bookdli_r{
    width: 80%;
    padding:5px 10px;

  }
</style>