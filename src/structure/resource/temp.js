import ApiInstance from "../../apis";


const dxfReqData = {
  api:'d2ModelQuery',
  params:{
    limit: 20, // 当前页显示多少个
    offset: 0, // 偏移个数（从总列表的那一个数组下标开始查询）
    Name: '', // 关键字搜索
    Tags: {},

  }
}

export async function reqTemp() {
  let res = {};
  let reqData = dxfReqData
  try {
    ApiInstance.materialDelete()

    res = await ApiInstance[reqData.api]({
      ...reqData.params
    });
  } catch (err) {
    console.log('catch err：', err)
  };
  console.log('res.data:', res.data)
}