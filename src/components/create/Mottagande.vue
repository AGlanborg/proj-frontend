<template>
  <div class="createContent">
    <div class="createTitleContainer">
      <h2 class="createTitle">Köpare, Säljare</h2>
      <p class="createSubTitle">
        Mottagande av periodens kostnader och produktbeskrivning
      </p>
    </div>
    <div class="createForm">
      <label for="now"> Verifikationer avser Internfaktureringsperiod: </label>
      <input type="month" lang="sv" id="now" disabled :value="shell.now" />
      <label for="saljare"> Säljare </label>
      <select id="saljare" :value="shell.saljare" @change="onSaljare($event)">
        <option>{{ shell.saljare }}</option>
        <option>Ny</option>
      </select>
      <label for="kopare"> Köpare </label>
      <select id="kopare" :value="shell.kopare" @change="onKopare($event)">
        <option>{{ shell.kopare }}</option>
        <option>Ny</option>
      </select>
      <label for="arbetstyp"> Arbetstyp </label>
      <select id="arbetstyp" :value="shell.arbetstyp" @change="onArb($event)">
        <option>{{ shell.arbetstyp }}</option>
        <option>Ny</option>
      </select>
      <label for="antal"> Antal Poster </label>
      <input type="number" lang="sv" id="antal" disabled :value="shell.antal" />
      <label for="typ"> Typ </label>
      <select id="typ" :value="shell.typ" @change="$emit('onTyp', $event)">
        <option>{{ shell.typ }}</option>
        <option>Licens</option>
        <option>Support</option>
        <option>Service</option>
      </select>
      <label for="leverantor"> Leverantör </label>
      <input
        type="text"
        lang="sv"
        id="leverantor"
        :value="shell.leverantor"
        @input="$emit('onLeve', $event)"
      />
      <label for="text"> Text </label>
      <textarea id="text" :value="shell.text" @input="$emit('onText', $event)">
      </textarea>
      <label for="info"> Kontaktinfo </label>
      <textarea id="info" :value="shell.info" @input="$emit('onInfo', $event)">
      </textarea>
    </div>
    <div class="newForm">
      <div
        class="newContainer"
        :class="saljare || kopare || arbetstyp ? 'expandNew' : ''"
      >
        <New
          v-if="saljare"
          :title="'Ny Säljare'"
          :rep="'saljare'"
        />
        <New
          v-if="kopare"
          :title="'Ny Köpare'"
          :rep="'kopare'"
        />
        <Arb v-if="arbetstyp" />
      </div>
    </div>
  </div>
</template>

<script>
import New from "./sections/New.vue";
import Arb from "./sections/Arb.vue"

export default {
  name: "Create-mottagande",
  components: {
    New,
    Arb
  },
  props: {
    shell: Object,
  },
  data() {
    return {
      saljare: false,
      kopare: false,
      arbetstyp: false,
    };
  },
  methods: {
    onSaljare(event) {
      if (event.target.value == "Ny") {
        this.saljare = true
      }

      this.kopare = false
      this.arbetstyp = false

      this.$emit("onSaljare", event)
    },
    onKopare(event) {
      if (event.target.value == "Ny") {
        this.kopare = true
      }

      this.saljare = false
      this.arbetstyp = false

      this.$emit("onKopare", event)
    },
    onArb(event) {
      if (event.target.value == "Ny") {
        this.arbetstyp = true
      }

      this.saljare = false
      this.kopare = false

      this.$emit("onArb", event)
    }
  }
};
</script>

<style scoped>
@import "@/assets/css/create.css";
@import "@/assets/css/new.css";
</style>
