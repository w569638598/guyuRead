import fetch from "../../helper/ajax";




// 我的书架
export function getMybag(params){
    return fetch.get('/bookShelf/my', params)
}
// 浏览记录
export function getBrowseRecord(params){
    return fetch.get('/browse-record/select', params)
}
// 加入浏览记录
export function getAddBrowseRecord(params){
    return fetch.post('/browse-record/insert', params)
}
//加入书架
export function addBookshelf(params){
    return fetch.post('/bookshelf/insert', params)
}
// 书架删除书
export function delBookshelf(params){
    return fetch.post('/bookshelf/update', params)
}

// 书架删除浏览记录
export function delBrowseRecord(params){
    return fetch.post('/browse-record/update', params)
}