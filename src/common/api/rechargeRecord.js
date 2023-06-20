import fetch from "../../helper/ajax";


//充值记录
export function getRechargeRecord(params){
    return fetch.get('/order/select', params)
}

// 账户余额
export function getCoinsBalanceTotal(params){
    return fetch.get('/coin-get-record/coinsBalanceTotal', params)
}