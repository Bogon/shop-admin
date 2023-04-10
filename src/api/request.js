import axios from 'axios'

const request = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  timeout: 5000 // 请求超时时间 这里的意思是当请求时间超过5秒还未取得结果时 提示用户请求超时
})

// 请求相关处理 请求拦截 在请求拦截中可以补充请求相关的配置
// interceptors axios的拦截器对象
request.interceptors.request.use(config => {
  // config 请求的所有信息 包含 header
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config // 将配置完成的config对象返回出去 如果不返回 请求讲不会进行
}, err => {
  // 请求发生错误时的相关处理 抛出错误
  return Promise.reject(err)
})

request.interceptors.response.use(response => {
  // 我们一般在这里处理，请求成功后的错误状态码 例如状态码是500，404，403
  // res 是所有相应的信息
  const data = response.data;
  if (response.status === 200) {
    return data;
  } else {
    return Promise.reject(data);
  }
}, err => {
  // 服务器响应发生错误时的处理
  return Promise.reject(err)
})

export default request