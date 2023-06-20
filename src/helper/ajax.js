/**
 * 封装了一些网络请求方法，方便通过 Promise 的形式请求接口
 */
import $fetch from '@system.fetch'
import $utils from './utils'
import { baseUrl } from '../conf/server'
import storage from '@system.storage'
import { kyyid } from '../conf/kyyid'
import {createUser} from '../common/api/pub'
import router from '@system.router'
const TIMEOUT = 20000
Promise.prototype.finally = function (callback) {
  const P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason =>
      P.resolve(callback()).then(() => {
        throw reason
      })
  )
}
let access_token = ''
let deviceInfo = {}

function refreshToken(){
  router.push({
    uri: 'pages/home'
  })
  storage.get({
    key: 'refresh_token',
    success: function (data) {
      if (data) {
        $fetch.fetch({
          url: baseUrl + '/user/refreshToken',
          method: 'get',
          header: {
            imei: deviceInfo.imei,
            kyyid: kyyid,
            Authorization: 'Bearer ' + data
          }
        }).then(e => {
          if(e){
            storage.set({
              key: 'access_token',
              value: e.data.access_token,
            })
            storage.set({
              key: 'refresh_token',
              value: e.data.refresh_token,
            })
          }
        })
      }else{
        createUser()
      }
    },
    fail: function(e){
      rej(e)
    }
  })

}

/**
 * 调用快应用 fetch 接口做网络请求
 * @param params
 */
function fetchPromise(params) {
  return new Promise(res => {
    storage.get({
      key: 'deviceInfo',
      success: function (data) {
        if (data) {
          deviceInfo = JSON.parse(data)
          res(JSON.parse(data))
        }
      },
      fail: function(e){
        rej(e)
      }
    })
  }).then(e => {
    return new Promise((res, rej) => {
      storage.get({
        key: 'access_token',
        success: function (data) {
          if (data) {
            access_token = data
            res(data)
          }
        },
        fail: function(e){
          rej(e)
        }
      })
    })
  }).then(e => {
    return new Promise((resolve, reject) => {
      $fetch.fetch({
        url: baseUrl + params.url,
        // url: 'https://www.fastmock.site/mock/15555aa9ef821335a15c8467ecae2e63/list/list',
        method: params.method,
        data: params.data,
        header: {
          imei: deviceInfo.imei,
          kyyid: kyyid,
          Authorization: 'Bearer ' + access_token
        }
      }).then(response => {
          const result = response.data
          const content = JSON.parse(result.data)
          /* @desc: 可跟具体不同业务接口数据，返回你所需要的部分，使得使用尽可能便捷 */
          if(content.code === 40001){
            refreshToken()
            reject(content)
          }
          resolve(content.data ? content.data : content)
        })
        .catch((error, code) => {
          console.log(`${error}🐛 request fail, code = ${code}`)
          reject(error)
        })
        .finally(() => {
          resolve()
        })
    })
  })
}

/**
 * 处理网络请求，timeout 是网络请求超时之后返回，默认 20s 可自行修改
 * @param params
 */
function requestHandle(params, timeout = TIMEOUT) {
  try {
    return Promise.race([
      fetchPromise(params),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('网络状况不太好，再刷新一次？'))
        }, timeout)
      })
    ])
  } catch (error) {
  }
}

export default {
  post: function (url, params) {
    return requestHandle({
      method: 'post',
      url: url,
      data: params
    })
  },
  get: function (url, params) {
    return requestHandle({
      method: 'get',
      url: $utils.queryString(url, params)
    })
  },
  put: function (url, params) {
    return requestHandle({
      method: 'put',
      url: url,
      data: params
    })
  }
  // 如果，method 您需要更多类型，可自行添加更多方法；
}
