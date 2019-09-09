import * as api from '/config/api'
import * as dateUtil from'/utils/dateUtil'

let app = getApp();

Page({
    data: {
        title: '建材',
        mtList: [],
        scrollTop: 100,
        priceUnitName: app.globalData.priceUnitName,
        selectedRow: ''  // selected-row
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
    deleteInit: function(e) {
        let _self = this
        console.log(e)
        let { mtBaseId} = e.target.dataset
        let today = new Date()
        dd.httpRequest({
            url: api.MT_WO_GET_LIST_ALL,
            method: 'GET',
            data: {
                mtBaseId: mtBaseId,
                nearlyHalfYear: today.format(dateUtil.DATE_FORMAT_DAY)
            },
            headers:{'Authorization': app.globalData.accessToken},
            dataType: 'json',
            success: (res) => {
                console.log("getMtWoList = ", res)
                let msg = ''
                if(res.status != 200 ) {
                    dd.alert({content: JSON.stringify(res)})
                    return
                }
                if(res.data.code != 200) {
                    dd.alert({content: res.data.msg})
                    return
                }
                console.log("res="+JSON.stringify(res))
                console.log("res.data.list.length="+res.data.list.length)
                console.log("res.data.list.length>0 : "+(res.data.list.length>0))
                if(res.data.list.length > 0){
                    msg += '存在近半年的统计信息，共'+res.data.list.length+'条记录.'
                }
                msg += '是否确认删除？'

                dd.confirm({
                    title: '提示',
                    content: msg,
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    success: (result) => {
                        console.log(result)
                        if(!result.confirm){
                            return
                        }
                        _self.deleteMtBaseById(mtBaseId)
                    },
                })
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
    deleteMtBaseById(mtBaseId) {
        let _self = this
        dd.httpRequest({
            url: api.DELTEE_MT_BASE_INFO+'/'+mtBaseId,
            method: 'GET',
            data: {
            },
            headers:{'Authorization': app.globalData.accessToken},
            dataType: 'json',
            success: (res) => {
                console.log("DELTEE_MT_BASE_INFO = ", res)
                let msg = ''
                if(res.status != 200 ) {
                    dd.alert({content: JSON.stringify(res)})
                    return
                }
                if(res.data.code != 200) {
                    dd.alert({content: res.data.msg})
                    return
                }
                if(res.data.list != null && res.data.list.length > 0){
                    msg += '存在近半年的统计信息，共'+res.data.list.length+'条记录.'
                }
                msg += '是否确认删除？'

                dd.showToast({
                    type: 'success',
                    content: '删除成功',
                    success: (res) => {
                        _self.refresh()
                    }
                })
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
    selectRow(e) {
        console.log(e)
    },
    refresh: function() {
        this.getMtBaseList()
    }
});
