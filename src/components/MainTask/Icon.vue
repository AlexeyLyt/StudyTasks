<template>
  <div class="weather-icon-container">
    <!-- {{iconType}} -->
    <div v-if="iconType === 'Atmosphere'" class="icon sun-shower">
        <div class="cloud"></div>
        <div class="sun">
            <div class="rays"></div>
        </div>
        <div class="rain"></div>
    </div>

    <div v-if="iconType === 'Thunderstorm'" class="icon thunder-storm">
        <div class="cloud"></div>
        <div class="lightning">
            <div class="bolt"></div>
            <div class="bolt"></div>
        </div>
    </div>
    <!-- {{iconType}} -->
    <div v-if="iconType === 'Clouds'" class="icon cloudy">
        <div class="cloud"></div>
        <div class="cloud"></div>
    </div>

    <div v-if="iconType === 'Snow'" class="icon flurries">
        <div class="cloud"></div>
        <div class="snow"> 
            <div class="flake"></div>
            <div class="flake"></div>
        </div>
    </div>

    <div v-if="iconType === 'Clear'" class="icon sunny">
        <div class="sun">
            <div class="rays"></div>
        </div>
    </div>

    <div
    v-if="iconType === 'Drizzle' ||
    iconType === 'Rain'" class="icon rainy">
        <div class="cloud"></div>
        <div class="rain"></div>
    </div>
    
  </div>
</template>

<script>
// import MainTaskComp from '@/components/MainTask/MainTaskComp.vue'
export default {
  components: {
    // MainTaskComp
  },
  props: ['iconType']
  ,
  data () {
    return {
    //   usernames: ['hootlex', 'rahaug', 'sdras', 'akryum', 'BlackHole1']
    }
  },
  mounted() {
      /* eslint-disable no-console */
      console.log(typeof(this.iconType),  111);
      
  }
}
</script>>

<style scoped lang="scss">

// .weather {
//     height: 100vh;
//     width: 100vw;
//     background: #161616;
// }

</style>
