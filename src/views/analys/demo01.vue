<script>
export default {
  components: {
    'line-chart': () => import(/* webpackChunkName: "components" */ '@/components/charts/LineChart')
  },
  data() {
    return {}
  }
}
</script>

<template>
  <line-chart />
</template>

<style lang="scss" scoped>

</style>
