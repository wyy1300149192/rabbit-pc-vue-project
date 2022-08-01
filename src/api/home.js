import request from '@/utils/request'

/**
 * 获取导航数据
 */
export const reqFindHeadCategory = () => request('/home/category/head', 'get')
