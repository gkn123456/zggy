<template>
<div class="layout" id="index">
    <Layout>
        <Content style="position: relative;background:#fff;border-right:1px solid #ececec;">
            <Spin size="large" fix v-if="spinShow"></Spin>
            <div style="display:flex;padding:5px 10px;">
                <Button type="primary" icon="ios-redo-outline" @click="goback">返回</Button>
            </div>
            <div class="repage">
                <div v-if="ctype == 0||ctype == 2">
                    <div style="display:flex;margin-bottom:10px;">
                        <span>购买文档：{{title}}</span>
                    </div> 
                    <div style="display:flex;margin-bottom:10px;">
                        <span>文档价格：￥{{pay_price}}</span>
                        <span></span>
                    </div> 
                </div>
                <div v-if="ctype == 1">
                    <div style="text-align:left;">购买会员免费赠送文档</div>
                    <ul class="priceul">
                        <li @click="ps(index,item.vip_id)" v-for="(item,index) in vipList" :key="index">
                            <div class="priceulleft">{{item.moth}}个月</div>
                            <div class="priceulright">
                                <div>￥{{item.price}}</div>
                                <!-- <div>￥5.5 /月</div> -->
                            </div>
                            <div class="bottomimg" v-if="type == index"></div>
                        </li>
                    </ul> 
                </div>
                <div class="typeul">
                    <div>支付方式：</div>
                    <ul class="typeuls">
                        <li @click="ps1(0)" :class="pricetype == 0?'typesli1':'typesli2'">
                            <img src="~@/assets/img/alipay.svg" alt="">
                            支付宝支付
                            <div class="bottomimgs" v-if="pricetype == 0"></div>
                        </li>
                        <!-- <li @click="ps1(1)" :class="pricetype == 1?'typesli1':'typesli2'">
                            <img src="~@/assets/img/wechat.svg" alt="">
                            微信支付
                            <div class="bottomimgs" v-if="pricetype == 1"></div>
                        </li> -->
                    </ul>
                </div>
                <div>
                    <Button type="primary" @click="pays">立即支付</Button>
                </div>
                <div class="pricecount">
                    <!-- <img src="~@/assets/img/code.jpg" alt="" class="paytype"> -->
                    <div class="pricecounts">
                       <!-- <p>支付金额</p>
                       <div style="color:red;">
                           <span>¥</span>
                           <span style="font-weight:bold;font-size:20px;">99</span>
                       </div> -->
                    </div>
                </div>
            </div>
            <Login ref="Logins" />
        </Content>
        <Sider hide-trigger width="230">
            <LeftView />
        </Sider>
    </Layout>
</div>
</template>
<script>
import LeftView from './leftView';
import commons from '@/components/common.js';
import Login from './Login';
export default {
    components: {
        LeftView,Login
    },
    name: 'recharge',
    data() {
        return { 
            type:0,
            pricetype:0,
            ctype:0,
            pay_price:'',
            three_id:'',
            p_source:'',
            spinShow:false,
            vipList:null,
            vip_id:'',
            title:''
        };
    },
    created(){
        this.ctype = this.$route.query.type
        this.title = this.$route.query.title
        this.pay_price = this.$route.query.price
        this.three_id = this.$route.query.id
        if(this.$route.query.type == 0){
            this.p_source = 2
        }
        if(this.$route.query.type == 1){
            this.p_source = 1
        }
        if(this.$route.query.type == 2){
            this.p_source = 3
        }
        this.getVip()
        this.$router.afterEach((to, from, next) => {
            window.scrollTo(0, 0)
        })
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        ps(type,id){
            this.type = type
            this.vip_id = id
            
        },
        ps1(type){
            this.pricetype = type
        },
        getVip(){
            const _this = this;
            _this.spinShow = true;
            _this.$hapi.getVip({}).then(function(response) {
                let data = response.data;
                if(data.code == 200){
                    _this.vipList = data.data.list
                    if(_this.$route.query.type == 1){
                        _this.vip_id = data.data.list[0].vip_id
                    }
                }
                _this.spinShow = false;
            })
        },
        pays(){
            var _this = this;
            _this.spinShow = true;
            var ids= '';
            if(_this.$route.query.type == 1){
                ids = _this.vip_id

            }else{
                ids = _this.$route.query.id
            }
            _this.$hapi.orderPay({p_source:parseInt(_this.p_source),p_way:1,three_id:parseInt(ids)}).then(function(response) {
                let data = response.data;
                if(data.code == 200){
                    _this.spinShow = false;
                    console.log(data.data.data)
                    const url = 'https://openapi.alipay.com/gateway.do?'+data.data.data;
                    window.location.href = url
                }
                if(data.code === 100||data.code === 101){
                    commons.loginOut();
                    _this.$refs.Logins.login()
                    _this.spinShow = false;
                }
                
            });
        }
    }
};
</script>
<style lang="less">
@import '../../less/index.less';
    .repage{
        padding:20px;
    }
    .priceul{
        display: flex;
        width: 100%;
        margin-top:20px;
    }
    .priceul li{
        background: url(~@/assets/img/reg.png) no-repeat;
        background-size: 100% 100%;
    }
    .priceul li{
        display: flex;
        width: 25%;
        height: 90px;
        border:2px solid #ececec;
        margin-right: 20px;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        color: #fff;
    }
    .bottomimg{
        width: 28px;
        height: 24px;
        background-image: url(~@/assets/img/bottom.svg),none;
        position: absolute;
        right: -2px;
        bottom: -1px;
    }
    .priceul li:hover{
        border:2px solid #D7B779;
    }
    .priceulleft{
        width:15%;
        height:100%;
        border-right:1px solid #ececec;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        font-weight: bold;
    }
    .priceulright{
        width: 85%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
    }
    .priceul li:first-child .priceulright div{
        color: #fff;
    }
    .priceul li:first-child .priceulleft{
        color: #fff;
    }
    .priceulright div:first-child{
        font-weight: 700;
        line-height: 35px;
        font-size: 18px;
    }
    // .priceulright div:last-child{
    //     color: #999;
    //     text-decoration: line-through;
    //     font-size: 16px;
    // }
    .typeul{
        display: flex;
        align-items: center;
        margin-top:20px;
    }
    .typeuls{
        display: flex;
    }
    .typeuls li{
        width: 100px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-right: 20px;
        cursor: pointer;
    }
    .typeuls li img{
        width: 20px;
        margin-right: 5px;
    }
    .typesli1{
        border:1px solid #D7B779;
    }
    .typesli2{
        border:1px solid #ececec;
    }
    .bottomimgs{
        width: 24px;
        height: 20px;
        background-image: url(~@/assets/img/bottom.svg),none;
        position: absolute;
        right: -1px;
        bottom: -1px;
    }
    .pricecount{
        width: 100%;
        background: #F8F8F8;
        border-radius: 4px;
        margin-top:20px;
        display: flex;
    }
    .paytype{
        width: 200px;
    }
    .pricecounts{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>