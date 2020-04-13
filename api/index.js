import request from '@/utils/request'

export default {
    index() {
        return request({
            url: '/lecturer/index-front/index',
            method: 'get'
        })
    }
}