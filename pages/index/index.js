import * as login from './../../utils/login.js';

let app = getApp();

Page({
  data: {
    toView: 'red',
    scrollTop: 100,
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
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    console.log(app)
    let token = app.globalData.accessToken
    if(!token) {
      console.log('mini project is not init.')
      this.getAccessToken()
    }else{
      this.getMtBaseList()
    }
  },
  onReady() {
    // 页面加载完成
    
  },
  onShow() {
    // 页面显示
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
  getAccessToken: function(e) {
    let _self = this;
    console.log('获取access-token');
    dd.httpRequest({
      url: login.getUrl()+'/get-token',
      method: 'POST',
      data: JSON.stringify({
      }),
      headers:{'Content-Type': 'application/json', 'login_name': 'admin', 'password': 'itc123', 'corp_id': app.globalData.corpId},
      dataType: 'json',
      success: (res) => {
        // dd.alert({content: "res: " + JSON.stringify(res)});
        console.log('get-token res: ', res)
        if(res.status == 200 && res.data.code == 200){
          app.globalData.accessToken = 'Bearer ' + res.data.token
          _self.ddGetAuthCode(app)
        }
        
      },
      fail: (res) => {
        console.log("httpRequestFail---",res)
        dd.alert({content: JSON.stringify(res)});
      },
      complete: (res) => {
        dd.hideLoading();
      }
    })
  },
  ddGetAuthCode: function(e) {
    let _self = this
    dd.getAuthCode({
      success:(res)=>{
        dd.httpRequest({
          url: login.getUrl()+'/login',
          method: 'POST',
          async: false,
          data: {
              authCode: res.authCode
          },
          dataType: 'json',
          headers: {'Authorization': app.globalData.accessToken},
          success: (res) => {
              console.log('success----',res)
              if(res.status == 200 && res.data.code == 200){
                app.globalData.userId = res.data.userId
                app.globalData.userName = res.data.userName
                app.globalData.deptId = res.data.deptId
                // result = res.data
                _self.getMtBaseList()
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
      fail: (err)=>{
          dd.alert({content: "step3"});
          dd.alert({
              content: JSON.stringify(err)
          })
      }
    })
  },
  getMtBaseList: function(e) {
      let _self = this;
      console.log('获取建材列表数据');
      dd.httpRequest({
        url: login.getUrl()+'/mt-base-info/query-all',
        method: 'POST',
        data: JSON.stringify({
        }),
        headers:{'Content-Type': 'application/json', 'Authorization': app.globalData.accessToken},
        dataType: 'json',
        success: (res) => {
          console.log("getMtBaseList = ", res)
          if(res.status == 200 && res.data.code == 200){
            console.log(res)
          }else if(res.status == 200) {
            console.log(res)
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
});
