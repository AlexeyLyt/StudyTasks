<template>
  <div id="app">
    <h1>Shopping Cart VUEX</h1>
    <hr>
    <h2>Products</h2>
    <ProductList/>
    <hr>
    <ShoppingCart/>
  </div>
</template>

<script>
import ProductList from '@/components/VuexExample/ProductList.vue'
import ShoppingCart from '@/components/VuexExample/ShoppingCart.vue'

export default {
  components: { ProductList, ShoppingCart }
}
</script> 

<style scoped lang="scss">
  #app {
    background-color: white !important;
    text-align: center;
    padding-top: 25px;
  }
  #app h1, 
  #app h2 {
    color: black !important;
  }
</style>