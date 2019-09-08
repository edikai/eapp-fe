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

        priceUnit: 0,
        priceUnitName: '',
        mtBaseIdx: 0,
        mtTypeName: '',

        mtWoUseDate: '--请选择--',
        mtBaseList: [],
        mtBaseId: 0,
        mtWoTotalPrice: 0,
        // mtBaseAmount: null,
        // mtWoDesc: '',
    },
    onReady() {
        // 页面加载
        let _self = this
        dd.getStorage({
            key: 'mtBaseList',
            success: (res) => {
                console.log(res)
                this.setData({
                    mtBaseList: res.data,
                })
                _self._initPriceUnit(_self.data.mtBaseList[0])
            }
        })
        this.setData({
            corpId: app.globalData.corpId,
            userId: app.globalData.userId,
            userName: app.globalData.userName,
            deptId: app.globalData.deptId
        })
    },
    onLoad(){
        let _self = this;
        this.setData({
            corpId: app.globalData.corpId
        })
    },
    onHide() {
        // 页面隐藏
        // console.log('onHide..appr.js...........')
        // let pages = getCurrentPages();
        // console.log(pages.length)
        // this.setData({
        //     mtWoUseDate: '--请选择--',
        //     mtWoTotalPrice: 0,
        //     mtBaseId: 0,

        //     priceUnit: 0,
        //     priceUnitName: '',
        //     mtBaseIdx: 0,
        //     mtTypeName: '',
        //     mtBaseAmount: null,
        //     mtWoDesc: '',
        // })
        // this._initPriceUnit(this.data.mtBaseList[0])
    },
    inputUseDate: function(e) {
        let _self = this
        console.log(e)
        let currentDate = new Date()
        console.log(currentDate.Format(dateUtil.DATE_FORMAT_DAY))
        dd.datePicker({
            format: 'yyyy-MM-dd',
            currentDate: currentDate.Format(dateUtil.DATE_FORMAT_DAY),
            success: (res) => {
                _self.setData({
                    mtWoUseDate: res.date
                })
            },
        });
    },
    bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e);
        console.log(this.data.mtBaseList[e.detail.value])
        this.setData({
            mtBaseIdx: e.detail.value
        })
        this._initPriceUnit(this.data.mtBaseList[e.detail.value])
    },
    _initPriceUnit: function(mtBaseInfo) {
        this.setData({
            mtBaseId: mtBaseInfo.id,
            mtTypeName: mtBaseInfo.mtTypeName,
            priceUnit: mtBaseInfo.mtTypePriceUnits,
            priceUnitName: app.globalData.priceUnitName+'/'+mtBaseInfo.mtTypeMsUnits
        })
    },
    calTotalPrice: function(e) {
        let _self = this
        this.setData({
            mtWoTotalPrice: _self.data.priceUnit * e.detail.value
        })
    },
    formSubmit: function(e) {
        let _self = this;
        let form = e.detail.value;
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        console.log(_self.data)
        dd.httpRequest({
            url: api.MT_WO_SAVE_AND_START,
            method: 'POST',
            data: JSON.stringify({
                mtWoUseDate: _self.data.mtWoUseDate,
                mtBaseId: _self.data.mtBaseId,
                priceUnit: _self.data.priceUnit,
                mtWoTotalPrice: _self.data.mtWoTotalPrice,
                mtBaseAmount: form.mtBaseAmount,
                mtWoDesc: form.mtWoDesc,

                ddUserId: _self.data.userId,
                ddDeptId: _self.data.deptId,
                ddCorpId: _self.data.corpId,
                createBy: _self.data.userName,
                textForms: [
                    {name: "使用时间", value: _self.data.mtWoUseDate},
                    {name: "建材", value: _self.data.mtTypeName},
                    {name: "单价", value: _self.data.priceUnit},
                    {name: "数量", value: form.mtBaseAmount},
                    {name: "总金额", value: _self.data.mtWoTotalPrice},
                    {name: "说明", value: form.mtWoDesc}
                ]
            }),
            headers:{'Content-Type': 'application/json', 'Authorization': app.globalData.accessToken},
            dataType: 'json',
            success: (res) => {
                if(res.status == 200 && res.data.code == 200){
                    if(res.data.code == 200){ // 成功
                        dd.showToast({
                            type: 'success',
                            content: "操作成功",
                            duration: 3000,
                            success: () => { //redirectTo
                                dd.navigateBack()
                                // dd.navigateBack({
                                //     url: '/pages/index',
                                //     success: () => {
                                //         var pages = getCurrentPages();//获取当前打开的页面栈，返回为数组，索引顺序为打开的顺序
                                //         console.log('pages.length=', pages.length)
                                //         var prePages = pages[pages.length - 1];//获取到上一个页面对象
                                //         console.log(prePages)
                                //         // prePages.refresh();//执行上一个页面对象中的刷新数据方法
                                //     }
                                // })
                            }
                        })
                    }else {
                        dd.alert({content: "失败："+JSON.stringify(res.data)})
                    }
                }else {
                    dd.alert({content: "审批实例id：" + JSON.stringify(res)});
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