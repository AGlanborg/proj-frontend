<template>
  <Read />
</template>

<script>
import Read from './components/Read.vue'

export default {
  name: 'App',
  components: {
    Read
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Tienne&display=swap");

body {
  margin: 0;
  padding: 0;
  background-color: rgb(55, 55, 80);
  color: rgb(255, 255, 255);
  font-family: "Tienne", "serif";
}

select,
input {
  color: rgb(255, 255, 255);
}
</style>
