<template>
  <div class="layout">
    <!-- <vHeader /> -->
    <Layout id="index">
      <Content class="cotent" style="position: relative;background:#fff;border-right:1px solid #ececec;">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div style="display:flex;">
          <Breadcrumb>
            <BreadcrumbItem to="/"> <Icon type="ios-home-outline"></Icon>首页</BreadcrumbItem>
            <BreadcrumbItem><Icon type="logo-buffer"></Icon>列表</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <ul class="newslistul" style="padding:0 10px;">
          <li v-for="(obj,ind) in list.list" :key="ind" class="newslistLi">
            <div class="newslistLis" @click="getDetails(obj.news_id)" style="font-size: 14px;">
              <div class="listCover">
                <img :src="obj.cover" v-if="obj.cover" alt="">
              </div>
              <div class="listCount">
                <div class="listCounts">
                  <div style="color:red;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{obj.title}}</div>
                  <span>{{obj.des}}</span>
                </div>
              </div>
            </div> 
          </li>
        </ul>
        <div class="pagebox" v-if="list.list.length > 0" >
          <Page :total="c" :page-size="size" size="small" @on-change="pageChange" show-total/>
        </div>
        <div v-if="list.list.length == 0" style="display:flex;justify-content: center;padding:90px 0;">
          <img src="~@/assets/img/noData.png" alt="">
        </div>
      </Content>
      <Sider hide-trigger width="230">
        <LeftView />
      </Sider>
    </Layout>
    <Member ref="member" type="1" />
    <Login ref="Logins" />
  </div>
</template>
<script>
import LeftView from './leftView';
import Member from './member';
import Login from './Login';
import commons from '@/components/common.js';
export default {
  components: {
    LeftView,Member,Login
  },
  data() {
    return { 
      list:{list:[]},
      page:1,
      size:10,
      c:0,
      spinShow:true,
    };
  },
  created() {
    this.$route.query.class == 0?this.loadNews(this.$route.query.nav_id):this.loadNews1(this.$route.query.n_cid)
  },
  methods: {
    loadNews(nav_id) {
      var _self = this;
      _self.$hapi.loadNews({ nav_id: parseInt(nav_id), show: true, n_cid: 0, size: _self.size, page:_self.page }).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.list = data.data;
          if(data.data.page == 1){
            _self.c = data.data.c
          }
        } else {
          _self.$Message.error(data.msg);
          if(data.code === 100||data.code === 101){
            commons.loginOut();
            _self.$refs.Logins.login()
          }
        }
        setTimeout(function(){_self.spinShow=false;},200)
      });
    },
    loadNews1(n_cid) {
      var _self = this;
      _self.$hapi.loadNews({ nav_id: 0, show: true, n_cid: parseInt(n_cid), size: _self.size, page:_self.page }).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.list = data.data;
          if(data.data.page == 1){
            _self.c = data.data.c
          }
        } else {
          _self.$Message.error(data.msg);
          if(data.code === 100||data.code === 101){
            commons.loginOut();
            _self.$refs.Logins.login()
          }
        }
        setTimeout(function(){_self.spinShow=false;},200)
      });
    },
    pageChange(num){
      this.spinShow = true;
      this.page = parseInt(num);
      this.$route.query.class == 0?this.loadNews(this.$route.query.nav_id):this.loadNews1(this.$route.query.n_cid)
    },
    getDetails(id){
      const _this = this;
      const q= _this.$route.query.class == 0?'nav_id='+_this.$route.query.nav_id:'n_cid='+_this.$route.query.n_cid
      _this.$router.push({ path: '/news/detail', query: { news_id: id,type:0,backPath:'/news?'+q+'&class='+_this.$route.query.class+'&type='+_this.$route.query.type } });
    },
  }
};
</script>
<style>
@import '../../less/index.less';
  .listCover{
    width:100%;
    height: 140px;
    border:1px solid #ececec;
  }
  .listCover img{
    width: 100%;
    height: 100%;
  }
  .newslistul{
    width: 100%;
    padding-top:10px;
    display: flex;
    flex-wrap: wrap;
    padding-right: 5px;
  }
  .newslistLi{
    width: 33.3%;
    overflow: hidden;
    padding:5px;
    box-sizing: border-box;
    background: #fff;
    height: 230px;
    cursor: pointer;
  }
  .newslistLis{
    width: 100%;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    border-radius: 5px;
  }
  .listCount{
    width: 100%;
    height: 80px;
    padding:10px;
    box-sizing: border-box;
  }
  .listCounts{
    width: 100%;
    height: 100%;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 20px;
  }
  .listCounts:hover span:last-child{
    text-decoration: underline;
  }
  .pagebox{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding-right: 10px;
  }
</style>