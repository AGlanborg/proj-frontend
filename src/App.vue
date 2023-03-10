<template>
  <Read class="read" :class="create ? 'minRead' : ''" :create="create" @toggleCreate="toggleCreate"/>
  <Create class="create" :class="create ? 'maxCreate' : ''" />
</template>

<script>
import Read from "./components/Read.vue";
import Create from "./components/Create.vue";

export default {
  name: "App",
  components: {
    Read,
    Create,
  },
  data() {
    return {
      create: false,
    };
  },
  methods: {
    toggleCreate() {
      this.create ? (this.create = false) : (this.create = true);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Tienne&display=swap");
@import "material-icons/iconfont/material-icons.css";

body {
  margin: 0;
  padding: 0;
  background-color: rgb(55, 55, 80);
}

body,
select,
input,
textarea {
  font-family: "Tienne", "serif";
  color: rgb(255, 255, 255);
}

.read {
  position: relative;
  transition: 1s;
  left: 0;
}

.minRead {
  left: -96vw;
}

.create {
  position: relative;
  transition: 1s;
  top: -100vh;
  left: 100vw;
}

.maxCreate {
  left: 4vw;
}
</style>
