/*
请求接口
opt:{
	url:地址,
	pageSize: 条数，
	pageNum: 页码
	data:数据
	success: 成功的回调,
	fail: 失败的回调
}
*/
import axios from 'axios'
import qs from 'qs'
export function getData(opt) {
  axios({
    method: 'post',
    url: opt.url,
    emulateJSON: true,
    data: qs.stringify(opt.data)
  }).then((res) => {
    if (res.data.code === 0) {
      opt.success(res.data);
    } else {
      if (opt.fail) {
        opt.fail(res.data);
      } else {
        alert(res.data.msg);
      }
    }
  }).catch((err) => {
    console.log('err:' + err, opt)
  })
}