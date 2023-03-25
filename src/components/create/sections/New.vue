<template>
  <div class="new">
    <h2>{{ title }}</h2>
    <div class="container">
      <div class="newText">
        <label for="rst"> RST nummer </label>
        <div class="newSelect">
          <input
            type="text"
            lang="sv"
            id="rst"
            placeholder="..."
            v-model="rst"
            @input="check"
          />
          <div class="selectButton" @click="chosen = true">
            <span class="material-icons check" v-if="chosen"> check </span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="newText">
        <label for="copernicus"> Copernicus kod </label>
        <div class="newSelect">
          <input
            type="text"
            lang="sv"
            id="copernicus"
            placeholder="..."
            v-model="cop"
            @input="check"
          />
          <div class="selectButton" @click="chosen = false">
            <span class="material-icons check" v-if="!chosen"> check </span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="newText">
        <label for="kontaktperson"> Kontaktperson </label>
        <input
          type="text"
          lang="sv"
          id="kontaktperson"
          placeholder="..."
          v-model="kontakt"
          @input="check"
        />
      </div>
    </div>
    <div class="newButton">
      <input
        type="button"
        :value="'Skapa ' + rst"
        :class="{disabeled: !filled}"
        @click="create"
        v-if="chosen"
      />
      <input
        type="button"
        :value="'Skapa ' + cop"
        :class="{disabeled: !filled}"
        @click="create"
        v-else
      />
    </div>
  </div>
</template>

<script>
import { form } from "@/assets/scripts/requests/post"

export default {
  name: "Create-new",
  props: {
    title: String,
    rep: String
  },
  data() {
    return {
      rst: "",
      cop: "",
      kontakt: "",
      chosen: true,
      filled: false,
    }
  },
  methods: {
    check() {
      if ((this.chosen && this.rst) || (!this.chosen && this.cop)) {
        this.filled = true;
      } else {
        this.filled = false;
      }
    },
    async create() {
      if(this.filled) {
        const data = {data: `'${this.rst}','${this.cop}','${this.kontakt}','${this.chosen ? 1 : 0}'`}

        await form(data, this.rep)

        this.$emit("createNew")
      }
    }
  }
};
</script>

<style scoped>
@import "@/assets/css/new.css";
</style>
