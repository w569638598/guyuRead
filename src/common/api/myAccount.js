import fetch from "../../helper/ajax";

export function getCoinsDetail(params){
    return fetch.get('/coin-get-record/coinsDetail', params)
}