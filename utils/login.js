import * as api from './../config/api.js'

export function ddGetAuthCode(app) {
  let _self = this
  let result = {}
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
              app.globalData.userId = res.data.result.userId
              app.globalData.userName = res.data.result.userName
              app.globalData.deptId = res.data.result.deptId
              // result = res.data
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

  return result
}

function getAccessToken(app) {
  let _self = this;
  console.log('获取access-token');
  dd.httpRequest({
    url: api.GET_ACCESS_TOKEN,
    method: 'POST',
    async: false,
    data: JSON.stringify({
    }),
    headers:{'Content-Type': 'application/json', 'login_name': 'admin', 'password': 'itc123', 'corp_id': app.globalData.corpId},
    dataType: 'json',
    success: (res) => {
      // dd.alert({content: "res: " + JSON.stringify(res)});
      console.log('get-token res: ', res)
      if(res.status == 200 && res.data.code == 200){
        app.globalData.accessToken = 'Bearer ' + res.data.token
        ddGetAuthCode(app)
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
}

export {
  getAccessToken
}