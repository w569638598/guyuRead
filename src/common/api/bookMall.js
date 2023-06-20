import fetch from "../../helper/ajax";


//今日推荐

export function getTodayRecommend(params){
    return fetch.get('/bookcity/select',params )
}


export function getNewBooks(params){
    return fetch.get('/books/getNewBooks',params )
}

