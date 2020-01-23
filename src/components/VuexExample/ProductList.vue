<template>
  <ul>
    <li
    class="lili"
      v-for="product in products"
      :key="product.id">
      {{ product.title }} - {{ product.price }}
      <br>
      <button
        :disabled="!product.inventory"
        @click="addProductToCart(product)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: mapState({
    products: state => state.products.all
  }),
  methods: mapActions('cart', [
    'addProductToCart'
  ]),
  created () {
    this.$store.dispatch('products/getAllProducts')
  }
}
</script>

<style scoped lang="scss">
    li {
        justify-content: center !important;
        margin: 10px 0;
    }
    button {
        margin-left: 15px;
    }
</style>