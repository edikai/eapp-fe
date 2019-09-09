// const API_BASE_URL = 'http://192.168.1.110:80/api/'; // 测试地址
// const API_BASE_URL = 'http://127.0.0.1:80/api/'; // 测试地址
const API_BASE_URL = 'http://49.235.132.193:80/api/'; // 正式地址

export const LOGIN = API_BASE_URL + 'login'  // 钉钉免登
export const GET_ACCESS_TOKEN = API_BASE_URL + 'get-token'  //后台获取accessToken

export const GET_MT_BASE_LIST = API_BASE_URL + 'mt-base-info/query-all'  //后台获取所有建材
export const SAVE_MT_BASE_INFO = API_BASE_URL + 'mt-base-info/save'  //后台保存建材
export const DELTEE_MT_BASE_INFO = API_BASE_URL + 'mt-base-info/delete-by-id' // 获取所有工单信息

export const MT_WO_SAVE_AND_START = API_BASE_URL + 'mt-work-order/save-and-start'  // 工单保存并发起审批
export const MT_WO_STATS_LIST_MONTH = API_BASE_URL + 'mt-work-order/stats-list-month'   // 工单按月汇总
export const MT_WO_GET_LIST_ALL = API_BASE_URL + 'mt-work-order/query-all' // 获取所有工单信息


// export {
//     MT_WO_SAVE_AND_START
// }

