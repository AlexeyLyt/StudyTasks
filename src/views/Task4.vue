<template>
  <div class="about">

    <Nav></Nav>
    <h1 class="title-git">GitHub Profiles</h1>
    <div class="ui cards">
      <Task4Comp
        v-for="(username, idx) in usernames"
        :key="idx"
        :username="username"
      ></Task4Comp>
      </div> 
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Task4Comp from '@/components/Task4/Task4Comp.vue'
export default {
  components: {
    Nav,
    Task4Comp
  },
  data () {
    return {
      usernames: ['hootlex', 'rahaug', 'sdras', 'akryum', 'BlackHole1']
    }
  }
}
</script>>

<style lang="scss">

.title-git {
  margin-left: 25px;
}

.ui.cards {
  margin: -0.875em 1em;
}

</style>
