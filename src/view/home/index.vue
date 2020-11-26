<style>
@import '../../less/index.less';
  .leftImg{
    margin:10px 0;
  }
  .sf_li{
    width: 20%;height:35%;border:1px solid #ececec;display:flex;
    align-items: center;
    justify-content: center;margin-right:10px;
    border-radius: 5px;
    overflow: hidden;
  }
  .sf_li1{
    width: 18%;
    height:20px;
    display: flex;
    align-items: center;
    margin-bottom:8px;
    margin-right: 5px;
  }
  .sf_li1:hover{
    text-decoration: underline;
  }
  .sf_li1_line{
    width: 3px;
    height: 3px;
    background: red;
    border-radius: 50%;
    margin-right: 8px;
  }
  .sf_li:hover{
    transform: scale(1.08);
    transition: all .6s;
  }
</style>
<template>
  <Layout>
    <!-- <vHeader /> -->
    <Layout id="index">
      <Content style="background:#fff;">
          <div v-for="(item, is) in list" :key="is" v-if="item.info.tag !== 'paper'&&item.info.tag !== 'achiev'&&item.info.tag !== 'links'&&item.info.tag !== 'base'">    
            <div class="topUl">
              <Card style="height:100%;">
                <div class="moreP" style="display: flex;align-items: center;justify-content: space-between;">
                  <div style="display: flex;align-items: center;">
                    <Icon type="ios-list" style="font-size:20px;" />
                    <span>{{item.info.name}}</span>
                  </div>
                  <Icon class="more" type="ios-arrow-dropright" v-if="item.child.length>0" @click="more(item.info.nav_id)" />
                </div>
                <ul>
                  <li v-for="(obj,ind) in item.child" :key="ind">
                    <div style="margin-top:10px;" @click="getDetails(obj.news_id)" v-if="ind == 0">
                      <div class="img" v-if="obj.cover">
                        <img :src="obj.cover" />
                      </div>
                      <div>
                        <p class="viewTitle">{{obj.title}}</p>
                        <div class="viewDes">
                          {{obj.des}}
                          <span class="moretybtn" style="color:red" v-if="obj.des!==''">[详细]</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
          <div v-for="(item, index1) in list" :key="index1+'ce'">
            <div v-if="item.info.tag == 'achiev'">
              <img class="adImg" v-for="(itemimg,ids) in adlist" :key="ids" :src="itemimg.cover" @click="getlinks(itemimg.type,itemimg.t_url)" v-if="itemimg.loc == 1" style="cursor: pointer;" />
            </div>
            <div v-if="item.info.tag == 'achiev'">
              <div class="booktitleBox">
                <div class="bookcount" style="position:relative;">
                  <div class="bookcount_left" style="height:auto;">
                    <div class="bookcount_lefts">
                      <span>优</span><span>秀</span><span>成</span><span>果</span>
                    </div>
                  </div>
                  <div class="sful">
                     <div class="morelist" v-if="item.child.length>0">
                      <Button @click="more1(item.info.nav_id)">More</Button>
                    </div>
                    <div v-for="(obj,i) in item.child" :key="i" class="bookcount_rightli" @click="getDetails(obj.news_id)" v-if="i<10">
                      {{obj.title}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="item.info.tag == 'paper'">
              <div class="booktitleBox">
                <div class="bookcount" style="position:relative;">
                  <div class="bookcount_left">
                    <div class="bookcount_lefts">
                      <span>优</span><span>秀</span><span>论</span><span>文</span>
                    </div>
                  </div>
                  <div class="sful">
                    <div class="morelist" v-if="item.child.length>0">
                      <Button @click="more1(item.info.nav_id)">More</Button>
                    </div>
                    <li v-for="(obj,i3) in item.child" :key="i3" v-if="i3<5" class="bookcount_rightli" @click="getDetails(obj.news_id)">
                      {{obj.title}}
                    </li>
                  </div>
                </div>
              </div>
            </div>
            <div style="width:100%;" v-if="item.info.tag == 'paper'">
              <img class="adImg" v-for="(itemimg,ids1) in adlist" :key="ids1" v-if="itemimg.loc == 2" :src="itemimg.cover" @click="getlinks(itemimg.type,itemimg.t_url)" style="cursor: pointer;" />
            </div>
          </div>
          <div v-for="(item, index2) in list" :key="index2+'ct'">
            <div v-if="item.info.tag == 'base'">
              <div class="booktitleBox">
                <div class="bookcount">
                  <div class="bookcount_left">
                    <div class="bookcount_lefts" style="height:200px;">
                      <span>创</span><span>新</span><span>调</span><span>研</span><span>示</span><span>范</span><span>基</span><span>地</span>
                    </div>
                  </div>
                  <ul style="width:88%;">
                    <li class="sf_li" v-for="(item,i1) in logoList" :key="i1" v-if="i1<9" style="" @click="getlinks(item.type,item.url)">
                      <img class="logosimg" :src="item.img"/>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-if="item.info.tag == 'links'">
              <div class="booktitleBox">
                <div class="bookcount">
                  <div class="bookcount_left">
                    <div class="bookcount_lefts">
                      <span>友</span><span>情</span><span>链</span><span>接</span>
                    </div>
                  </div>
                  <ul style="width:88%;">
                    <li class="sf_li1" v-for="(item,i2) in logoList1" :key="i2" v-if="i2<25" @click="getlinks(item.type,item.url)">
                      <div class="sf_li1_line"></div>
                      
                      <span style="white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;">{{item.name}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </Content>
      <Sider hide-trigger width="230" style="background:#fff">
        <LeftView />
      </Sider>
    </Layout>
    <Member ref="member" type="0" />
  </Layout>
</template>
<script>
import Member from './member';
import LeftView from './leftView';
export default {
  components: {
    Member,LeftView
  },
  data() {
    return {
      list: [],
      logoList:[],
      logoList1:[],
      clist: [],
      value2: 0,
      adlist:[]
    };
  },
  created() {
    this.getINav();
    this.getLink();
    this.getAd()
    localStorage.setItem('navId', -1)
  },
  methods: {
    loadDetail(name) {
      window.open(this.$router.resolve({ name: '/news/detail', query: { news_id: parseInt(name) } }).herf, '_blank');
    },
    getINav() {
      var _self = this;
      _self.$hapi.getINav().then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          var res = data.data;
          if (res.list && res.list.length) {
            res.list.map((item, index) => {
              let val = { info: {}, child: [] };
              val.info = item;
              if (item.nav_id > 0) {
                _self.getChild(index, item.nav_id, val);
              }
              _self.list.push(val);
            });
          }
        } else {
          _self.$Message.error(data.msg);
        }
      });
    },
    getChild(index, nid, val) {
      var _self = this;
      _self.$hapi.loadNews({ nav_id: parseInt(nid), n_cid: 0, size: 15, next: 0 }).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          val.child = data.data.list;
        }
      });
    },
    getLink(){
      var _self = this;
      _self.$hapi.getLink({tag:2}).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.logoList = data.data.list;
        }
      });
      _self.$hapi.getLink({tag:1}).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.logoList1 = data.data.list;
        }
      });
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
    getlinks(type,url){
      type == 1?window.open(url):window.location.href = url;
    },
    getDetails(id){
      this.$router.push({ path: '/news/detail', query: { news_id: id,type:0 } });
    },
    more(id){
      this.$router.push({ path: '/news', query: { nav_id:id,type:0,class:0 } });
    },
    more1(id){
      this.$router.push({ path: '/notice', query: { nav_id:id,type:0,class:0 } });
    },
  }
};
</script>