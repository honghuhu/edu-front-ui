import request from '@/utils/request'
const api_name = '/vod'

export default {
  playAuth(vid) {
    return request({
      url: `${api_name}/video/${vid}`,
      method: 'get'
    })
  }
}