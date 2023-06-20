import fetch from "../../helper/ajax";


// 书籍分类
export function getCategory(){
    return fetch.get('/books/getCategory')
}


export function testxxtokenaghpb(){
    return fetch.get('/book/testxxtokenaghpb')
}

// 发送验证码
export function sendCode(params){
    return fetch.get('/phone/sendCode',params)
}
// 登录
export function login(params){
    return fetch.post('/phone/verifyCode', params)
}

// 创建用户
export function createUser(params){
    return fetch.get('/user/getCheckId', params)
}

// 获取用户信息
export function getUserInfo(params){
    return fetch.get('/user/getUserInfo', params)
}

// 获取书包
export function getBookBag(params){
    return fetch.get('/bookShelf/bookBag', params)
}