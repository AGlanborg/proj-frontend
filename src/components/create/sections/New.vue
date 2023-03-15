<template>
  <div class="new">
    <h2>{{ title }}</h2>
    <div>
      <div class="newText">
        <label for="rst"> RST nummer </label>
        <div class="newSelect">
          <input
            type="text"
            id="rst"
            placeholder="..."
            :value="rst"
            @input="(event) => handleRST(event)"
          />
          <div class="selectButton" @click="handleChoose()">
            <span class="material-icons check" v-if="chosen"> check </span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="newText">
        <label for="copernicus"> Copernicus kod </label>
        <div class="newSelect">
          <input
            type="text"
            id="copernicus"
            placeholder="..."
            :value="cop"
            @input="(event) => handleCop(event)"
          />
          <div class="selectButton" @click="handleChoose()">
            <span class="material-icons check" v-if="!chosen"> check </span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="newText">
        <label for="kontaktperson"> Kontaktperson </label>
        <input
          type="text"
          id="kontaktperson"
          placeholder="..."
          :value="kontakt"
          @input="(event) => handleKontakt(event)"
        />
      </div>
    </div>
    <div class="newButton">
      <input
        type="button"
        :value="'Skapa ' + rst"
        :class="newFilled ? '' : 'disabeled'"
        v-if="chosen"
      />
      <input
        type="button"
        :value="'Skapa ' + cop"
        :class="newFilled ? '' : 'disabeled'"
        v-else
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Create-new",
  props: {
    title: String,
    rst: String,
    cop: String,
    kontakt: String,
    chosen: Boolean,
  },
  data() {
    return {
      newFilled: false,
    };
  },
  methods: {
    handleRST(event) {
      this.$emit("updRST", event.target.value);
      this.checkFilled();
    },
    handleCop(event) {
      this.$emit("updCop", event.target.value);
      this.checkFilled();
    },
    handleKontakt(event) {
      this.$emit("updKontakt", event.target.value);
      this.checkFilled();
    },
    checkFilled() {
      if (this.rst != "" && this.cop != "" && this.kontakt != "") {
        this.newFilled = true;
      } else {
        this.newFilled = false;
      }
    },
    handleChoose() {
      this.$emit("updChosen");
    },
  },
  mounted() {
    this.checkFilled();
  },
};
</script>

<style scoped>
@import "@/assets/css/new.css";
</style>
