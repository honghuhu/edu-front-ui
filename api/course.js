import request from '@/utils/request'

export default {
    page(data) {
        return request({
            url: '/lecturer/course-front/page',
            method: 'post',
            data
        })
    },
    subjectTree() {
        return request({
            url: '/lecturer/subject/tree',
            method: 'get'
        })
    },
    detail(id) {
        return request({
            url: `/lecturer/course-front/${id}`,
            method: 'get'
        })
    }
}