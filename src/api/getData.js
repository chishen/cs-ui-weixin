import axios from '@/config/axios'

/**
 * @method init() 初始化获取token
 * @method getDetail() 获取组件详情
 * @method getApi() 获取组件Api
 * @method getList() 获取列表
 * @method postLogin() 管理员登录
 * @method postEditCode() 编辑代码
 * @method postAddComponent() 新增组件
 * @method saveApi() 保存Api
 * @method deleteApi() 删除Api
 * @method deleteComponent() 删除Component
 */
/**
 * 初始化获取token
 */
export const init = () => axios('/api/weixin/init')

/**
 * 获取组件详情
 */
export const getDetail = data => axios('/api/weixin/getDetail', data)

/**
 * 获取组件Api
 */
export const getApi = data => axios('/api/weixin/getApi', data)

/**
 * 获取列表
 */
export const getList = () => axios('/api/weixin/getList')

/**
 * 管理员登录
 */
export const postLogin = (data, headers) => axios('/api/weixin/postLogin', data, 'POST', headers)

/**
 * 编辑代码
 */
export const postEditCode = (data, headers) => axios('/api/weixin/postEditCode', data, 'POST', headers)

/**
 * 新增组件
 */
export const postAddComponent = (data, headers) => axios('/api/weixin/postAddComponent', data, 'POST', headers)

/**
 * 保存Api
 */
export const saveApi = (data, headers) => axios('/api/weixin/saveApi', data, 'POST', headers)

/**
 * 删除Api
 */
export const deleteApi = (data, headers) => axios('/api/weixin/deleteApi', data, 'POST', headers)

/**
 * 删除Component
 */
export const deleteComponent = (data, headers) => axios('/api/weixin/deleteComponent', data, 'POST', headers)
