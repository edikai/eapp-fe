import * as api from '/config/api'

let app = getApp();

Page({
    data: {
        title: '建材',
        mtList: [],
        toView: 'red',
        scrollTop: 100,
        priceUnitName: app.globalData.priceUnitName
    },
    upper(e) {
        console.log(e);
    },
    lower(e) {
        console.log(e);
    },
    scroll(e) {
        console.log(e.detail.scrollTop);
    },
    scrollToTop(e) {
        console.log(e);
        this.setData({
            scrollTop: 0,
        });
    },
    onLoad(query) {
        // 页面加载
        this.getMtBaseList()
    },
    onReady() {
        // 页面加载完成
    },
    onShow() {
        // 页面显示
        dd.setNavigationBar({
            title: this.data.title
        })
    },
    onHide() {
    // 页面隐藏
    },
    onUnload() {
    // 页面被关闭
    },
    onTitleClick() {
    // 标题被点击
    },
    onPullDownRefresh() {
    // 页面被下拉
        this.refresh()
        dd.stopPullDownRefresh()
    },
    onReachBottom() {
    // 页面被拉到底部
    },
    onShareAppMessage() {
        // 返回自定义分享信息
        return {
            title: 'My App',
            desc: 'My App description',
            path: 'pages/index/index',
        };
    },
    // 获取建材列表
    getMtBaseList: function(e) {
        let _self = this;
        console.log('获取建材列表数据');
        dd.httpRequest({
            url: api.GET_MT_BASE_LIST,
            method: 'POST',
            data: JSON.stringify({
            }),
            headers:{'Content-Type': 'application/json', 'Authorization': app.globalData.accessToken},
            dataType: 'json',
            success: (res) => {
                console.log("getMtBaseList = ", res)
                if(res.status == 200 && res.data.code == 200){
                    this.setData({
                        mtList: res.data.list
                    })
                    dd.setStorage({
                        key: 'mtBaseList',
                        data: res.data.list
                    })
                }else if(res.status == 200) {
                    let msg = res.data.msg
                    console.log(msg)
                    dd.alert(msg);
                }else {
                    JSON.stringify(res)
                }
            },
            fail: (res) => {
                console.log("httpRequestFail---",res)
                dd.alert({content: JSON.stringify(res)});
            },
            complete: (res) => {
                dd.hideLoading();
            }
            
        });
    },
    refresh: function() {
        this.getMtBaseList()
    }
});
