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
        :class="{disabeled: !filled}"
        @click="create"
      />
    </div>
  </div>
</template>

<script>
import { form } from "@/assets/scripts/requests/post"

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
    async create() {
      if(this.filled) {
        const data = {data: `'${this.tillverkare}','${this.forkortning}'`}

        await form(data, 'arbetstyp')

        this.$emit("createArbetstyp")
      }
    }
  },
};
</script>

<style scoped>
@import "@/assets/css/new.css";
</style>
