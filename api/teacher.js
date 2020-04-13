import request from '@/utils/request'

export default {
    page(page, limit) {
        return request({
            url: `/lecturer/teacher-front/${page}/${limit}`,
            method: 'get'
        })
    },
    detail(id) {
        return request({
            url: `/lecturer/teacher-front/${id}`,
            method: 'get'
        })
    }
}