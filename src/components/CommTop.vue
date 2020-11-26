<template>
<div style="background:#eeebe4;">
  <div id="header" style="display:flex;justify-content: space-between;align-items: center;">
    <Modal width="400" title="用户登录" v-model="loginmodal" :maskClosable="false" @on-logOk="logOk" ref="modal">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <div style="padding-left:30px;">
          <div>
            <FormItem prop="phone">
              <Input type="text" prefix="ios-phone-portrait"  v-model="formInline.phone" placeholder="手机号"/>
            </FormItem>
          </div>
          <div style="margin-top:20px;">
            <FormItem prop="code">
              <Input type="text" prefix="ios-text-outline" v-model="formInline.code" placeholder="验证码"/>
            </FormItem>
            <FormItem>
              <Button :loading="loading" @click="getCode">
                <span v-if="!loading">获取验证码</span>
                <span v-else>{{count}} s</span>
              </Button>
            </FormItem>
          </div>
        </div>
      </Form>
      <div slot="footer">
        <button type="ghost" size="large" @click="handleCanel" class="ivu-btn ivu-btn-text ivu-btn-large"><span>取消</span></button>
        <Button type="primary" size="large" @click="handleSubmit('formInline')">登录</Button>
      </div>
    </Modal>
    <div style="width:45%;">
      <img src="@/assets/img/logo.png" alt="" class="logo" style="width:100%;"/>
    </div>
    <div v-if="isLogin">
      <span v-if="data.heart==''" style="cursor: pointer;">
        <Tooltip :content="data.name">
            <Avatar :style="{background: '#7265e6'}">{{data.name}}</Avatar>
        </Tooltip>
      </span>
      <span v-else>
        <Avatar :src='data.heart' />
      </span>
      <Dropdown style="margin-left: 10px">
        <a href="javascript:void(0)">控制中心<Icon type="ios-arrow-down"></Icon></a>
        <DropdownMenu slot="list">
          <DropdownItem><a @click="jumpUser">个人中心</a></DropdownItem>
          <DropdownItem><a @click="loginOut">退出登陆</a></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div v-else @click="login" class="loginbuts">
      <Icon type="md-contact" style="font-size:17px;margin-right:5px;"/>
      登录
    </div>
  </div>
</div>
  
</template>
<script>
import tool from '@/libs/aes';
export default {
  name: 'CTop',
  data() {
    var show = false;
    var uid = localStorage.getItem('uid');
    if (uid != null) {
      show = true;
      // 获取userinfo
      this.loadUserInfo(parseInt(uid));
    }
    return {
      switchValue: true,
      count: 0,
      loginLoading: true,
      loading: false,
      loginmodal: false,
      data: {},
      isLogin: show,
      formInline: {
        phone: '',
        code: ''
      },
      ruleInline: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不正确', trigger: 'blur' },
          { type: 'string', min: 4, message: '验证码不正确', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    login() {
      this.loginmodal = true;
    },
    logOk() {
      if (1) {
        this.$refs.loginmodal.visible = true;
        this.loginLoading = false;
        this.login();
        return;
      }
      this.loginmodal = false;
    },

    handleCanel() {
      this.loginmodal = false;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.subLogin(this.formInline.phone, this.formInline.code);
        } else {
          this.$Message.error('请填写正确的数据');
        }
      });
    },

    getCode() {
      if (this.formInline.phone != '') {
        if (/^1[3456789]\d{9}$/.test(this.formInline.phone)) {
          if (!this.timer) {
            this.count = 60;
            this.getPhoneCode(this.formInline.phone);
            this.loading = true;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= 60) {
                this.count--;
              } else {
                this.loading = false;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);
          }
        } else {
          this.$Message.error('手机号格式不正确!');
        }
      } else {
        this.$Message.error('请先填写手机号码!');
      }
    },
    getPhoneCode(phone) {
      var _self = this;
      _self.$hapi.sendMsg({ mobile: phone }).then(
        function(response) {
          let data = response.data;
          if (data.code === 200) {
            _self.$Message.success(data.msg);
          } else {
            _self.$Message.error(data.msg);
          }
        },
        function(response) {
          _self.$Message.error(response.data.msg);
        }
      );
    },
    subLogin(phone, code) {
      var _self = this;
      _self.$hapi.login({ mobile: phone, code: code }).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.$Message.success(data.msg);
          localStorage.setItem('token', response.headers.authorization);
          localStorage.setItem('uid', response.headers.uid);
          _self.data = { name: data.data.name, heart: data.data.av }; // data.data.av
          _self.loginmodal = false;
          _self.isShow = false;
          window.location.reload();
        } else {
          _self.$Message.error(data.msg);
        }
      });
    },
    loadUserInfo(uid) {
      var _self = this;
      _self.$hapi.getUserInfo({ user_id: uid }).then(function(response) {
        let data = response.data;
        if (data.code === 200) {
          _self.data = { name: data.data.name, heart: data.data.av };
          _self.loginmodal = false;
          _self.isShow = false;
        } else {
          if (data.code === 100) {
            _self.loginOut();
          } else {
            _self.$Message.error(data.error);
          }
        }
      });
    },
    loginOut() {
      this.isLogin = false;
      this.data = {};
      localStorage.clear();
      window.location.reload();
    },
    jumpUser(){
      this.$router.push({ path: '/getUser'});
    }
  }
};
</script>
<style >
.ivu-select-dropdown {
  z-index: 1000;
}
.loginbuts{
  display:flex;align-items:center;
  cursor: pointer;
}
.loginbuts:hover{
  color: red;
}
</style>