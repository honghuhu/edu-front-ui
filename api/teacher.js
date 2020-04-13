import request from '@/utils/request'

export default {
    page(page, limit) {
        return request({
            url: `/lecturer/teacher-front/${page}/${limit}`,
            method: 'get'
        })
    }
}