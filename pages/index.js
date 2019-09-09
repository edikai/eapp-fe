// import lifecycle from '/util/lifecycle';
import animModal from '/utils/pages/items';
import * as loginUtil from '/utils/login'

let app = getApp()

// const lastComponents = [
//     {
//         icon: '/image/canvas.png',
//         title: '画布',
//         entitle: 'Canvas',
//         page: 'canvas',
//     },
// ];

Page({
//   ...lifecycle,
    ...animModal.animOp,
    data: {
        ...animModal.data,
        pageName: 'component/index',
        pageInfo: {
        pageId: 0,
        },
        hidden: true,
        curIndex: 0,
        arr: {
            onItemTap: 'onGridItemTap',
            onChildItemTap: 'onChildItemTap',
            list: [{
                    icon: '/img/mt-s-tool.jpg',
                    title: '建材',
                    entitle: '建材维护',
                    subs: [
                        {
                            title: '列表',
                            entitle: '建材信息列表',
                            page: '/pages/mt-base/list/list',
                            pathType: 'abs' // 路径类型 - abs:绝对路径，默认不填为相对路径
                        },
                        {
                            title: '添加',
                            entitle: '添加新建材',
                            page: '/pages/mt-base/add/add',
                            pathType: 'abs'
                        },
                    ],
                }, {
                    icon: '/img/appr.jpg',
                    title: '工单',
                    entitle: '审批工单',
                    subs: [
                        {
                            title: '购入工单',
                            entitle: '建材购入工单申请',
                            page: 'appr',
                        },
                    ],
                }, {
                    icon: '/img/stats.jpg',
                    title: '统计',
                    entitle: '汇总统计',
                    subs: [
                        {
                            title: '按月汇总',
                            entitle: '按月汇总统计建材购入费用',
                            page: 'stats',
                        },
                    ],
                },
                // ...lastComponents,
            ],
        },
    },
    onLoad(query) {
        let _self = this
        console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
        console.log(app)
        let token = app.globalData.accessToken

        console.log("global token = " + token)
        console.log(token == null)
        console.log(token.trim().length)
        if(token == null || token.trim().length == 0) {
            console.log('accessToken is not init, init it now.')
            loginUtil.getAccessToken(app)
        }
    },
    onGridItemTap(e) {
        const curIndex = e.currentTarget.dataset.index;
        const childList = this.data.arr.list[curIndex];
        if (childList.subs) {
        this.setData({
            hidden: !this.data.hidden,
            curIndex,
        });
        this.createMaskShowAnim();
        this.createContentShowAnim();
        } else {
        this.onChildItemTap({
            currentTarget: {
                dataset: { page: childList.page },
            },
        });
        }
    },
    onChildItemTap(e) {
        console.log(e)
        const { page } = e.currentTarget.dataset;
        const { pathType } = e.currentTarget.dataset
        console.log('pathType = ' + pathType)
        let url = ''
        if(pathType) {
            url = `${page}`
        }else {
            url = `${page}/${page}`
        }
        console.log(url)
        dd.navigateTo({
            url: url,
        });
    },
    onModalCloseTap() {
        this.createMaskHideAnim();
        this.createContentHideAnim();
        setTimeout(() => {
        this.setData({
            hidden: true,
        });
        }, 210);
    },
});
