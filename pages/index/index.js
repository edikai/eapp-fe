import * as api from './../../config/api.js'

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
    let _self = this
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    console.log(app)
    let token = app.globalData.accessToken
    

    if(!token) {
      let res = dd.getStorageSync({
        key: 'accessToken',
      })
      if(!res.data){
        this.getMtBaseList()
      }else{
        console.log('mini project is not init.')
        this.getAccessToken()
      }
    }else {
        this.getMtBaseList()
    }
    dd.setNavigationBar({
      title: this.data.title
    })
  },
  onReady() {
    // 页面加载完成
    dd.stop
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
    this.getMtBaseList()
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
  getAccessToken: function(e) {
    let _self = this;
    console.log('获取access-token');
    dd.httpRequest({
      url: api.GET_ACCESS_TOKEN,
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
          dd.setStorage({
            key: 'accessToken',
            data: app.globalData.accessToken
          })
          _self.ddGetAuthCode(app)
        }else {
          dd.alert({content: JSON.stringify(res.data)})
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
          url: api.LOGIN,
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
                dd.setStorage({
                  key: 'userInfo',
                  data: {
                    userId: app.globalData.userId,
                    userName: app.globalData.userName,
                    deptId: app.globalData.globalData
                  }
                })
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
        url: api.GET_MT_BASE_LIST,
        method: 'POST',
        data: JSON.stringify({
        }),
        headers:{'Content-Type': 'application/json', 'Authorization': app.globalData.accessToken},
        dataType: 'json',
        success: (res) => {
          console.log("getMtBaseList = ", res)
          if(res.status == 200 && res.data.code == 200){
            console.log(res)
            this.setData({
              mtList: res.data.list
            })
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
