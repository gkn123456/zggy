<template>
  <div class="layout">
    <Layout id="index">
      <div class="userView">
        <Tabs type="card" @on-click="tabsClass">
          <TabPane label="购买记录" name = "1">
            <Table stripe :columns="columns1" :data="data1.list" :loading="loading1"></Table>
            <div class="pagebox">
              <Page :total="c" :page-size="size" size="small" show-total @on-change="pageChange"/>
            </div>
          </TabPane>
          <TabPane label="浏览记录" name = "2">
            <Table stripe :columns="columns2" :data="data2.list" :loading="loading1"></Table>
            <div class="pagebox">
              <Page :total="c" :page-size="size" size="small" show-total @on-change="pageChange"/>
            </div>
          </TabPane>
          <TabPane label="下载记录" name = "3">
            <Table stripe :columns="columns3" :data="data3.list" :loading="loading1"></Table>
            <div class="pagebox">
              <Page :total="c" :page-size="size" size="small" show-total @on-change="pageChange"/>
            </div>
          </TabPane>
          <TabPane label="个人信息" name="4">
            <div class="userpullview">
              <div class="userpull">
                <div @click="modal1s" class="usertips1"><Icon type="md-cog" style="color:#fff;font-size:20px;margin-right:5px;" />编辑</div>
                <Modal
                  v-model="modal1"
                  title="编辑信息"
                  @on-ok="ok">
                    <div class="userDecount" style="padding:0;">
                      <Form ref="formInline" :model="formInline" inline>
                      <ul>
                        <li>
                          <div class="uCtitle">用户头像：</div>
                          <img :src="urlimg" alt="" style="width:30px;height:30px;margin-right:5px;">
                          <input class="file-input" type="file" v-on:change="upload" id="file" ref="file" prefix="ios-create-outline" />
                        </li>
                        <li>
                          <div class="uCtitle">用户昵称：</div>
                          <FormItem prop="name"><Input style="padding:0;margin:0;" type="text" v-model="formInline.name" /></FormItem>
                        </li>
                        <li>
                          <div class="uCtitle">姓名：</div>
                          <FormItem prop="r_name"><Input style="padding:0;margin:0;" type="text" v-model="formInline.r_name" /></FormItem>
                        </li>
                        <li>
                          <div class="uCtitle">性别：</div>
                          <FormItem prop="sex">
                            <Select v-model="formInline.sex" style="width:200px">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                          </FormItem>
                        </li>
                        <li>
                          <div class="uCtitle">生日：</div>
                          <FormItem prop="birthday">
                            <DatePicker @on-change="birthdaychange" format="yyyy-MM-dd" v-model="formInline.birthday" type="date" placeholder="出生日期" style="width: 200px"></DatePicker>
                          </FormItem>
                        </li>
                        <li>
                          <div class="uCtitle">个人简介：</div>
                          <FormItem prop="cont"><Input type="text" v-model="formInline.cont" /></FormItem>
                        </li>
                      </ul>
                      </Form>
                    </div>
                </Modal>
                <div class="userDeview">
                  <div class="userDeviewicon">
                    <Icon v-if="user.av==''" type="md-contact" style="font-size:100px;" />
                    <img :src="user.av" alt="" v-if="user.av!==''">
                  </div>
                  <div class="userDename">{{user.name}}<div :class="user.vip>0?'vip':'vips'"><span style="font-size:18px;">v</span></div></div>
                </div>
                <div class="userDecount">
                  <ul>
                    <li>
                      <div class="uCtitle">姓名：</div>
                      <div class="uCdesc">{{user.r_name?user.r_name:'- -'}}</div>
                    </li>
                    <li>
                      <div class="uCtitle">性别：</div>
                      <div class="uCdesc" v-if="user.sex == 0">未知</div>
                      <div class="uCdesc" v-if="user.sex == 1">男</div>
                      <div class="uCdesc" v-if="user.sex == 2">女</div>
                    </li>
                    <li>
                      <div class="uCtitle">联系电话：</div>
                      <div class="uCdesc">{{user.mobile}}</div>
                    </li>
                    <li>
                      <div class="uCtitle">生日：</div>
                      <div class="uCdesc">{{user.birthday?user.birthday:'- -'}}</div>
                    </li>
                    <li>
                      <div class="uCtitle">个人简介：</div>
                      <div class="uCdesc">{{user.cont?user.cont:'- -'}}</div>
                    </li>
                    <li>
                      <div class="uCtitle">会员有效期：</div>
                      <div class="uCdesc">{{user.exp_at?user.exp_at:'- -'}}</div>
                    </li>
                  </ul>
                </div>
              </div> 
            </div>
          </TabPane>
          <TabPane label="推荐阅读" name="5">
            <ul class="listul">
              <li v-for="(item,ind) in data4.list" :key="ind" class="listLi" @click="getDetail(item.news_id)">
                <div class="noticeTitle">
                    <Icon type="md-list-box" class="iconstyle" style="font-size:16px;" />
                    {{item.title}}
                </div>
                <div class="noticeTime"></div>
              </li>
            </ul>
          </TabPane>
        </Tabs>
      </div>
    </Layout>
    <Login ref="Logins" />
  </div>
</template>
<script>
  import commons from '@/components/common.js';
  import Login from './Login';
  import * as qiniu from "qiniu-js";
export default {
  components: {
    Login
  },
  data() {
    return {
      loading1:true,
      modal1:false,
      list: [], 
      nav_id: 0,
      user:{
        av:''
      },
      columns1: [
        {title: '类目',key: 'name'},
        {title: '购买时间',key: 'ct',render: ( h, params ) => h( 'span', commons.formatDate(params.row.ct))},
      ],
      data1: [],
      columns2: [
        {title: '内容',key: 'name'},
        {title: '浏览时间',key: 'ct',render: ( h, params ) => h( 'span', commons.formatDate(params.row.ct))},
      ],
      data2: [],
      columns3: [
        {title: '下载内容',key: 'name'},
        {title: '下载时间',key: 'ct',render: ( h, params ) => h( 'span', commons.formatDate(params.row.ct))},
      ],
      data3: [],
      data4:[],
      uid:'',
      page:1,
      size:10,
      c:0,
      name:'',
      cityList:[
        {value:1,label:'男'},
        {value:2,label:'女'},
      ],
      formInline:{},
      img_token:'',
      birthday:'',
      urlimg:'',
      img_key:''
    };
  },
  created() {
    this.nav_id = this.$route.query.nav_id;
    this.uid=Number(localStorage.getItem('uid'));
    const uid = Number(localStorage.getItem('uid'));
    this.getUserInfo(uid);
    this.getRecord(1)
    this.qiniu()
  },
  methods:{
    pageChange(num){
      this.loading1 = true;
      this.page = parseInt(num);
      this.getRecord(this.name)
    },
    tabsClass(name){
      this.page = 1
      if(name == 1 ||name == 2||name == 3){
        this.getRecord(name)
        this.name = name
      }
      if(name == 4){
        this.getUserInfo(this.uid);
      }
      if(name == 5){
        this.detRec()
      }
    },
    getUserInfo(uid) {
      var _self = this;
      _self.$hapi.getUserInfo({ user_id: uid }).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.user = data.data
          _self.formInline = data.data
          _self.urlimg = data.data.av
        } else {
          if (data.code === 100||data.code === 101) {
            commons.loginOut();
            _self.$refs.Logins.login()
          } else {
            _self.$Message.error(data.msg);
          }
        }
      })
    },
    getRecord(name){
      var _self = this;
      const names = Number(name)
      _self.loading1 = true;
      _self.$hapi.getRecord({tag:names,size: _self.size, page: _self.page}).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          if(names== 1){
            _self.data1 = data.data
          }
          if(names== 2){
            _self.data2 = data.data
          }
          if(names== 3){
            _self.data3 = data.data
          }
          if(data.data.page == 1){
            _self.c = data.data.c
          }
        } else {
           _self.$Message.error(data.msg);
        }
        setTimeout(function(){
          _self.loading1 = false;
        },300)
      })
    },
    detRec(){
      var _self = this;
      _self.$hapi.getRec({size: 10, next: 0}).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.data4 = data.data
        } else {
           _self.$Message.error(data.msg);
           if (data.code === 100||data.code === 101) {
             commons.loginOut();
            _self.$refs.Logins.login()
          } 
        }
      })
    },
    getDetail(id){
      const _this = this;
      this.$router.push({ path: '/news/detail', query: { news_id: id,type:0,backPath:'/getUser' } });
    },
    modal1s(){
      this.modal1 = true
    },
    birthdaychange(a,b){
      this.formInline.birthday = a
      this.birthday = a
    },
    ok(){
      const _this = this;
      _this.$hapi.userEdit({sex:_this.formInline.sex,user_id:_this.uid,name:_this.formInline.name,r_name:_this.formInline.r_name,hear_icon:_this.img_key,birthday:_this.formInline.birthday,cont:_this.formInline.cont}).then(function(response) {
        let data = response.data;
        if(data.code == 200){
          _this.$Message.success(data.msg);
          _this.getUserInfo(_this.uid);
        }else{
          _this.$Message.error(data.msg);
        }
      })
    },
    qiniu(){
      const _this = this;
      _this.$hapi.getqiniuToken({}).then(function(response) {
        let data = response.data;
        _this.img_token = data.data.img_token
      })
    },
    upload(file) {   //file是选择的文件对象
      const _this= this;
      return new Promise((resolve, reject) => {
          let uptoken = _this.img_token;
          const files = _this.$refs.file.files[0];
          let key = new Date().getTime() + Math.random(1000) + files.name;   //这是上船后返回的文件名
          var config = {
              useCdnDomain: true,        //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
              region: qiniu.region.z1,      //选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域。  我这里是华东区
              domain: "http://img.zgcxcgk.com/", //配置好的七牛云域名  如   https://cdn.qniyun.com/
              chunkSize: 100,     //每个分片的大小，单位mb，默认值3
              forceDirect: true    //直传还是断点续传方式，true为直传
          };
          var putExtra = {
              fname: files.name,    //文件原始文件名
              params: {},
              mimeType: [] || null
              // ...config,
          };
          var observable = qiniu.upload(files, key, uptoken, putExtra, config);
          observable.subscribe({
              next: (result) => {
                  //主要用来展示进度
              },
              error: (err) => {
                  //上传错误后触发
                  reject(err)
              },
              complete: (result) => {
                  //上传成功后触发。包含文件地址。
                  this.urlimg = 'http://img.zgcxcgk.com/'+result.key
                  this.img_key = result.key
                  resolve(result)
                  
              },
          });
      })
    },
  }
};
</script>
<style>
@import '../../less/index.less';
  .userView{
    padding-top:20px;
  }
  .userpullview{
    width: 100%;
    padding:50px 20px 0 20px;
  }
  .userpull{
    width: 100%;
    height: 450px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0,.1);
    border-radius: 5px;
    position: relative;
  }
  /* .usertips{
    position: absolute;
    left: -6px;
    top:60px;
    width: 50px;
    height: 30px;
    background: #333;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    line-height: 30px;
    text-align: center;
  } */
  .usertips1{
    position: absolute;
    left: -6px;
    top:60px;
    width: 65px;
    height: 30px;
    background: #333;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .userDeview{
    position: absolute;
    top:-50px;
    left: 50%;
    margin-left: -50px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0,.1);
  }
  .userDeviewicon{
    width: 100%;
    height: 100%;
    line-height: 100px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .userDeviewicon img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  #file{
    /* position: absolute;
    bottom:0;
    right:0; */
  }
  .userDename{
    position: absolute;
    bottom:-28px;
    left: 50%;
    margin-left: -100px;
    width: 200px;
    text-align: center;
    font-size: 18px;
    color: #333;
    display: flex;
    justify-content: center;
  }
  .vip{
    margin-left: 10px;
    background: chartreuse;
    color: #fff;
    border-radius: 50%;
    width: 23px;
    height: 23px;
    font-size: 14px;
    line-height: 23px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0,.1);
  }
  .vips{
    margin-left: 10px;
    background: #ccc;
    color: #fff;
    border-radius: 50%;
    width: 23px;
    height: 23px;
    font-size: 14px;
    line-height: 23px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0,.1);
  }
  .userDecount{
    padding:130px 20px 0 50px;
  }
  .userDecount ul li{
    display: flex;
    margin-bottom: 10px;
    align-items: center;
  }
  .uCtitle{
    width: 90px;
    color: #333;
    text-align: left;
  }
  .pagebox{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .listul{
    width: 100%;
    padding-top:10px;
    padding-right: 20px;
  }
  .listLi{
    width: 100%;
    overflow: hidden;
    padding:5px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .listLi{
    width: 100%;
    display: flex;
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
  .ivu-form-item{
    margin: 0;
  }
</style>