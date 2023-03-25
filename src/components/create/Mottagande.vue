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
      <select
        id="saljare"
        :value="shell.saljare.saljare_id"
        @change="onSaljare($event)"
      >
        <option selected disabled hidden :value="shell.saljare.saljare_id">
          <div v-if="shell.saljare.saljare_id == 'Ny'">Ny</div>
          <div v-else>
            <div v-if="shell.saljare.name">
              {{ shell.saljare.rst }}
            </div>
            <div v-else>
              {{ shell.saljare.copernicus }}
            </div>
          </div>
        </option>
        <option
          v-for="inst in saljare"
          v-bind:key="inst.saljare_id"
          :value="inst.saljare_id"
        >
          <div v-if="inst.name">
            {{ inst.rst }}
          </div>
          <div v-else>
            {{ inst.copernicus }}
          </div>
        </option>
        <option>Ny</option>
      </select>
      <label for="kopare"> Köpare </label>
      <select
        id="kopare"
        :value="shell.kopare.kopare_id"
        @change="onKopare($event)"
      >
        <option selected disabled hidden :value="shell.kopare.kopare_id">
          <div v-if="shell.kopare.kopare_id == 'Ny'">Ny</div>
          <div v-else>
            <div v-if="shell.kopare.name">
              {{ shell.kopare.rst }}
            </div>
            <div v-else>
              {{ shell.kopare.copernicus }}
            </div>
          </div>
        </option>
        <option
          v-for="inst in kopare"
          v-bind:key="inst.kopare_id"
          :value="inst.kopare_id"
        >
          <div v-if="inst.name">
            {{ inst.rst }}
          </div>
          <div v-else>
            {{ inst.copernicus }}
          </div>
        </option>
        <option>Ny</option>
      </select>
      <label for="arbetstyp"> Arbetstyp </label>
      <select
        id="arbetstyp"
        :value="shell.arbetstyp.arbetstyp_id"
        @change="onArb($event)"
      >
        <option selected disabled hidden :value="shell.arbetstyp.arbetstyp_id">
          <div v-if="shell.arbetstyp.arbetstyp_id == 'Ny'">Ny</div>
          <div v-else>
            {{ shell.arbetstyp.arbetstyp }}
          </div>
        </option>
        <option
          v-for="inst in arbetstyp"
          v-bind:key="inst.arbetstyp_id"
          :value="inst.arbetstyp_id"
        >
          {{ inst.arbetstyp }}
        </option>
        <option>Ny</option>
      </select>
      <label for="antal"> Antal Poster </label>
      <input type="number" lang="sv" id="antal" disabled :value="shell.antal" />
      <label for="typ"> Typ </label>
      <select id="typ" :value="shell.typ" @change="$emit('onTyp', $event)">
        <option selected disabled hidden>{{ shell.typ }}</option>
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
      <label for="text"> Text På Internfaktura </label>
      <textarea id="text" :value="shell.text" @input="$emit('onText', $event)">
      </textarea>
      <label for="info"> Kontaktinfo </label>
      <textarea id="info" :value="shell.info" @input="$emit('onInfo', $event)">
      </textarea>
    </div>
    <div class="newForm">
      <div class="newContainer" :class="sal || kop || arb ? 'expandNew' : ''">
        <New v-if="sal" :title="'Ny Säljare'" :rep="'saljare'" />
        <New v-else-if="kop" :title="'Ny Köpare'" :rep="'kopare'" />
        <Arb v-else-if="arb" />
      </div>
    </div>
  </div>
</template>

<script>
import New from "./sections/New.vue";
import Arb from "./sections/Arb.vue";

import get from "@/assets/scripts/requests/get";

export default {
  name: "Create-mottagande",
  components: {
    New,
    Arb,
  },
  props: {
    shell: Object,
    empty: Object,
  },
  data() {
    return {
      saljare: [],
      sal: false,
      kopare: [],
      kop: false,
      arbetstyp: [],
      arb: false,
    };
  },
  methods: {
    onSaljare(event) {
      if (event.target.value == "Ny") {
        this.sal = true;
        this.kop = false;
        this.arb = false;
      } else {
        this.sal = false
      }

      this.$emit("onSaljare", event);
    },
    onKopare(event) {
      if (event.target.value == "Ny") {
        this.kop = true;
        this.sal = false;
        this.arb = false;
      } else {
        this.kop = false
      }

      this.$emit("onKopare", event);
    },
    onArb(event) {
      if (event.target.value == "Ny") {
        this.arb = true;
        this.sal = false;
        this.kop = false;
      } else {
        this.arb = false
      }

      this.$emit("onArb", event);
    },
  },
  async mounted() {
    this.saljare = (await get("saljare")) || [];
    this.kopare = (await get("kopare")) || [];
    this.arbetstyp = (await get("arbetstyp")) || [];
  },
};
</script>

<style scoped>
@import "@/assets/css/create.css";
@import "@/assets/css/new.css";
</style>
