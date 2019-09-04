import * as api from './../../config/api.js'

let app = getApp();

Page({
    data:{
        corpId: '',
        authCode: '',
        userId: '',
        userName: '',
        deptId: '',
        space: '\xa0'
    },
    onReady() {
    // 页面加载
    
    },
    saveMtBase: function(e) {
        let _self = this;
        console.log(_self.data)
        let form = e.detail.value;
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        dd.httpRequest({
            url: api.SAVE_MT_BASE_INFO,
            method: 'POST',
            data: JSON.stringify({
                mtTypeMsUnits: form.mt_type_ms_units,
                mtTypeName: form.mt_type_name,
                mtTypePriceUnits: form.mt_type_price_units,
                ddCorpId: _self.data.corpId,
                ddUserId: _self.data.userId,
                createBy: _self.data.userName
            }),
            headers:{'Content-Type': 'application/json', 'Authorization': app.globalData.accessToken},
            dataType: 'json',
            success: (res) => {
                if(res.status == 200 && res.data.code == 200) {
                    dd.alert({
                        title: '提示',
                        content: res.data.msg,
                        buttonText: '确定',
                        success: () => {
                            dd.redirectTo({
                                url: '/pages/index/index?date='+new Date()
                            })
                        },
                    })
                    
                }else{
                    dd.alert({content: "错误信息：" + JSON.stringify(res)})
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
    onLoad(){

        let _this = this;

        this.setData({
            corpId: app.globalData.corpId,
            userId: app.globalData.userId,
            userName: app.globalData.userName,
            deptId: app.globalData.deptId
        })
    },
})