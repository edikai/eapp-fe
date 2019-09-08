import * as api from './../../config/api.js'
import * as dateUtil from './../../utils/dateUtil.js'

let app = getApp();

Page({
    data:{
        corpId: '',
        userId:'',
        userName:'',
        deptId:'',
        space: '\xa0',
        priceUnitName: '',

        selectMonth: '--请选择--',
        mtMoStatsList: []
    },
    onReady() {
        // 页面加载
        console.log('onReady.......')
        let _self = this
        this.setData({
            corpId: app.globalData.corpId,
            userId: app.globalData.userId,
            userName: app.globalData.userName,
            deptId: app.globalData.deptId,

            priceUnitName: app.globalData.priceUnitName,
        })
    },
    onLoad(){
        console.log('onLoad.......')
    },
    onShow() {
        // 页面显示
        console.log('onShow.............')
    },
    onHide() {
        // 页面隐藏
        console.log('onHide..stats...........')
        let pages = getCurrentPages();
        console.log(pages.length)
        this.setData({
            selectMonth: '--请选择--',
            mtMoStatsList: [],
        })
    },
    onUnload() {
        // 页面被关闭
        console.log('onUnload.............')
    },
    selectMonth: function(e) {
        let _self = this
        console.log(e)
        let currentDate = new Date()
        let dd_date = dd.datePicker({
            format: 'yyyy-MM',
            currentDate: currentDate.Format(dateUtil.DATE_FORMAT_MONTH),
            success: (res) => {
                if(res.date) { // 取消不查询数据
                     _self.setData({
                        selectMonth: res.date
                    })
                    _self.getMtWoList()
                }
               
            },
        });
        console.log(dd_date)
    },
    
    getMtWoList: function(e) {
        let _self = this;
        console.log('开始查询汇总数据');
        dd.httpRequest({
            url: api.MT_WO_STATS_LIST_MONTH,
            method: 'GET',
            data: {
                selectMonth: _self.data.selectMonth,
                corpId: _self.data.corpId,
            },
            headers:{'Content-Type': 'application/json', 'Authorization': app.globalData.accessToken},
            dataType: 'json',
            success: (res) => {
                if(res.status == 200 && res.data.code == 200){
                    if(res.data.code == 200){ // 成功
                        console.log(res.data.list)
                        _self.setData({
                            mtMoStatsList: res.data.list
                        })
                    }else {
                        dd.alert({content: "失败："+JSON.stringify(res.data)})
                    }
                }else {
                    dd.alert({content: "失败：" + JSON.stringify(res)});
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
})