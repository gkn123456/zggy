import tool from "@/libs/aes"
import axios from 'axios'

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
axios.defaults.headers.common['Content-type'] = "application/x-www-form-urlencoded"
axios.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    let token = localStorage.getItem("token")
    if (!config.headers.hasOwnProperty('Authorization') && token) {
      config.headers.Authorization = token;
      config.headers.uid = localStorage.getItem("uid")
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

export function getUserInfo(a = { user_id }) {
  return axios.request({ url: "/v1/user", params: tool.getParams(a), method: 'post' })
}

export function sendMsg(a = { mobile }) {
  return axios.request({ url: "/v1/send", params: tool.getParams(a), method: 'post' })
}

export function getNav(a = {}) {
  return axios.request({ url: "/v1/nav", params: tool.getParams(a), method: 'post' })
}
export function getINav(a = {}) {
  return axios.request({ url: "/v1/i_nav", params: tool.getParams(a), method: 'post' })
}

export function getClass(a = {}) {
  return axios.request({ url: "/v1/class", params: tool.getParams(a), method: 'post' })
}

export function login(a = { mobile, code }) {
  return axios.request({ url: "/v1/login", params: tool.getParams(a), method: 'post' })
}

export function loadNews(a = { nav_id, n_cid, size, page }) {
  return axios.request({ url: "/v1/news", params: tool.getParams(a), method: 'post' })
}

export function loadNewsDetail(a = { page,new_id }) {
  return axios.request({ url: "/v1/news/detail", params: tool.getParams(a), method: 'post' })
}
export function getBook(a = {size, page}) {
  return axios.request({ url: "/v1/book", params: tool.getParams(a), method: 'post' })
}
export function getBookDetail(a = {book_id}) {
  return axios.request({ url: "/v1/book/detail", params: tool.getParams(a), method: 'post' })
}
// 投票信息
export function getVoteList(a = {size, page}) {
  return axios.request({ url: "/v1/user/vote/list", params: tool.getParams(a), method: 'post' })
}
// 投票
export function getVote(a = {three_id}) {
  return axios.request({ url: "/v1/user/vote", params: tool.getParams(a), method: 'post' })
}
export function getRecord(a = {tag,size, page}) {
  return axios.request({ url: "/v1/user/record", params: tool.getParams(a), method: 'post' })
}
// 推荐阅读rec
export function getRec(a = {size, page}) {
  return axios.request({ url: "/v1/user/rec", params: tool.getParams(a), method: 'post' })
}
//友情链接
export function getLink(a = {tag}) {
  return axios.request({ url: "/v1/link", params: tool.getParams(a), method: 'post' })
}
// 申报下载详情
export function getDedetail(a = {}) {
  return axios.request({ url: "/v1/de/detail", params: tool.getParams(a), method: 'post' })
}
//报表下载
export function download(a = {}) {
  return axios.request({ url: "/v1/de/down", params: tool.getParams(a), method: 'post' })
}
// 广告
export function getAd(a = {source}) {
  return axios.request({ url: "/v1/ad", params: tool.getParams(a), method: 'post' })
}
// 七牛token
export function getqiniuToken(a = {}) {
  return axios.request({ url: "/v1/qn/tk", params: tool.getParams(a), method: 'post' })
}
// 支付
export function orderPay(a = {p_source,p_way,three_id,order_sn}) {
  return axios.request({ url: "/v1/order/pay", params: tool.getParams(a), method: 'post' })
}
// vip
export function getVip(a = {}) {
  return axios.request({ url: "/v1/vip/list", params: tool.getParams(a), method: 'post' })
}
// 编辑用户信息
export function userEdit(a = {sex,user_id,name,r_name,hear_icon,birthday,birthday}) {
  return axios.request({ url: "/v1/user/edit", params: tool.getParams(a), method: 'post' })
}
