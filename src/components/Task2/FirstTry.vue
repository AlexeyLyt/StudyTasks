<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="(product, idx) in products" v-bind:key="idx"> <!-- idx решает варн из консоли (???) -->
          {{ product.name }} - <input type="number" v-model.number="product.quantity"> шт.
          <button @click="product.quantity += 1">
            Add
          </button>
          <span v-if="product.quantity === 0">
              - НЕТ В НАЛИЧИИ
          </span>
      </li>
  </ul>
  <h2>Всего товаров в наличии: {{ totalProducts }}</h2>
  </div>
</template>

<script>
export default {
  name: 'hello',
  props: {
    msg: String
  },
  data() {
    return {
      products: [
          // 'Boots',
          // 'Jacket',
          // 'Hiking Socks'
      ]
    }
  },
  computed: {
      totalProducts () {
          return this.products.reduce((sum, product) => {
              return sum + product.quantity
          }, 0 /* Initial Value - начальное значение */ ) 
      }
  },
  created () {
      fetch('https://api.myjson.com/bins/74l63')
      .then(response => response.json())
      .then(json => {
          this.products = json.products
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.hello {
  padding-left: 25px;
}

li {
  max-width: 550px;
  // text-align: center;
  list-style-type: none;
}

ul {
  // text-align: -webkit-center;
  padding: 0;
}

input {
  width: 80px;
  text-align: center;
  padding-left: 15px;
}
</style>
