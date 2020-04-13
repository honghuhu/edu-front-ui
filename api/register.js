import request from '@/utils/request'

export default {
    smsCode(mobile) {
        return request({
            url: `/msm/sms/send/${mobile}`,
            method: 'get'
        })

    },
    register(data) {
        return request({
            url: `/ucenter/member/register`,
            method: 'post',
            data: data
        })
    }
}