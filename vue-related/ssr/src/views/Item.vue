<template>
  <div>
    ItemPage: path param: {{ $route.params.id }}
  </div>
</template>

<script>
import fooStoreModule from '../store/modules/foo';
  export default {
    asyncData({ route, store }) {
      store.registerModule('foo', fooStoreModule)
      store.dispatch('foo/inc')
      return store.dispatch('fetchItem', route.params.id)
    },
    /**
     *  当多次访问路由时, 
     *  避免在客户端重复注册模块
     */
    destroyed() {
      this.$store.unregisterModule('foo')
    },
  }
</script>

<style lang="scss" scoped>

</style>