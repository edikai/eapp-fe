import * as api from './../../config/api.js'

let app = getApp();

Page({
    data:{
        corpId: '',
        userId:'',
        userName:'',
        deptId:'',
        space: '\xa0'
    },
    onReady() {
    // 页面加载
   
    },
    formSubmit: function(e) {
      let that = this;
      let form = e.detail.value;
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
      dd.httpRequest({
                    url: url+'/processinstance/start',
                    method: 'POST',
                    data: JSON.stringify({
                        originatorUserId: that.data.userId,
                        deptId: that.data.deptId,
                        textForms: [
                          {name: "[\"开始时间\",\"结束时间\"]",value:"[\"2018-08-21\",\"2018-08-25\"]"},
                          {name: "出差人数",value:form.number},
                          {name: "出差金额",value:form.money},
                          {name: "出差同伴",value:form.people},
                          {name: "交通工具",value:form.vehicle},
                          {name: "出差事由",value:form.reason}
                        ],
                        pictureForms:[{name:"图片",value:[form.picture]}],
                        detailForms: [
                          {
                            name:"行程明细",
                            textForms:[
                              {name:"出差地点",value:form.detail_address}],
	                          pictureForms:[
                              {name:"图片",value:[form.detail_picture]}]}]
                    }),
                    headers:{'Content-Type': 'application/json'},
                    dataType: 'json',
                    success: (res) => {
                        dd.alert({content: "审批实例id：" + JSON.stringify(res)});
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
            corpId: app.globalData.corpId
        })
        
        //dd.alert({content: "step1"});
         
        
        
    }
})