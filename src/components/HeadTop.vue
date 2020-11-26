<template>
  <div class="layout" id="header" style="background:rgb(197, 112, 0);width:100%;">
    <div class="headview">
      <div class="headlogo">
        <img src="~@/assets/img/headtips.png" style="width:300px;" alt="">
      </div>
      <div class="headLeft">
        <ul class="headul" :style="'width:'+width">
          <li @click="handleSelect('home',-1,0)" class="headli" :style="navId == -1?'color: rgb(255, 369, 2)':''">网站首页</li>
          <li class="headli" v-for="(item, indexs) in list" :key="indexs" :name="item.nav_id" @click="handleSelect(item.tag,item.nav_id,item.child.list.length)">
            <Dropdown >
              <span :style="navId == item.nav_id?'color: rgb(255, 369, 2)':''">{{item.name}}</span>
              <DropdownMenu slot="list" v-if="item.child.list.length > 0" class="DropdownMenuul">
                <DropdownItem v-for="(items,i) in item.child.list" :key="i" class="DropdownMenuli">
                  <div @click="handleSelect(items.tag,items.nav_id,0)">{{items.name}}</div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import commons from '@/components/common.js';
export default {
  name: 'HeadTop',
  data() {
    return { 
      list: [], 
      show: 0,
      navId:localStorage.getItem('navId') == null?-1:localStorage.getItem('navId'),
      width:''
    };
  },
  created() {
    this.getNav();
    if (typeof this.$route.query.nav_id == 'undefined') {
      this.show = 0;
    } else {
      this.show = 1;
    }
  },
  methods: {
    handleSelect(tag,id,length) {
      if(length == 0){
        if(tag == 'home'){
          this.$router.push({ path: '/'});
        }else if(tag == 'book'){
          this.$router.push({ path: '/books'});
        }else if(tag == 'about'){
          this.$router.push({ path: '/about'});
        }else if(tag == 'vote'){
          this.$router.push({ path: '/voteList',query: { nav_id: id,type:0,vote:1}});
        }else{
          this.$router.push({ path: '/notice',query: { nav_id: id,type:0,vote:0}});
        }
        localStorage.setItem('navId', id)
        this.navId = localStorage.getItem('navId')
      }
    },
    getNav() {
      var _self = this;
      _self.$hapi.getNav().then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.list = data.data.list;
          if((data.data.list.length+1)%2 == 1){
            _self.width = ((data.data.list.length+2)/2)*85.1+'px'
          }else{
            _self.width = ((data.data.list.length+1)/2)*85.1+'px'
          }
        } else {
          _self.$Message.error(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="less">
  .headul{
    display: flex;
    flex-wrap: wrap;
  }
  .headli{
    display: flex;
    justify-content: center;
    margin-bottom:8px;
    width: 85px;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
  }
  .headli:hover{
    text-decoration: underline;
    color: rgb(255, 369, 2);
  }
  .DropdownMenuul{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .headlititle{
    display: flex;
    align-items: center;
  }
  .DropdownMenuli{
    width: 100%;
    margin: 0;
    text-align: right;
  }
  .DropdownMenuli div{
    width: 100%;
    height: 100%;
    text-align: center;
    color: #333;
  }
</style>