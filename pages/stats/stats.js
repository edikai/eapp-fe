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

        selectMonth: '',
        mtMoStatsList: []
    },
    onReady() {
        // 页面加载
        let _self = this
        this.setData({
            corpId: app.globalData.corpId,
            userId: app.globalData.userId,
            userName: app.globalData.userName,
            deptId: app.globalData.deptId
        })
    },
    onLoad(){
    },
    selectMonth: function(e) {
        let _self = this
        console.log(e)
        let currentDate = new Date()
        dd.datePicker({
            format: 'yyyy-MM',
            currentDate: currentDate.Format(dateUtil.DATE_FORMAT_MONTH),
            success: (res) => {
                _self.setData({
                    selectMonth: res.date
                })
                _self.getMtWoList()
            },
        });
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