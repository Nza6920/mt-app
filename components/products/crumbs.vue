<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">
        {{ curCity }}美团
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">{{ curCity }}{{ decodeURIComponent(keyword)
        }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    props: {
      keyword: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapState({
        curCity: state => state.geo.position.city.replace('市','')
      })
    }
  }
</script>
