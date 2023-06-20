import fetch from "../../helper/ajax";


// 签到信息
export function getSignInfo(params){
    return fetch.get('/signed/info', params)
}

// 签到
export function getSignAdd(params){
    return fetch.get('/signed/add', params)
}
//新人任务
export function getNewUserTask(params){
    return fetch.get('/task/new', params)
}

// 每日任务
export function getEveryDayrTask(params){
    return fetch.get('/task/everyday', params)
}