<template>
  <div class="layout">
    <!-- <vHeader /> -->
    <Layout id="index">
      <Content class="cotent" style="position: relative;background:#fff;">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div style="display:flex;">
          <Breadcrumb>
            <BreadcrumbItem to="/"> <Icon type="ios-home-outline"></Icon>首页</BreadcrumbItem>
            <BreadcrumbItem><Icon type="logo-buffer"></Icon>申报表下载</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div v-html="d.des" style="padding:0 16px;"></div>
        <div id="top" name="top">
          <Button icon="ios-download-outline" type="primary" @click="download">点击下载申报表</Button>
        </div>
      </Content>
      <Sider hide-trigger width="230" style="background:#fff">
        <LeftView />
      </Sider>
    </Layout>
    <Login ref="Logins" />
  </div>
</template>
<script>
import LeftView from './leftView';
import Login from './Login';
import commons from '@/components/common.js';
export default {
  components: {
    LeftView,Login
  },
  data() {
    return {
      islogin:false,
      list: {},
      page:1,
      c:'',
      size:10,
      spinShow:true,
      d:''
    };
  },
  created() {
    this.loadNews();
    this.is()
  },
  methods: {
    loadNews(nav_id) {
      var _self = this;
      _self.$hapi.getDedetail({}).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.d = data.data
      
        } else {
          _self.$Message.error(data.msg);
        }
        setTimeout(function(){
          _self.spinShow = false;
        },300)
      });
    },
    download(){
      var _self = this;
      _self.$hapi.download({}).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          window.open(data.data.url)
        } else {
          _self.$Message.error(data.msg);
          if(data.code === 100||data.code === 101){
            commons.loginOut();
            _self.$refs.Logins.login()
          }
        }
      });
    },
    is(){
      if(window.location.href.indexOf("#top") > -1) {
        
      }else{
        window.location.href = window.location.href+'#top'
      }
    },
    top(){
      document.querySelector("#top").scrollIntoView(true);
    }
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
  #top{
    padding:10px 0;
  }
</style>