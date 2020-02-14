import Router from 'koa-router'
import axios from './utils/axios'
import Menu from '../dbs/models/menu'
import Province from '../dbs/models/province'

let router = new Router({
  prefix: '/geo'
})

let url = 'http://cp-tools.cn/geo';

// 获取当前省份城市
router.get('/getPosition', async (ctx) => {
  let {
    status,
    data: {province, city}
  } = await axios.get(`${url}/getPosition`)

  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

// 获取菜单
router.get('/menu', async (ctx) => {
  // 数据库操作
  // const res = await Menu.findOne()
  // ctx.body = {
  //   menu: res.menu
  // }

  // 接口操作
  let {status, data:{menu}} = await axios.get(`${url}/menu`);
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

// 所有省份
router.get('/province', async (ctx) => {
  // 数据库操作
  // let province = await Province.find()
  // ctx.body = {
  //   province: province.map(item => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }

  // 接口操作
  let {status, data:{province}} = await axios.get(`${url}/province`);
  ctx.body = {
    province: status === 200 ? province : []
  }
})

// 根据id查出省份
router.get('/province/:id', async (ctx) => {
  // 数据库操作
  // let city = await City.findOne({id: ctx.params.id})
  //
  // ctx.body = {
  //   code: 0,
  //   city: city.value.map(item => {
  //     return {province: item.province, id: item.id, name: item.name}
  //   })
  // }

  // 接口操作
  let {status, data: {
    city
  }} = await axios.get(`${url}/province/${ctx.params.id}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

// 所有城市
router.get('/city', async (ctx) => {
  // 数据库操作
  // let city = []
  // let result = await City.find()
  // result.forEach(item => {
  //   city = city.concat(item.value)
  // })
  // ctx.body = {
  //   code: 0,
  //   city: city.map(item => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
  //         ? item.province
  //         : item.name
  //     }
  //   })
  // }

  // 接口操作
  let {status, data: {
    city
  }} = await axios.get(`${url}/city`);
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

// 热门城市
router.get('/hotCity', async (ctx) => {
  // 数据库操作
  // let list = [
  //   '北京市',
  //   '上海市',
  //   '广州市',
  //   '深圳市',
  //   '天津市',
  //   '西安市',
  //   '杭州市',
  //   '南京市',
  //   '武汉市',
  //   '成都市'
  // ]
  // let result = await City.find()
  // let nList = []
  // result.forEach(item => {
  //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  // })
  // ctx.body = {
  //   hots: nList
  // }

  // 接口操作
  let {status, data: {
    hots
  }} = await axios.get(`${url}/hotCity`);
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
})

export default router


