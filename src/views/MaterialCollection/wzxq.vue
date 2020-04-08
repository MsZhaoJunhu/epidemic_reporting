<template>
    <div>
        <header class="aui-navBar aui-navBar-fixed">
            <a href="javascript:history.back(-1);" class="aui-navBar-item">
                <i class="icon icon-return"></i>
            </a>
            <div class="aui-center">
                <span class="aui-center-title">物资详情</span>
            </div>
            <a href="javascript:;" class="aui-navBar-item">
                <i class="icon icon-sys"></i>
            </a>
        </header>
        <div class="xx" v-for="item in itemDetailList">
            <div class="gs">
                <span>{{item.enterprise_name}}</span>
            </div>
            <div>
                <div class="lxr">
                    <span>联系人</span>
                    <span style="padding-left:45px;">{{item.contacts}}</span>
                </div>
                <div class="lxdh">
                    <span>联系电话</span>
                    <span style="padding-left:32px;">{{item.contact_mobile}}</span>
                </div>
                <div class="shdz">
                    <span>收货地址</span>
                    <span style="padding-left:32px;">{{item.address}}</span>
                </div>
            </div>
        </div>
        <div class="gg" v-for="(item,index) in itemDetailList" :key="index">
            <div class="wzxx">
                <div><span>物资名称</span></div>
                <div  style="width:110px;"><span>规格</span></div>
                <div><span>数量</span></div>
            </div>
            <div>
                <div class="kz" v-for="(a,index) in itemDetailList.goods_list" :key="index">
                    <div><span>{{a.goods_name}}</span></div>
                    <div class="a"><span>{{a.goods_specifications}}</span></div>
                    <div><span>{{a.number}}</span></div>
                </div>
                <!-- <div class="fhf">
                    <div><span>防护服</span></div>
                    <div class="a"><span>GB 19082-2003</span></div>
                    <div><span>50套</span></div>
                </div>
                <div class="twq">
                    <div><span>体温枪</span></div>
                    <div class="a"><span></span></div>
                    <div><span>100把</span></div>
                </div>
                <div class="yyst">
                    <div><span>医用手套</span></div>
                    <div class="a"><span>灭菌,GB 10213-2006</span></div>
                    <div><span>500双</span></div>
                </div>
                <div class="xdyp">
                    <div><span>消毒用品</span></div>
                    <div class="a"><span>75%酒精</span></div>
                    <div><span>800瓶</span></div>
                </div>
                <div class="jzsj">
                    <span>2020-03-01截止</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:["itemDetailList"],
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.load()
    },
    comments:{
        load(){
            console.log(this.itemDetailList);
        }
    }
}
</script>

<style lang="scss" scoped>
.xx{
    width: 390px;
    height: 150px;
    background-color: cadetblue;
    margin: 10px 10px;
    border-radius: 5px;
    .gs{
        border-bottom: 0.1px solid silver;
        padding: 10px 15px;
    }
    .lxr,.lxdh,.shdz{
        padding: 5px 15px;
        span{
            font-size: 14px;
        }
    }
}
.gg{
    // width: 390px;
    border: 1px solid silver;
    border-radius: 10px;
    margin: 10px 10px;
    .wzxx{
        display: flex;
        justify-content: space-between;
        padding: 10px 10px;
        background-color:deepskyblue;
        span{
            font-size: 14px;
        }
    }
    .kz,.fhf,.twq,.yyst,.xdyp{
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        .a{
            width: 185px;
        }
        span{
            font-size: 14px;
        }
    }
    .jzsj{
        padding: 10px 0 10px 260px;
    }
}
</style>