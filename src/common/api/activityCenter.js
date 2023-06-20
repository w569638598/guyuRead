import fetch from "../../helper/ajax";

// 活动列表
export function getActivityList(params){
    return fetch.get('/activity/getAllActivity', params)
}
// 活动详情
export function getActivityDetail(params){
    return fetch.get('/activity/getActivity', params)
}