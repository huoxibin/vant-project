<template>
    <div class="my-visitare-warpper">
        <!--header-->
        <div class="page-title">
            <router-link to="/home" class="close">
                <van-icon name="cross"/>
            </router-link>
            <div class="page-center">
                我的探访
            </div>
            <div class="search">
                <van-icon name="search"/>
            </div>
        </div>
        <!--tabs-->
        <div class="nav">
            <div :class="getActiveCls(0)" @click="changeTab(0)">待探访</div>
            <div :class="getActiveCls(1)" @click="changeTab(1)">已探访</div>
            <div :class="getActiveCls(2)" @click="changeTab(2)">已退回</div>
        </div>
        <!--list-->
        <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
            <div id="dataList">
                <div class="tab-card" v-for="(activity, index) in dataList" :key="index" @click="jumpTo(activity)">
                    <div class="tab-card-header center-item">
                        <div class="header-left item-left">
                            就诊日期:
                            {{activity.medicaldate}}
                        </div>
                        <div class="header-right item-right">
                            <van-icon name="arrow"/>
                        </div>
                    </div>
                    <div class="tab-card-center">
                        <div class="center-item">
                            <div class="item-left">姓 名:</div>
                            <div class="item-right">{{activity.name}}</div>
                        </div>
                        <div class="center-item">
                            <div class="item-left">医院名称:</div>
                            <div class="item-right">{{activity.hospitalname}}</div>
                        </div>
                        <div class="center-item">
                            <div class="item-left">任务号码:</div>
                            <div class="item-right">{{activity.caseno}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </mescroll-vue>

    </div>
</template>

<script>
    import tabCard from "@/viewers/myVisitare/components/tabCard";
    import {getWait,getAlready} from '@/api/myVisit';

    // 引入mescroll的vue组件
    import MescrollVue from 'mescroll.js/mescroll.vue'

    export default {
        name: "myVisitare",
        data() {
            return {
                mescrollUp: {
                    callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
                    page: {
                        num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                        size: 10 // 每页数据的数量
                    },
                    noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
                    toTop: {
                        src: '' // 回到顶部按钮的图片路径,支持网络图
                    },
                    empty: {
                        // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
                        warpId: 'dataList', // 父布局的id;
                        icon: '', // 图标,支持网络图
                        tip: '暂无相关数据~', // 提示
                        // btntext: '去逛逛 >', // 按钮,默认""
                        // btnClick () { // 点击按钮的回调,默认null
                        //   alert('点击了按钮,具体逻辑自行实现')
                        // }
                    },
                    htmlNodata: '<p class="upwarp-nodata">-- 无数据 --</p>', // 无数据的布局
                    lazyLoad: {
                        use: true // 是否开启懒加载,默认false
                    }
                },
                dataList: [], // 列表数据
                pdType:0,
            }
        },
        components: {
            tabCard, MescrollVue
        },
        mounted() {
        },
        methods: {
            //跳转
            jumpTo (row) {
                this.$router.push({
                    path: "/visitedEntering",
                    query: {
                        caseno: row.caseno
                    }
                });
            },

            mescrollInit (mescroll) {
                this.mescroll = mescroll
            },
            upCallback (page, mescroll) {
                // 模拟联网
                this.getListDataFromNet( this.pdType,page.num, page.size, (arr) => {
                    console.log(arr);
                    mescroll.endSuccess(arr.length);
                    if (page.num == 1) this.dataList = [];
                    this.dataList = this.dataList.concat(arr);
                    // 数据渲染成功后,隐藏下拉刷新的状态
                    this.$nextTick(() => {
                        mescroll.endSuccess(arr.length)
                    })
                }, () => {
                    // 联网异常,隐藏上拉和下拉的加载进度
                    mescroll.endErr()
                })
            },


            getListDataFromNet (pdType,pageNum, pageSize, successCallback, errorCallback) {
                console.log(pageNum, pageSize);
                // 延时一秒,模拟联网
                setTimeout(() => {
                    var listData = [];
                    //传参
                    let param = {
                        userCode:'beijing',
                        manageCom:'',
                        pageNo:pageNum,
                        pageSize:pageSize
                    };

                    if (pdType === 0) {//待探访
                        getWait(param).then(res=>{
                            let arr = res.data;
                            // 把请求到的数据添加到列表
                            listData.push(arr);
                            successCallback(...listData);
                        }).catch((e) => {
                            // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                            errorCallback&&errorCallback();
                        });
                    }else if(pdType == 1){//已探访
                        getAlready(param).then(res=>{
                            let arr = res.data;
                            listData.push(arr);
                            successCallback(...listData);
                        }).catch((e) => {
                            errorCallback&&errorCallback();
                        });
                    }else if(pdType ==2){//已退回

                    };
                }, 1000)
            },


            // 选中状态的样式
            getActiveCls (type) {
                return this.pdType === type ? 'active' : ''
            },
            // 切换菜单
            changeTab (type) {
                if (this.pdType !== type) {
                    this.pdType = type;
                    this.dataList = [];// 在这里手动置空列表,可显示加载中的请求进度
                    this.mescroll.resetUpScroll(); // 刷新列表数据
                }
            },

        }
    }
</script>

<style scoped lang="less">
    /*以fixed的方式固定mescroll的高度*/
    .mescroll {
        position: fixed;
        top: 80px;
        bottom: 0;
        height: auto;
    }

    .my-visitare-warpper {
        overflow-x: hidden;
        overflow-y: scroll;
        //title
        .page-title {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: 40px;
            line-height: 40px;
            background: @primary;
            color: #fff;
            padding: 0 .6rem;
            z-index: 9;
            .page-center {
                font-size: 14px;
            }
            .van-icon {
                font-size: 20px;
                height: 40px;
                line-height: 40px;
                color: #fff;
            }
        }

        //tabs切换
        .nav{
            margin-top: 40px;
            text-align: center;
            height: 40px;
            background: #fff;
            display: flex;
            justify-content: space-around;
        }
        .nav > div{
            display: inline-block;
            width: 22%;
            line-height: 36px;
            font-size: 14px;
        }
        .nav .active{
            border-bottom: 2px solid #FA8F42;
            color: #FA8F42;
        }

        //数据列表
        .tab-card {
            margin-top: .2rem;
            padding: .3rem 0;
            background: #fff;
            color: #323232;
            .pd-img{
                width: 40px;
                height: 40px;
            }
        }
        .center-item {
            display: flex;
            justify-content: space-between;
            padding: .16rem .6rem;
            .item-left {
                flex: 0 0 2.2rem;
                font-size: 14px;
                text-align: left;
            }

            .item-right {
                flex: 1;
                font-size: 14px;
                text-align: right;
            }
        }
        .tab-card-header {
            border-bottom:  1px solid #eee;
            padding-bottom: .3rem;
            .item-left {
                flex: 1;
            }

            .item-right {
                flex: 0 0 60px;
            }
        }
    }
</style>