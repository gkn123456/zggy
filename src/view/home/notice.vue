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
        <ul class="listul" style="padding:0 10px;">
          <li v-for="(item,ind) in list.list" :key="ind" class="listLi" @click="getDetail(item.news_id)" style="font-size: 14px;">
            <div class="noticeTitle">
                <Icon type="md-list-box" class="iconstyle" style="font-size:16px;" />
                
                <span style="white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;">{{item.title}}</span>
            </div>
            <div class="noticeTime">[{{item.ct}}]</div>
          </li>
        </ul>
        <div class="pagebox" v-if="list.list.length > 0">
          <Page :total="c" :page-size="size" size="small" show-total @on-change="pageChange" />
        </div>
        <div v-if="list.list.length == 0" style="display:flex;justify-content: center;padding:90px 0;">
          <img src="~@/assets/img/noData.png" alt="">
        </div>
      </Content>
      <Sider hide-trigger width="230">
        <LeftView />
      </Sider>
    </Layout>
    <Member ref="member" type="0" />
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
      c:'',
      size:10,
      spinShow:true,
    };
  },
  created() {
    this.loadNews(this.$route.query.nav_id);
  },
  methods: {
    loadNews(nav_id) {
      var _self = this;
      _self.$hapi.loadNews({ nav_id: parseInt(nav_id), show: true, n_cid: 0, size: _self.size, page:_self.page }).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.list = data.data;
          for(var i =0 ;i<_self.list.list.length;i++){
            _self.list.list[i].ct = commons.formatDate(_self.list.list[i].ct)
          }
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
        setTimeout(function(){
          _self.spinShow = false;
        },300)
      });
    },
    pageChange(num){
      this.spinShow = true;
      this.page = parseInt(num);
      this.loadNews(this.$route.query.nav_id)
    },
    getDetail(id){
      const _this = this;
      const vote =this.$route.query.vote==1?1:0;
      this.$router.push({ path: '/news/detail', query: { news_id:parseInt(id),vote:vote,backPath:'/notice?nav_id='+parseInt(this.$route.query.nav_id)+'&vote='+vote } });
    },
    getVoteList(){
      var _self = this;
      _self.$hapi.getVoteList({size: 10, next: 0}).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.list = data.data
        } else {
           _self.$Message.error(data.msg);
        }
      })
    },
  }
};
</script>
<style scorp>
@import '../../less/index.less';
  .listul{
    width: 100%;
    padding-top:10px;
    padding-right: 20px;
  }
  .listLi{
    width: 100%;
    display: flex;
    cursor: pointer;
    margin-bottom:5px;
  }
  .listLi:hover .noticeTitle{
      text-decoration: underline;
  }
  .noticeTitle{
    color:#333;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  .noticeTime{
    width:20%;
    text-align: right;
  }
  .pagebox{
    margin-top:20px;
  }
</style>