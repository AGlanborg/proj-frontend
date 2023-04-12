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
        @change="onSaljare($event.target.value)"
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
        @change="onKopare($event.target.value)"
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
        @change="onArb($event.target.value)"
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
      <select
        id="typ"
        :value="shell.typ"
        @change="$emit('onTyp', $event.target.value)"
      >
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
        @input="$emit('onLeve', $event.target.value)"
      />
      <label for="text"> Text På Internfaktura </label>
      <textarea
        id="text"
        :value="shell.text"
        @input="$emit('onText', $event.target.value)"
      >
      </textarea>
      <label for="info"> Kontaktinfo </label>
      <textarea
        id="info"
        :value="shell.info"
        @input="$emit('onInfo', $event.target.value)"
      >
      </textarea>
    </div>
    <div class="newForm">
      <div class="newContainer" :class="sal || kop || arb ? 'expandNew' : ''">
        <New
          v-if="sal"
          :title="'Ny Säljare'"
          :rep="'saljare'"
          @createNew="createSaljare"
          @cancel="onSaljare('')"
        />
        <New
          v-else-if="kop"
          :title="'Ny Köpare'"
          :rep="'kopare'"
          @createNew="createKopare"
          @cancel="onKopare('')"
        />
        <Arb
          v-else-if="arb"
          @createArbetstyp="createArbetstyp"
          @cancel="onArb('')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import New from "./sections/New.vue";
import Arb from "./sections/Arb.vue";

export default {
  name: "Create-mottagande",
  components: {
    New,
    Arb,
  },
  props: {
    shell: Object,
    empty: Object,
    saljare: Array,
    kopare: Array,
    arbetstyp: Array,
  },
  data() {
    return {
      sal: false,
      kop: false,
      arb: false,
    };
  },
  methods: {
    onSaljare(value) {
      if (value == "Ny") {
        this.sal = true;
        this.kop = false;
        this.arb = false;
      } else {
        this.sal = false;
      }

      this.$emit("onSaljare", value);
    },
    onKopare(value) {
      if (value == "Ny") {
        this.kop = true;
        this.sal = false;
        this.arb = false;
      } else {
        this.kop = false;
      }

      this.$emit("onKopare", value);
    },
    onArb(value) {
      if (value == "Ny") {
        this.arb = true;
        this.sal = false;
        this.kop = false;
      } else {
        this.arb = false;
      }

      this.$emit("onArb", value);
    },
    createSaljare() {
      this.$emit("reload");
      this.sal = false;
    },
    createKopare() {
      this.$emit("reload");
      this.kop = false;
    },
    createArbetstyp() {
      this.$emit("reload");
      this.arb = false;
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/create.css";
@import "@/assets/css/new.css";
</style>
