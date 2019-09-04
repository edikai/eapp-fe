import * as login from './utils/login.js';

App({
  onLaunch(options) {
    let _self = this
    console.log('App Launch', options);
    console.log('getSystemInfoSync', dd.getSystemInfoSync());
    console.log('SDKVersion', dd.SDKVersion);
    this.globalData.corpId = options.query.corpId;
    // login.getAccessToken(_self)
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    corpId:'',
    userId: '',
    userName: '',
    deptId: '',
    accessToken: '',
    priceUnitName: '元'
  }
});