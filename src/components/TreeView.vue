<template>
  <div class="hello">
    {{ getBrands }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters('treeSearch', [
        'getBrands'
    ])
  },
  created() {
    this.getAllBrands()
  },
  methods: {
    ...mapActions('treeSearch', [
      'getAllBrands'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
