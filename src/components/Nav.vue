<template>
    <div>
        <div class="nav-bar">
          <router-link to="/">MainTask</router-link> |
          <router-link to="/Task1">Task 1</router-link> |
          <router-link to="/Task2">Task2</router-link> |
          <router-link to="/Task3">Task3</router-link> |
          <router-link to="/Task4">Task4</router-link>
        </div>
    </div>
    
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style scoped lang="scss">

  .nav-bar {
    background: linear-gradient(-90deg, #84CF6A, #16C0B0);
    height: 60px;
    margin-bottom: 15px;
    padding-left: 25px;
  }

  .nav-bar a {
    line-height: 60px;
    color: black !important;
    &:hover {
      color: #deff00 !important;
    }
    &:active {
      color: white !important;
    }
  }

</style>