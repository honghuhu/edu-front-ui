import request from '@/utils/request'

export default {
    //登录
    login(userInfo) {
        return request({
            url: `/ucenter/member/login`,
            method: 'post',
            data: userInfo
        })
    },
    //根据token获取用户信息
    info() {
        return request({
            url: `/ucenter/member/info`,
            method: 'get'
        })
    }
}