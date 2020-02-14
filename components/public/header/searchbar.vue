<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
        :span="3"
        class="left"
      >
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png"
          alt="美团"
        >
      </el-col>
      <el-col
        :span="15"
        class="center"
      >
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <button
            class="el-button el-button--primary"
            style="padding: 13px 20px;"
          >
            <i class="el-icon-search" />
          </button>
          <!-- 没有输入内容显示 -->
          <dl
            v-if="isHotPlace"
            class="hotPlace"
          >
            <dt>热门搜索</dt>
            <dd
              v-for="(item, index) in hotPlace"
              :key="index"
            >
              {{ item.name }}
            </dd>
          </dl>
          <!-- 输入内容显示 -->
          <dl
            v-if="isSearchList"
            class="searchList"
          >
            <dd
              v-for="item in searchList"
              :key="item.name"
            >
              {{ item.name }}
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a
            v-for="item in hotPlace"
            :key="item.name"
            href="#"
          >{{ item.name }}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link
              to="/"
              class="takeout"
            >
              美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="movie"
            >
              猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="hotel"
            >
              美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="apartment"
            >
              民宿/公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="business"
            >
              商家入驻
            </nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col
        :span="6"
        class="right"
      >
        <ul class="security">
          <li>
            <i class="refund" /><p class="txt">
              随时退
            </p>
          </li>
          <li>
            <i class="single" /><p class="txt">
              不满意免单
            </p>
          </li>
          <li>
            <i class="overdue" /><p class="txt">
              过期退
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import _ from 'lodash'
    import { mapState } from 'vuex'

    export default {
      data() {
        return {
          isFocus: false,     // 是否是聚焦
          search: '',         // 输入框的值
          searchList: [],     // 搜索推荐
        }
      },
      computed: {
        ...mapState({
          curPosition: state => state.geo.position.city.replace('市',''),
          hotPlace: state => state.home.hotPlace.slice(0, 5)
        }),
        isHotPlace: function () {
          return this.isFocus && !this.search
        },
        isSearchList: function () {
          return this.isFocus && this.search
        }
      },
      methods: {
        focus: function () {
          this.isFocus = true
        },
        blur: function () {
          let self = this;
          setTimeout(function () {
            self.isFocus = false
          }, 200)
        },
        input: _.debounce(async function(){
          let self = this;
          let city = self.curPosition
          self.searchList = []
          let {status,data:{top}}=await self.$axios.get('/search/top',{
            params:{
              input:self.search,
              city
            }
          })
          self.searchList=top.slice(0,10)
        },300)
      }
    }
</script>

<style lang="scss">

</style>
