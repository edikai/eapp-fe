let app = getApp();

Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    console.log(app)
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
  formSubmit: function(e) {
      let that = this;
      console.log('form发生了submit事件，携带数据为：');
      dd.httpRequest({
        url: app.globalData.url+'/api/get-token',
        method: 'POST',
        data: JSON.stringify({
            login_name: "admin",
            Authorization: "xxxxxxxxxxxxxxxxxxxxxxx",
        }),
        headers:{'Content-Type': 'application/json', 'login_name': 'admin', 'password': 'itc123', 'user_id': app.globalData.userId},
        dataType: 'json',
        success: (res) => {
            dd.alert({content: "res: " + JSON.stringify(res)});
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
