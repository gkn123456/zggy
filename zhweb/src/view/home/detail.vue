<template>
  <div class="layout">
    <Layout id="index">
      <Content class="cotent" style="position: relative;background:#fff;border-right:1px solid #ececec;">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="details" style="position:relative;">
          <div style="display:flex;">
            <Breadcrumb>
              <BreadcrumbItem to="/"> <Icon type="ios-home-outline"></Icon>首页</BreadcrumbItem>
              <BreadcrumbItem :to="path"><Icon type="logo-buffer"></Icon>列表</BreadcrumbItem>
              <BreadcrumbItem><Icon type="logo-buffer"></Icon>详情</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div class="detailsTitle">
            {{news.title}}
          </div>
          <div v-html="news.detail" class="details_box" style="padding:0 16px;"></div>
          <div class="pnext" v-if="page <news.ps&&user.vip == 0">
            <div @click="handleReachBottom" v-if="news.tp == 1">
              <p style="font-weight:bold;font-size:14px;">剩余{{news.ps-page}}页未读,</p><span>继续阅读</span> <Icon type="ios-arrow-down" />
            </div>
            <div @click="pay(0)" v-if="news.tp == 2||news.tp == 3">
              <p style="font-weight:bold;font-size:14px;">剩余{{news.ps-page}}页未读,</p><span style="color:red;">￥{{news.price}}查看全文</span> <Icon type="ios-arrow-down" />
            </div>
          </div>
          <div class="pnext" v-if="page <news.ps&&user.vip > 0">
            <div @click="handleReachBottom">
              <p style="font-weight:bold;font-size:14px;">剩余{{news.ps-page}}页未读,</p><span>继续阅读</span> <Icon type="ios-arrow-down" />
            </div>
          </div>
          <!-- <div class="pagebox" v-if="e == 0">
            <Page :total="news.ps" size="small" page-size="1" show-total @on-change="pageChange"/>
          </div>   -->
        </div>
        <div class="paybuts" v-if="news.tp == 2||news.tp == 3">
          VIP可免费阅读全文
          <span v-if="user.vip > 0">（到期时间：{{user.exp_at}}）</span>
          <div @click="pay(1)" v-if="!viptime">开通{{viptime}}</div>
          <div @click="pay(1)" v-if="viptime">续费</div>
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
      path:'',
      news:'',
      page:1,
      spinShow:true,
      e:0,
      user:{
        vip:0
      },
      viptime:false,
    };
  },
  created() {
    this.nav_id = this.$route.query.news_id;
    this.path = this.$route.query.backPath;
    this.getDetails(this.$route.query.news_id)
    this.e = this.$route.query.vote == 1?1:0
    const uid = Number(localStorage.getItem('uid'));
    this.getUserInfo(uid);
  },
  methods:{
    isprices(){
      const _self =this;
      const uid =localStorage.getItem('uid');
      if(uid == null){
        _self.$Message.error('需先登录才能阅读详情');
      }else{
        _self.$refs.member.isprices()
      }
    },
    cancel(){
      this.$router.go(-1)
    },
    handleReachBottom(){
      const _this = this;
      if(_this.page < _this.news.ps){
        _this.page = parseInt(_this.page+1);
        _this.getDetails(_this.$route.query.news_id)
      }
      
    },
    getDetails(id){
      var _this = this;
      const ids = Number(id);
      console.log(_this.page)
      _this.$hapi.loadNewsDetail({page:_this.page,news_id:ids}).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _this.news = data.data;
        } else {
          _this.$Message.error(data.msg);
          _this.page = 1
          _this.isprices()
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
    getUserInfo(uid) {
      var _self = this;
      _self.$hapi.getUserInfo({ user_id: uid }).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.user = data.data
          _self.orDr(data.data.exp_at)
        }
      })
    },
    orDr(data){
      var thetime = data
      var   d=new   Date(Date.parse(thetime .replace(/-/g,"/")));
      var   curDate=new Date();
      if(d <=curDate){
          this.viptime = false
      }else{
          this.viptime = true
      }
    },
    vote(){
      var _this = this;
      _this.spinShow = true;
      _this.$hapi.getVote({three_id:_this.news.news_id}).then(function(response) {
        let data = response.data;
        _this.$Message.error(data.msg);
        _this.getDetails(_this.$route.query.news_id)
        setTimeout(function(){
          _this.spinShow = false;
        },300)
        if(data.code === 100||data.code === 101){
          commons.loginOut();
          _this.$refs.Logins.login()
        }
      });
    },
    pay(type){
      this.$router.push({ path: '/recharge', query: { type: type,price:this.news.price,id:this.news.news_id,title:this.news.title }});
    },
    pageChange(num){
      this.page = parseInt(num);
      this.getDetails(this.$route.query.news_id)
    }
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
  .details{
    background: #fff;
    padding: 10px 26px;
    min-height: 800px;
  }
  .detailsTitle{
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin: 20px auto 15px auto;
    line-height: 32px;
  }
  /deep/.details_box div{
    width: 100%;
  }
  .detailscent{
    display: flex;
    justify-content: center;
    margin-bottom:20px ;
  }
  .pnext{
    position: absolute;
    bottom:0;
    left: 0;
    background-image: -webkit-linear-gradient(90deg,#fff,hsla(0,0%,100%,.99),hsla(0,0%,100%,.95),hsla(0,0%,100%,0));
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top:50px;
  }
  .pnext div{
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 15px;
  }
  .pnext div:hover span{
    color: red;
  }
  .paybuts{
    background: url(~@/assets/img/payc.png) no-repeat 50%;
    background-size: auto 100%;
    position: fixed;
    bottom:10px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow:rgba(0, 0, 0,.5);
  }
  .paybuts div{
    background: #333;
    border-radius: 12px;
    font-size: 12px;
    color: #d8b879;
    letter-spacing: 0;
    line-height: 24px;
    height: 24px;
    padding: 0 11px;
    margin-left: 10px;
    cursor: pointer;
    width: 48px;
    text-align: center;
  }
</style>