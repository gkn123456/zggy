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
        <ul class="booklistul" style="padding:0 10px;">
          <li v-for="(item,i) in list" :key="i" class="booklistLi">
            <div class="booklistLis" @click="getDetails(item.book_id)">
              <div class="booklistCover"><img :src="item.cover" alt=""></div>
              <div class="booklistCount">
                <div class="booklistCounts">
                  <div class="bookt">{{item.b_name}}</div>
                  <div>
                    <span style="color:red;font-size:16px;">￥{{item.s_price}}</span>
                    <span style="color:#ccc;text-decoration: line-through;font-weight:400;font-size:12px;">{{item.price}}</span>
                  </div>
                </div>
              </div>
            </div> 
          </li>
        </ul>
        <div class="pagebox">
          <Page :total="c" :page-size="size" size="small" show-total @on-change="pageChange" />
        </div>
        <div v-if="list == []" style="display:flex;justify-content: center;padding:90px 0;">
          <img src="~@/assets/img/noData.png" alt="">
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
    this.getList()
  },
  methods: {
    getList(){
      var _this = this;
      _this.$hapi.getBook({page:_this.page,size:_this.size}).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _this.list = data.data.list;
          _this.books = data.data;
          if(data.data.page == 1){
            _this.c = data.data.c
          }
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
    pageChange(num){
      this.spinShow = true;
      this.page = parseInt(num);
      this.getList()
    },
    getDetails(id){
      const _this = this;
      _this.$router.push({ path: '/books/detail', query: { book_id: id,type:0 }});
    },
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
  .booklistul{
    width: 100%;
    padding-top:10px;
    display: flex;
    flex-wrap: wrap;
    padding-right: 5px;
  }
  .booklistLi{
    width: 25%;
    overflow: hidden;
    padding:5px;
    box-sizing: border-box;
    height: 256px;
    cursor: pointer;
  }
  .booklistLis{
    width: 100%;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    border-radius: 5px;
    background: #fff;
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
  .bookt{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 56%;
  }
</style>