const API_BASE_URL = 'http://127.0.0.1:8080/api/';

export const LOGIN = API_BASE_URL + 'login'  // 钉钉免登
export const GET_ACCESS_TOKEN = API_BASE_URL + 'get-token'  //后台获取accessToken

export const GET_MT_BASE_LIST = API_BASE_URL + 'mt-base-info/query-all'  //后台获取所有建材
export const SAVE_MT_BASE_INFO = API_BASE_URL + 'mt-base-info/save'  //后台保存建材

const MT_WO_SAVE_AND_START = API_BASE_URL + 'mt-work-order/save-and-start'  // 工单保存并发起审批

export {
    MT_WO_SAVE_AND_START
}

