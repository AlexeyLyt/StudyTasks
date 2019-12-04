<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Nav />
    <div class="cart">
      <p>Cart({{ cart.length }})</p>
    </div>
    <ProductApp :premium="premium" 
    @add-to-cart="updateCart" @remove-from-cart="removeItem"></ProductApp>
    <!-- <ProductApp/> -->
    <!-- <ProductApp/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import ProductApp from '@/components/Task1/ProductApp.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'home',
  components: {
    ProductApp,
    Nav
  },
  props: {
    premium: {
      type: Boolean
      // required: true
    }
  },
  data () {
    return {
      cart: []
    }
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeItem(id) {
      for(var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1);
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  
   .cart {
    margin-right: 25px;
    float: right;
    border: 1px solid #d8d8d8;
    padding: 5px 20px;
  }

</style>
