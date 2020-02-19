import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    async nuxtServerInit({commit}, {req, app}) {
      // 当前位置
      let {status: status1, data:{province, city}} = await app.$axios.get('geo/getPosition')
      city = '成都市';
      province = '四川省';
      commit('geo/setPosition', status1 === 200 ? {city, province} : {city: '', province: ''})

      // 菜单
      const {status: status2, data:{menu}} = await app.$axios.get('geo/menu')
      commit('home/setMenu', status2 === 200 ? menu : [])

      // 热门地点
      const {status: status3, data:{result}} = await app.$axios.get('search/hotPlace', {
        params: {
          city: app.store.state.geo.position.city.replace('市', '')
        }
      })
      commit('home/setHotPlace', status3 === 200 ? result : [])
    }
  }
})

export default store
