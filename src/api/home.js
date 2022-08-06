import request from '@/utils/request'

/**
 * 获取导航数据
 */
export const reqFindHeadCategory = () => request('/home/category/head', 'get')
/**
 * 获取banner图
 */
export const reqFindBanner = () => request('home/banner', 'get')
/**
 * 获取新鲜好物
 */
export const reqFindNew = () => request('home/new', 'get')
/**
 * 获取人气推荐
 */
export const reqFindHot = () => request('home/hot', 'get')
