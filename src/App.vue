<template>
  <div id="app">

    <keep-alive> <!-- Кэширует компоненты -->
    <router-view/>
    </keep-alive>
    
  </div>
</template>

<style lang="scss">
@import "./styles/styles.css";

#app {
  width: 100vw;
  height: 100vh;
  font-family: tahoma;
  color:#282828;
  margin: 0px;
  overflow-x: hidden;
}

body {
  margin: 0px;
}
</style>
