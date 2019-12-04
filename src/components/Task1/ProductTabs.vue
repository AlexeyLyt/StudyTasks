<template>
    <div>
        <span class="tab"
        :class="{ activeTab: selectedTab === tab}"
        v-for="(tab, index) in tabs" :key="index"
        @click="selectedTab = tab">
        {{ tab }}</span>

        <div v-show="selectedTab === 'Reviews'">
          <h2 class="h2-review">Reviews</h2>
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul>
            <li v-for="(review, idx) in reviews" :key="idx">
              <p>Name: {{ review.name }}</p>
              <p>Comment: {{ review.review }}</p>
              <p>Rating: {{ review.rating }}</p>
            </li>
          </ul>
        </div>

        <ProductReview 
        v-show="selectedTab === 'Make a Review'"/>

    </div>
</template>

<script>
import ProductReview from '@/components/Task1/ProductReview.vue'
export default {
  props: {
      reviews: {
          type: Array,
          required: true
      }
  },
  components: {
      ProductReview
  },
  name: 'ProductTabs',
  data () {
      return {
          tabs: ['Reviews', 'Make a Review'],
          selectedTab: 'Reviews'
      }
  }
}
</script>

<style scoped lang="scss">

  .tab {
    margin-right: 14px;
    cursor: pointer;
    background: #1e95ea;
    padding: 10px;
    color: white;
  }

  .activeTab {
    color: black;
    font-weight: bold;
    text-decoration: underline;
  }

  .h2-review {
    margin-top: 25px;
  }

</style>