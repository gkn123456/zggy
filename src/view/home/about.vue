<template>
<div class="layout" id="index">
    <Layout>
        <Content style="position: relative;background:#fff;border-right:1px solid #ececec;">
            <div class="about">
                <div class="aboutTitle">
                    <Icon type="ios-contacts" />
                    联系我们
                </div>
                <div class="aboutView">
                    <div class="aboutViewli" style="background:#fcdfe1;">
                        <div>
                            <p>联系电话：<span style="color:blue;">010－6472 9151</span> </p>
                            <p>邮箱:zgcxcgk@163.com</p>
                            <p>地址:北京市朝阳区阜通东大街方恒国际中心D座</p>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
        <Sider hide-trigger width="230" style="background:#fff">
            <LeftView />
        </Sider>
    </Layout>
</div>
</template>
<script>
import LeftView from './leftView';
import commons from '@/components/common.js';
export default {
    components: {
        LeftView
    },
  name: 'foot'
};
</script>
<style lang="less">
@import '../../less/index.less';
    .aboutTitle{
        font-size: 20px;
        font-weight: bold;
        margin-top:20px;
    }
    .aboutView{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .aboutViewli{
        width: 90%;
        height: 200px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .aboutViewli div p{
        font-size: 15px;
        line-height: 30px;
        color:#333;
        font-weight: bold;
    }
</style>