<template>
    <div>
        <Modal width="400" title="用户登录" v-model="loginmodal" :maskClosable="false" @on-logOk="logOk">
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
    </div>
</template>
<script>
    export default {
        data () {
            return {
                count: 0,
                loading: false,
                loginmodal: false,
                data: {},
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
            }
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
            }
        }
    }
</script>