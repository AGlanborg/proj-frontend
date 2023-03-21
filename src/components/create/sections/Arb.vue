<template>
  <div class="new">
    <h2>Ny Arbetstyp</h2>
    <div class="container">
      <div class="newText">
        <label for="rst"> Tillverkare </label>
          <input
            type="text"
            lang="sv"
            id="rst"
            v-model="tillverkare"
            @input="check"
          />
      </div>
    </div>
    <div class="container">
      <div class="newText">
        <label for="rst"> Förkortning arbetstyp </label>
          <input
            type="text"
            lang="sv"
            id="rst"
            v-model="forkortning"
            @input="check"
          />
      </div>
    </div>
    <div class="newButton">
      <input
        type="button"
        :value="'Skapa ' + forkortning"
        :class="filled ? '' : 'disabeled'"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Create-new",
  data() {
    return {
      tillverkare: "",
      forkortning: "",
      filled: false,
    };
  },
  methods: {
    check() {
      if (this.tillverkare && this.forkortning) {
        this.filled = true;
      } else {
        this.filled = false;
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/new.css";
</style>
