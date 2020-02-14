import Router from 'koa-router'
import axios from './utils/axios'
import Poi from '../dbs/models/poi'


let router = new Router({
  prefix: '/search'
})

let url = 'http://cp-tools.cn/search';

// 搜索推荐
router.get('/top', async (ctx) => {
  // 数据库操作
// try {
  //   let top = await Poi.find({
  //     'name': new RegExp(ctx.query.input),
  //     city: ctx.query.city
  //   })
  //   ctx.body = {
  //     code: 0,
  //     top: top.map(item => {
  //       return {
  //         name: item.name,
  //         type: item.type
  //       }
  //     }),
  //     type: top.length ? top[0].type : ''
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     code: -1,
  //     top: []
  //   }
  // }

  // 接口操作
  let {
    status, data: {
      top
    }
  } = await axios.get(`${url}/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
    }
  })
  ctx.body = {
    top: status === 200 ? top : []
  }
})

// 热门地点
router.get('/hotPlace', async (ctx) => {
  // 数据库操作
  // let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  // try {
  //   let result = await Poi.find({
  //     city,
  //     type: ctx.query.type || '景点'
  //   }).limit(10)
  //
  //   ctx.body = {
  //     code: 0,
  //     result: result.map(item => {
  //       return {
  //         name: item.name,
  //         type: item.type
  //       }
  //     })
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     code: -1,
  //     result: []
  //   }
  // }

  // 接口操作
  let city = ctx.store
    ? ctx.store.geo.position.city
    : ctx.query.city
  let {status, data: {result}} = await axios.get(`${url}/hotPlace`, {
    params: {
      city: city
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

// 根据关键词查找
router.get('/resultsByKeywords', async (ctx) => {
  const {city, keyword} = ctx.query;
  let {
    status,
    data: {
      count,
      pois
    }
  } = await axios.get(`${url}/resultsByKeywords`, {
    params: {
      city,
      keyword,
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})


export default router


