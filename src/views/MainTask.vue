<template>
  <div class="weather">

    <Nav/>
    <MainTaskComp/>
    
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import MainTaskComp from '@/components/MainTask/MainTaskComp.vue'
export default {
  components: {
    Nav,
    MainTaskComp
  },
  data () {
    return {
    //   usernames: ['hootlex', 'rahaug', 'sdras', 'akryum', 'BlackHole1']
    }
  }
}
</script>>

<style scoped lang="scss">

.weather {
    height: 100vh;
    width: 100vw;
    background: #161616;
}

</style>
