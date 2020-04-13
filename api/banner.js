import request from '@/utils/request'

export default {
    all() {
        return request({
            url: '/cms/banner-front/all',
            method: 'get'
        })
    }
}