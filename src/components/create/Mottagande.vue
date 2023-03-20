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
        <option disabled></option>
        <option>Ny</option>
      </select>
      <label for="kopare"> Köpare </label>
      <select id="kopare" :value="shell.kopare" @change="onKopare($event)">
        <option disabled></option>
        <option>Ny</option>
      </select>
      <label for="arbetstyp"> Arbetstyp </label>
      <select id="arbetstyp" :value="shell.arbetstyp" @change="onArb($event)">
        <option disabled></option>
        <option>Ny</option>
      </select>
      <label for="antal"> Antal Poster </label>
      <input type="number" lang="sv" id="antal" disabled :value="shell.antal" />
      <label for="typ"> Typ </label>
      <select id="typ" :value="shell.typ" @change="$emit('onTyp', $event)">
        <option disabled></option>
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
        :class="expandSal || expandKop || expandArb ? 'expandNew' : ''"
      >
        <New
          v-if="expandSal"
          :title="'Ny Säljare'"
          :rst="salRST"
          :cop="salCop"
          :kontakt="salKontakt"
          :chosen="salChosen"
          @updRST="updSalRST"
          @updCop="updSalCop"
          @updKontakt="updSalKontakt"
          @updChosen="updSalChosen"
        />
        <New
          v-else-if="expandKop"
          :title="'Ny Köpare'"
          :rst="kopRST"
          :cop="kopCop"
          :kontakt="kopKontakt"
          :chosen="kopChosen"
          @updRST="updKopRST"
          @updCop="updKopCop"
          @updKontakt="updKopKontakt"
          @updChosen="updKopChosen"
        />
        <div class="new" v-else>
          <h2>Ny Arbetstyp</h2>
          <div>
            <div class="newText">
              <label for="rst"> Tillverkare </label>
              <div class="newSelect">
                <input
                  type="text"
                  lang="sv"
                  id="rst"
                  v-model="tillverkare"
                  @input="checkFilled"
                />
              </div>
            </div>
          </div>
          <div>
            <div class="newText">
              <label for="rst"> Förkortning arbetstyp </label>
              <div class="newSelect">
                <input
                  type="text"
                  lang="sv"
                  id="rst"
                  v-model="forkortning"
                  @input="checkFilled"
                />
              </div>
            </div>
          </div>
          <div class="newButton">
            <input
              type="button"
              :value="'Skapa ' + forkortning"
              :class="newFilled ? '' : 'disabeled'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import New from "./sections/New.vue";

export default {
  name: "Create-mottagande",
  components: {
    New,
  },
  props: {
    shell: Object,
  },
  data() {
    return {
      expandSal: false,
      expandKop: false,
      expandArb: false,
      salRST: "",
      salCop: "",
      salKontakt: "",
      salChosen: true,
      kopRST: "",
      kopCop: "",
      kopKontakt: "",
      kopChosen: true,
      newFilled: false,
      tillverkare: "",
      forkortning: "",
    };
  },
  methods: {
    checkFilled() {
      if (this.tillverkare != "" && this.forkortning != "") {
        this.newFilled = true;
      } else {
        this.newFilled = false;
      }
    },
    onSaljare(event) {
      this.$emit("onSaljare", event);

      if (event.target.value == "Ny") {
        this.expandSal = true;
      }

        this.expandKop = false;
        this.expandArb = false;
    },
    onKopare(event) {
      this.$emit("onKopare", event);

      if (event.target.value == "Ny") {
        this.expandKop = true;
      }

        this.expandSal = false;
        this.expandArb = false;
    },
    onArb(event) {
      this.$emit("onArb", event);

      if (event.target.value == "Ny") {
        this.expandArb = true;
      }

        this.expandSal = false;
        this.expandKop = false;
    },
    updSalRST(val) {
      this.salRST = val;
    },
    updSalCop(val) {
      this.salCop = val;
    },
    updSalKontakt(val) {
      this.salKontakt = val;
    },
    updSalChosen() {
      this.salChosen = !this.salChosen;
    },
    updKopRST(val) {
      this.kopRST = val;
    },
    updKopCop(val) {
      this.kopCop = val;
    },
    updKopKontakt(val) {
      this.kopKontakt = val;
    },
    updKopChosen() {
      this.kopChosen = !this.kopChosen;
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/create.css";
@import "@/assets/css/new.css";
</style>
