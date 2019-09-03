App({
  onLaunch(options) {
    let _self = this
    console.log('App Launch', options);
    console.log('getSystemInfoSync', dd.getSystemInfoSync());
    console.log('SDKVersion', dd.SDKVersion);
    this.globalData.corpId = options.query.corpId;
    this.getAccessToken();
    dd.getAuthCode({
      success:(res)=>{
        dd.httpRequest({
          url: _self.globalData.url+'/api/login',
          method: 'POST',
          data: {
              authCode: res.authCode
          },
          dataType: 'json',
          headers: {'Authorization': _self.globalData.accessToken},
          success: (res) => {
              // dd.alert({content: "step2"});
              console.log('success----',res)
              let userId = res.data.result.userId;
              let userName = res.data.result.userName;
              let deptId = res.data.result.deptId;
              this.globalData.userId = userId;
              this.globalData.userName = userName
              this.globalData.deptId = deptId
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
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  getAccessToken: function() {
    let _self = this;
    console.log('获取access-token');
    dd.httpRequest({
      url: _self.globalData.url+'/api/get-token',
      method: 'POST',
      data: JSON.stringify({
      }),
      headers:{'Content-Type': 'application/json', 'login_name': 'admin', 'password': 'itc123', 'corp_id': this.globalData.corpId},
      dataType: 'json',
      success: (res) => {
        // dd.alert({content: "res: " + JSON.stringify(res)});
        _self.globalData.accessToken = 'Bearer ' + res.data.token;
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
  globalData: {
    corpId:'',
    url: "http://127.0.0.1:8080",
    userId: '',
    userName: '',
    deptId: '',
    accessToken: ''
  }
});