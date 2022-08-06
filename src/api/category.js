import request from '@/utils/request'

/**
 * 获取顶级类目 - 分类数据
 */
export const reqFindTopCategory = (id) => request('/category', 'get', { id })

/**
 * 获取二级类目的筛选条件数据
 * @param {String} id - 二级类目ID
 */
export const reqFindSubCategoryFilter = (id) => request('/category/sub/filter', 'get', { id })

/**
 * 获取筛选数据
 */
export const reqFindSubCategoryGoods = (params) => request('/category/goods', 'post', params)
