<style>
  .codeimg{
    display: flex;
    justify-content: center;
  }
</style>
<template>
  <div class="layout" id="index">
    <Modal
        v-model="codeShow"
        title="阅读须知"
        :lock-scroll="true"
        :closable="false"
        :mask-closable="false">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>阅读须知</span>
        </p>
        <p style="margin-bottom:20px;font-weight:bold;color:red;">需先登录，扫码付费后阅读全文</p>
        <div class="codeimg">
          <img src="~@/assets/img/code.jpg" alt="" style="width:200px;height:200px;">
        </div>
        <div slot="footer">
          <Button size="large" :loading="modal_loading" @click="cancel">取消</Button>
            <Button type="error" size="large" :loading="modal_loading" @click="ok">确定</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'member',
  props:['type'],
  data() {
    return { 
      list: [],
      codeShow:false,
      isprice:false,
      modal_loading:false
    };
  },
  created(){
    
  },
  methods:{
    isprices(){
      const _self =this;
      const uid =localStorage.getItem('uid');
      if(!_self.isprice){
        _self.codeShow = true
      }
      if(uid == null){
         _self.$Message.error('需先登录才能阅读详情');
      }
    },
    cancel(){
      this.codeShow = false
    },
    ok(){}
  }
};
</script>