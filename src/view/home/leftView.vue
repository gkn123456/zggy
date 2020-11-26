<style>
@import '../../less/index.less';
  .leftImg{
    margin:10px 0;
  }
</style>
<template>
      <Sider hide-trigger width="230" style="background:#fff">
        <ul class="left_sider">
          <li style="display:flex;justify-content: space-between;align-items:center;">
            <p class="moreP" style="display:flex;align:items;font-size:15px;">
              <Icon type="ios-mail" class="iconstyle" />
              结果发布
            </p>
            <Icon class="more" type="ios-arrow-dropright" @click="more(nav_id)"/>
          </li>
          <li style="margin-top:10px;" v-for="(item,ind) in list" :key="ind">
            <div class="left_sideroneli">
              <div class="left_sideronelis"></div>
              <div class="left_sideroneli_des" @click="godetails(item.news_id)">{{item.title}}</div>
            </div>
          </li>
        </ul>
        <ul class="left_sider">
          <li>
            <p class="moreP" style="display:flex;align:items;font-size:15px;">
              <Icon type="md-search" class="iconstyle" />快速搜索
            </p>
          </li>
          <li>
            <router-link v-for="(item, indx) in clist" :key="indx" :to="{path:'/noticeC',query: {nav_id: item.n_cid,type:0,vote:0}}">{{item.name}}</router-link>
          </li>
        </ul>
        
        <ul class="left_sider" style="border-bottom:none;">
          <li>
            <div class="loadbuts">
              <!-- <div class="loadbut" @click="getdownload">申报表下载</div> -->
              <img @click="getdownload" class="loadbut" src="~@/assets/img/sq1.png" alt="">
            </div>
          </li>
        </ul>
        <ul class="left_sider" style="border-bottom:none;">
          <li>
            <p class="moreP" style="display:flex;align:items;font-size:15px;">
              <Icon type="ios-people" class="iconstyle" />申报对象
            </p>
          </li>
          <li style="margin-top:10px;">
            工业企业（机械、汽车、电力、能源、材料、化工、电子、轻工、纺织、食品、医药、航空、航天、军工、建材等）；工业高校；服务于工业企业的银行、税务、园区、邮政、设计、施工、建筑、咨询、销售、交通运输等单位；
          </li>
        </ul>
        <ul class="left_sider">
          <li>
            <p class="moreP" style="font-size:15px;">
              <Icon type="md-git-commit" class="iconstyle" />在线提交
            </p>
          </li>
          <li>
            <div class="loadbuts">
              <!-- <div class="loadbut1">网上提交案例</div> -->
              <img class="loadbut" @click="getdownload" src="~@/assets/img/sq2.png" alt="">
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;申报单位请登录中国工业企业创新成果库（http://zgcxcgk.com） “第二届中国工业企业管理创新成果申报”页面，按相关要求， 把申报的创新成果和论文电子版以及相关申报表电子版发送至电子邮箱：gqcxalsb@163.com
            </div>
            
          </li>
        </ul>
        <ul class="bannerbox">
          <!-- <img class="adImg" v-for="(itemimg,ids) in adlist" v-if="itemimg.loc == 2" :key="ids" :src="itemimg.cover" /> -->
          <li v-for="(itemimg,ids2) in adlist" v-if="itemimg.loc == 4" :key="ids2" @click="getlink(itemimg.type,itemimg.t_url)">
            <img :src="itemimg.cover" alt="" class="banner">
          </li>
        </ul>
      </Sider>
</template>
<script>
export default {
  data() {
    return {
      clist: [],
      value2: 0,
      adlist:[],
      list:[],
      nav_id:''
    };
  },
  created() {
    this.getClass()
    this.getAd()
    this.getNav()
  },
  methods: {
    getNav() {
      var _self = this;
      _self.$hapi.getNav().then(function(response) {
        let data = response.data;
        if (data.code === 200) {
           data.data.list.forEach(element => {
              if(element.tag == 'result'){
                _self.loadNews(element.nav_id)
                _self.nav_id = element.nav_id
              }
           });
          
        } else {
          _self.$Message.error(data.msg);
        }
      });
    },
    loadNews(nav_id) {
      var _self = this;
      _self.$hapi.loadNews({ nav_id: parseInt(nav_id), show: true, n_cid: 0, size:4, page:1}).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.list = data.data.list;
        } else {
          _self.$Message.error(data.msg);
        }
      });
    },
    more(id){
      this.$router.push({ path: '/notice', query: { nav_id:id,type:0,class:0 } });
    },
    getClass() {
      var _self = this;
      _self.$hapi.getClass().then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.clist = data.data.list;
        } else {
          _self.$Message.error(data.msg);
        }
      });
    },
    getdownload(){
      this.$router.push({ path: '/download' });
    },
    getAd(){
      var _self = this;
      _self.$hapi.getAd({source:1}).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.adlist = data.data.list
        } else {
          _self.$Message.error(data.msg);
        }
      });
    },
    godetails(id){
      this.$router.push({ path: '/news/detail', query: { news_id:parseInt(id),vote:0,backPath:''} });
    },
    getlink(type,url){
      type == 1?window.open(url):window.location.href = url;
    },
  }
};
</script>