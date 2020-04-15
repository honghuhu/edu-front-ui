import request from '@/utils/request'

export default {
    page(courseVo) {
        return request({
            url: '/lecturer/course-front/page',
            method: 'post',
            data: courseVo
        })
    },
    subjectTree() {
        return request({
            url: '/lecturer/subject/tree',
            method: 'get'
        })
    }
}