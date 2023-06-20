import fetch from "../../helper/ajax";

// 书券列表
export function getBalanceDetail(params){
    return fetch.get('/coin-get-record/balanceDetail', params)
}