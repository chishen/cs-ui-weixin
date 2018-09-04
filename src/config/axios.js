import Vue from 'vue'
export default async (url = '', data = {}, method = 'GET', headers = {}) => {
  return new Promise((resolve, reject) => {
    Vue.axios({
      method: method,
      url: url,
      data: (method === 'POST' ? data : {}),
      params: (method === 'GET' ? data : {}),
      headers: headers
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
