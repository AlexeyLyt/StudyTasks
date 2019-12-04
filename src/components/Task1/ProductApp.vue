<template>
  <div class="hello">

    <div class="nav-bar"></div>
    <div class="product">
      <div class="product-image">
        <img :src="image">
      </div>
      <!-- console.log({{image}}); -->
      
      <div class="product-info">
        <h1>{{ title }}</h1>
        <a :href="link" target="_blank">More products like this</a>
        <p v-if="inStock">In stock</p>
        <!-- <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p> -->
        <p v-else :class="{ outOfStock: !inStock }">Out of stock</p>
        <p>Shipping: {{ shipping }}</p>
        <!-- <span v-if="onSale">On Sale!</span> -->

        <ul>
          <li v-for="(detail, idx) in details" v-bind:key="idx">
            {{ detail }}
          </li>
        </ul>

        <div class="color-sock" v-for="(variant, index) in variants" 
        v-bind:key="variant.variantId"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)">
        </div>

        <button v-on:click="addToCart" 
        :disabled="!inStock"
        :class="{disabledButton: !inStock}">Add to Cart</button>
        <button @click="removeFromCart">Remove from cart</button>

        <ProductTabs :reviews="reviews"/>

      </div>
    </div>

  </div>
</template>

<script>
import ProductTabs from '@/components/Task1/ProductTabs.vue'
import {eventBus} from '../../main.js' // подключение eventBus с main.js
export default {
  name: 'ProductApp',
  components: {
    // ProductReview,
    ProductTabs
  },
  data() {
    return {
      premium: false, // true - шиппинг бесплатный, false - шиппинг 2.99
      // cart: 0,
      brand: "Vue Mastery",
      product: 'Socks',
      selectedVariant: 0, 
      link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      // inStock: false,
      // onSale: true
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: require('../../assets/green.jpg'), // обязательно использовать require !
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: require('../../assets/blue.jpg'), // обязательно использовать require !
          variantQuantity: 0
        }
      ],
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart: function() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    },
    // removeFromCart() {
    //   this.$emit('remove-from-cart')
    // },
    updateProduct(index) {
      this.selectedVariant = index
    }
    // updateCart() {
    //   this.cart += 1
    // }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      return 2.99
    }
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {  // ??????????????????????
      this.reviews.push(productReview)
    })
  }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .product {
    display: flex;
    flex-flow: wrap;
    padding: 1rem;
  }

  img {
    border: 1px solid #d8d8d8;
    width: 70%;
    margin: 15px 40px 40px 40px;
    box-shadow: 0px .5px 1px #d8d8d8;
  }
  
  .product-image {
    width: 80%;
  }
  
  .product-image,
  .product-info {
    margin-top: 10px;
    width: 45%;
  }
  
  .color-box {
    width: 40px;
    height: 40px;
    margin-top: 5px;
  }


  .color-sock {
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-top: 5px;
  }
  
  button {
    margin-top: 30px;
    border: none;
    background-color: #1E95EA;
    color: white;
    height: 40px;
    min-width: 100px;
    margin: 30px 10px 20px 0px;
    font-size: 14px;
  } 
  
  .disabledButton {
    background-color: #d8d8d8;
  }

  .outOfStock {
    text-decoration: line-through;
  }
</style>
