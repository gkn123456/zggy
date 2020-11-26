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
        <ul class="votelistul" style="padding:0 10px 0 30px;margin-top:20px;">
          <li class="votelistLi" v-for="(item,index) in list.list" :key="index" @click="getDetail(item.news_id)">
            <div class="votelistLis">
                <span>申报单位：</span>
                <div class="votelistLis_d">{{item.cp?item.cp:'- -'}}</div>
            </div>
            <div class="votelistLis">
                <span>申报主题：</span>
                <div class="votelistLis_d">
                  <Tooltip :content="item.title" placement="bottom" max-width="200" style="width:100%;">
                    <div style="width:100%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
                        {{item.title?item.title:'- -'}}
                    </div>
                  </Tooltip>
                </div>
            </div>
            <div class="votelistLis">
                <span>申报类型：</span>
                <div class="votelistLis_d">{{item.type?item.type:'- -'}}</div>
            </div>
            <div class="votelistLis">
                <span>主创人：</span>
                <div class="votelistLis_d">{{item.author?item.author:'- -'}}</div>
            </div>
            <div class="votelistLis">
                <span>参与人：</span>
                <div class="votelistLis_d">{{item.c_author?item.c_author:'- -'}}</div>
            </div>
            <div class="votelistLis">
                <span>内容概要：</span>
                <div class="votelistLis_d">
                  <Tooltip :content="item.des" placement="bottom" max-width="200" style="width:100%;">
                    <div style="width:100%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
                        {{item.des?item.des:'- -'}}
                    </div>
                  </Tooltip>
                </div>
            </div>
            <div class="votelistLis" style="display:flex;justify-content: space-between;">
                
              <Button type="primary" @click.stop="vote(item.news_id)" class="voteBut" :disabled="item.is_vote">
                <span style="color:#fff;" v-if="item.is_vote == false">投票</span>
                <span style="color:#ccc;" v-if="item.is_vote == true">已投票</span>
              </Button>
            <div style="display:flex;align-items:center;">
              <span>票数：</span>
                <div class="votelistLis_d">{{item.vc}}票</div>
            </div>
            </div>
            
            <!-- <Icon class="votemore" type="ios-arrow-dropright" @click="getDetail(item.news_id)" /> -->
          </li>
        </ul>
        <div class="pagebox">
          <Page :total="c" :page-size="size" size="small" show-total @on-change="pageChange" />
        </div>
        <div v-if="list == []" style="display:flex;justify-content: center;padding:90px 0;">
          <img src="~@/assets/img/noData.png" alt="">
        </div>
        <login ref="Logins" />
      </Content>
      <Sider hide-trigger width="230" style="background:#fff">
        <LeftView />
      </Sider>
    </Layout>
  </div>
</template>
<script>
import LeftView from './leftView';
import Member from './member';
import login from './Login';
import commons from '@/components/common.js';
export default {
  components: {
    LeftView,Member,login
  },
  data() {
    return { 
      list: [],
      books:'',
      page:1,
      size:10,
      c:0,
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
    vote(id){
      var _this = this;
      _this.spinShow = true;
      _this.$hapi.getVote({three_id:parseInt(id)}).then(function(response) {
        let data = response.data;
        if(data.code == 200){
            _this.$Message.success(data.msg);
            _this.loadNews(_this.$route.query.nav_id)
        }else{
          _this.$Message.error(data.msg);
        }
        setTimeout(function(){
          _this.spinShow = false;
        },300)
        if(data.code === 100||data.code === 101){
            commons.loginOut();
            setTimeout(function(){
                _this.$refs.Logins.login()
            },400)
            
        }
      });
    },
    pageChange(num){
      this.spinShow = true;
      this.page = parseInt(num);
      this.loadNews(this.$route.query.nav_id);
    },
    getDetail(id){
      const _this = this;
      this.$router.push({ path: '/news/detail', query: { news_id:parseInt(id),vote:0,backPath:'/voteList?nav_id='+parseInt(this.$route.query.nav_id)+'&vote=0'} });
    },
    sethead(){
        localStorage.setItem('navId', -1)
    }
  }
};
</script>
<style>
@import '../../less/index.less';
  .booklistCover{
    width:100%;
    height: 200px;
    border:1px solid #ececec;
  }
  .booklistCover img{
    width: 100%;
    height: 100%;
  }
  .votelistul{
    width: 100%;
    padding-top:10px;
    display: flex;
    flex-wrap: wrap;
    padding-right: 5px;
  }
  .votelistLi{
    width: 45%;
    /* overflow: hidden; */
    padding:5px;
    box-sizing: border-box;
    height: 210px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    border-radius: 5px;
    background: #fff;
    position: relative;
    padding: 10px;
    margin-right: 30px;
    margin-bottom:20px;
    padding-right: 10px;
  }
  .votelistLi:nth-child(even){
      margin: 0;
  }
  .voteBut{
  }
  .votelistLis{
      display: flex;
      margin-bottom:5px;
      width:100%;
  }
  .votelistLis span{
      font-size: 13px;
      color: #333;
      width: 80px;
      display: block;
  }
  .booklistCount{
    width: 100%;
    padding:5px 5px;
    box-sizing: border-box;
  }
  .booklistCounts{
    width: 100%;
    font-weight: bold;
    font-size: 14px;
    color:#333;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .booklistCounts:hover span:last-child{
    text-decoration: underline;
  }
  .pagebox{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding-right: 10px;
  }
  .votelistLis_d{
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    width: 86%;
    /* font-weight: bold; */
  }
  .bookt{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 56%;
  }
  .votemore{
      position: absolute;
      bottom:10px;
      right:10px;
      font-size: 20px;
  }
    .votemore:hover{
        font-size: 22px;
    }
</style>