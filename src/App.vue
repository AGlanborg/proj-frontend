<template>
  <Read
    class="read"
    :class="create ? 'minRead' : ''"
    :create="create"
    :instances="instances"
    :shell="shell"
    :empty="empty"
    @toggleCreate="create = !create"
    @handleCopy="handleCopy"
    @handleEdit="handleEdit"
  />
  <Create
    class="create"
    :class="create ? 'maxCreate' : ''"
    :create="create"
    :shell="shell"
    @handleClear="handleClear"
    @onSaljare="onSaljare"
    @onKopare="onKopare"
    @onArb="onArb"
    @onTyp="onTyp"
    @onLeve="onLeve"
    @onText="onText"
    @onInfo="onInfo"
    @onValuta="onValuta"
    @onMangd="onMangd"
    @onInprisex="onInprisex"
    @onProcent="onProcent"
    @onFakturanum="onFakturanum"
    @onKommentar="onKommentar"
    @onStart="onStart"
    @onSlut="onSlut"
  />
</template>

<script>
import Read from "./components/Read.vue";
import Create from "./components/Create.vue";

import * as get from "@/assets/scripts/requests/get";

export default {
  name: "App",
  components: {
    Read,
    Create,
  },
  data() {
    return {
      create: false,
      instances: [],
      shell: {
        main_id: "",
        saljare: "",
        kopare: "",
        arbetstyp: "",
        antal: "1",
        typ: "",
        leverantor: "",
        text: "",
        info: "Vid frågor maila Licensdesken xxx@xxx.se",
        valuta: "SEK",
        mangd: "1",
        inprisex: "1",
        inprisin: "1.25",
        procent: "5",
        oh: "0.0625",
        totalt: "1.3125",
        fakturanum: "",
        kommentar: "",
        inpris: "0",
        start: "",
        slut: "",
        perioder: "0",
        internfakt: "0",
        upfront: "0",
        rest: "0",
        intakt: "0",
        scan: "0",
        now: "",
      },
      empty: {},
    };
  },
  methods: {
    handleCopy(id) {
      this.shell = this.instances.find((item) => item.main_id == id);
      this.shell.main_id = "";
      this.create = true;
    },
    handleEdit(id) {
      this.shell = this.instances.find((item) => item.main_id == id);
      this.create = true;
      console.log(this.shell)
    },
    handleClear() {
      this.shell = this.empty;
    },
    updContent() {
      this.shell.inprisin = parseFloat(
        Math.round(this.shell.inprisex * 1.25 * 100) / 100
      ).toFixed(2);
      this.shell.oh = parseFloat(
        Math.round(this.shell.inprisin * (this.shell.procent / 100) * 100) / 100
      ).toFixed(2);
      this.shell.totalt = parseFloat(
        Math.round(
          parseFloat(this.shell.mangd) *
            (parseFloat(this.shell.inprisin) + parseFloat(this.shell.oh)) *
            100
        ) / 100
      ).toFixed(2);
      this.shell.inpris = parseFloat(Math.round(this.shell.totalt)).toFixed(2);

      this.updPerioder();
    },
    updPerioder() {
      const start = this.shell.start.split("-");
      const slut = this.shell.slut.split("-");
      this.shell.perioder =
        12 * (parseInt(slut[0]) - parseInt(start[0])) +
        parseInt(slut[1]) -
        parseInt(start[1]) +
        1;

      this.updInternfakt();
    },
    updInternfakt() {
      this.shell.internfakt = Math.round(
        this.shell.totalt / this.shell.perioder
      );
      this.updUpfront();
    },
    updUpfront() {
      const start = this.shell.start.split("-");
      const now = this.shell.now.split("-");

      this.upfront =
        12 * (parseInt(now[0]) - parseInt(start[0])) +
        parseInt(now[1]) -
        parseInt(start[1]) +
        1;

      if (this.shell.upfront < 0) {
        this.shell.upfront = 0;
      }

      this.shell.rest = this.shell.perioder - this.shell.upfront;
      this.updScan();
    },
    updScan() {
      this.shell.intakt =
        this.shell.upfront * this.shell.internfakt +
        this.shell.rest * this.shell.internfakt;
      this.shell.scan =
        this.shell.internfakt * this.shell.perioder - this.shell.inpris;
    },
    onSaljare(event) {
      this.shell.saljare = event.target.value;

      if (this.shell.kopare == "Ny") {
        this.shell.kopare = "";
      }
      if (this.shell.arbetstyp == "Ny") {
        this.shell.arbetstyp = "";
      }
    },
    onKopare(event) {
      this.shell.kopare = event.target.value;

      if (this.shell.saljare == "Ny") {
        this.shell.saljare = "";
      }
      if (this.shell.arbetstyp == "Ny") {
        this.shell.arbetstyp = "";
      }
    },
    onArb(event) {
      this.shell.arbetstyp = event.target.value;

      if (this.shell.saljare == "Ny") {
        this.shell.saljare = "";
      }
      if (this.shell.kopare == "Ny") {
        this.shell.kopare = "";
      }
    },
    onTyp(event) {
      this.shell.typ = event.target.value;

      if (this.shell.text.split(" ")[0].includes("kostnad")) {
        this.shell.text =
          this.shell.typ +
          "kostnad " +
          this.shell.text.split(" ").slice(1).join(" ");
      } else {
        this.shell.text = this.shell.typ + "kostnad " + this.shell.text;
      }
    },
    onLeve(event) {
      this.shell.leverantor = event.target.value;
    },
    onText(event) {
      this.shell.text = event.target.value;
    },
    onInfo(event) {
      this.shell.info = event.target.value;
    },
    onValuta(event) {
      this.shell.valuta = event.target.value;
    },
    onMangd(event) {
      this.shell.mangd = event.target.value;
      this.updContent();
    },
    onInprisex(event) {
      this.shell.inprisex = event.target.value;
      this.updContent();
    },
    onProcent(event) {
      this.shell.procent = event.target.value;
      this.updContent();
    },
    onFakturanum(event) {
      this.shell.fakturanum = event.target.value;
    },
    onKommentar(event) {
      this.shell.kommentar = event.target.value;
    },
    onStart(event) {
      this.shell.start = event.target.value;
      this.updPerioder();
    },
    onSlut(event) {
      this.shell.slut = event.target.value;
      this.updPerioder();
    },
  },
  async mounted() {
    const content = await get.all();
    this.instances = content;

    let now = new Date();
    if (now.getMonth().toString().length < 2) {
      now = now.getFullYear() + "-0" + (now.getMonth() + 1);
    } else {
      now = now.getFullYear() + "-" + now.getMonth();
    }

    this.shell.start = now;
    this.shell.slut = now;
    this.shell.now = now;
    this.empty = this.shell;

    this.updContent();
    this.updPerioder();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lora");
@import url("https://fonts.googleapis.com/css2?family=Roboto%20Serif");
@import url("https://fonts.googleapis.com/css2?family=Tienne");
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
  font-family: "Lora", "Roboto Serif", "Roboto", "Tienne", "serif";
  color: rgb(255, 255, 255);
}

button {
  all: unset;
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
