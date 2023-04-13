<template>
  <Read
    class="read"
    :class="{ minRead: create }"
    :create="create"
    :instances="instances"
    :shell="shell"
    :saljare="saljare"
    :kopare="kopare"
    :arbetstyp="arbetstyp"
    :empty="empty"
    :now="now"
    @toggleCreate="create = !create"
    @handleClear="handleClear"
    @handleCopy="handleCopy"
    @handleEdit="handleEdit"
    @reload="reload"
  />
  <Create
    class="create"
    :class="{ maxCreate: create }"
    :create="create"
    :shell="shell"
    :empty="empty"
    :saljare="saljare"
    :kopare="kopare"
    :arbetstyp="arbetstyp"
    @toggleCreate="create = !create"
    @handleClear="handleClear"
    @onSaljare="onSaljare"
    @onKopare="onKopare"
    @onArb="onArb"
    @onTyp="onTyp"
    @onLeve="(value) => (shell.leverantor = value)"
    @onText="(value) => (shell.text = value)"
    @onInfo="(value) => (shell.info = value)"
    @onValuta="(value) => (shell.valuta = value)"
    @onMangd="
      (value) => {
        shell.mangd = value;
        updContent();
      }
    "
    @onInprisex="
      (value) => {
        shell.inprisex = value;
        updContent();
      }
    "
    @onProcent="
      (value) => {
        shell.procent = value;
        updContent();
      }
    "
    @onFakturanum="(value) => (shell.fakturanum = value)"
    @onKommentar="(value) => (shell.kommentar = value)"
    @onStart="
      (value) => {
        shell.start = value;
        updContent();
      }
    "
    @onSlut="
      (value) => {
        shell.slut = value;
        updContent();
      }
    "
    @reload="reload"
  />
</template>

<script>
import Read from "./components/Read.vue";
import Create from "./components/Create.vue";

import get from "@/assets/scripts/requests/get";

export default {
  name: "App",
  components: {
    Read,
    Create,
  },
  data() {
    return {
      create: false,
      now: "",
      instances: [],
      saljare: [],
      kopare: [],
      arbetstyp: [],
      shell: {
        main_id: "",
        saljare: {
          saljare_id: "",
          rst: "",
          copernicus: "",
          kontakt: "",
          name: "",
        },
        kopare: {
          kopare_id: "",
          rst: "",
          copernicus: "",
          kontakt: "",
          name: "",
        },
        arbetstyp: {
          arbetstyp_id: "",
          arbetstyp: "",
          tillverkare: "",
        },
        antal: "1",
        typ: "",
        leverantor: "",
        text: "",
        info: "Vid frågor maila Licensdesken xxx@xxx.se",
        valuta: "SEK",
        mangd: "1",
        inprisex: "0",
        inprisin: "0.00",
        procent: "5",
        oh: "0.00",
        totalt: "0.00",
        fakturanum: "",
        kommentar: "",
        inpris: 0,
        start: "",
        slut: "",
        perioder: 1,
        internfakt: 0,
        upfront: 1,
        rest: 0,
        intakt: 0,
        scan: 0,
        now: "",
      },
      empty: {},
    };
  },
  methods: {
    handleCopy(id) {
      const obj = this.instances.find((item) => item.main_id == id)

      this.shell = {...obj}
      this.shell.saljare = {...obj.saljare}
      this.shell.kopare = {...obj.kopare}
      this.shell.arbetstyp = {...obj.arbetstyp}
      this.shell.main_id = "";

      this.create = true;
    },
    handleEdit(id) {
      const obj = this.instances.find((item) => item.main_id == id)

      this.shell = {...obj}
      this.shell.saljare = {...obj.saljare}
      this.shell.kopare = {...obj.kopare}
      this.shell.arbetstyp = {...obj.arbetstyp}

      this.create = true;
    },
    handleForeign() {
      this.instances.forEach((inst) => {
        inst.saljare = this.saljare.find((x) => x.saljare_id == inst.saljare);
        inst.kopare = this.kopare.find((x) => x.kopare_id == inst.kopare);
        inst.arbetstyp = this.arbetstyp.find(
          (x) => x.arbetstyp_id == inst.arbetstyp
        );
      });
    },
    async reload() {
      this.instances = (await get("main")) || [];
      this.saljare = (await get("saljare")) || [];
      this.kopare = (await get("kopare")) || [];
      this.arbetstyp = (await get("arbetstyp")) || [];

      this.handleForeign();
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
          parseInt(this.shell.mangd) *
            (parseFloat(this.shell.inprisin) + parseFloat(this.shell.oh)) *
            100
        ) / 100
      ).toFixed(2);
      this.shell.inpris = Math.round(this.shell.totalt);

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

      this.shell.upfront =
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
    onSaljare(value) {
      if (value == "Ny") {
        this.shell.saljare = { ...this.empty.saljare };
        this.shell.saljare.saljare_id = "Ny";

        if (this.shell.kopare.kopare_id == "Ny") {
          this.shell.kopare = { ...this.empty.kopare };
        }
        if (this.shell.arbetstyp.arbetstyp_id == "Ny") {
          this.shell.arbetstyp = { ...this.empty.arbetstyp };
        }
      } else if (value == "") {
        this.shell.saljare = { ...this.empty.saljare };
      } else {
        this.shell.saljare = this.saljare.find((x) => x.saljare_id == value);
      }
    },
    onKopare(value) {
      if (value == "Ny") {
        this.shell.kopare = { ...this.empty.kopare };
        this.shell.kopare.kopare_id = "Ny";

        if (this.shell.saljare.saljare_id == "Ny") {
          this.shell.saljare = { ...this.empty.salj1are };
        }
        if (this.shell.arbetstyp.arbetstyp_id == "Ny") {
          this.shell.arbetstyp = { ...this.empty.arbetstyp };
        }
      } else if (value == "") {
        this.shell.kopare = { ...this.empty.kopare };
      } else {
        this.shell.kopare = this.kopare.find((x) => x.kopare_id == value);
      }
    },
    onArb(value) {
      if (value == "Ny") {
        this.shell.arbetstyp = { ...this.empty.arbetstyp };
        this.shell.arbetstyp.arbetstyp_id = "Ny";

        if (this.shell.saljare.saljare_id == "Ny") {
          this.shell.saljare = { ...this.empty.saljare };
        }
        if (this.shell.kopare.kopare_id == "Ny") {
          this.shell.kopare = { ...this.empty.kopare };
        }
      } else if (value == "") {
        this.shell.arbetstyp = { ...this.empty.arbetstyp };
      } else {
        this.shell.arbetstyp = this.arbetstyp.find(
          (x) => x.arbetstyp_id == value
        );
      }
    },
    onTyp(value) {
      this.shell.typ = value;

      if (this.shell.text.split(" ")[0].includes("kostnad")) {
        this.shell.text =
          this.shell.typ +
          "kostnad " +
          this.shell.text.split(" ").slice(1).join(" ");
      } else {
        this.shell.text = this.shell.typ + "kostnad " + this.shell.text;
      }
    },
    handleClear() {
      this.shell = { ...this.empty };
      this.shell.saljare = { ...this.empty.saljare };
      this.shell.kopare = { ...this.empty.kopare };
      this.shell.arbetstyp = { ...this.empty.arbetstyp };
    },
  },
  async mounted() {
    this.instances = (await get("main")) || [];
    this.saljare = (await get("saljare")) || [];
    this.kopare = (await get("kopare")) || [];
    this.arbetstyp = (await get("arbetstyp")) || [];

    this.handleForeign();

    let now = new Date();
    if (now.getMonth().toString().length < 2) {
      now = now.getFullYear() + "-0" + (now.getMonth() + 1);
    } else {
      now = now.getFullYear() + "-" + now.getMonth();
    }

    this.shell.start = now;
    this.shell.slut = now;
    this.shell.now = now;
    this.now = now;

    this.empty = { ...this.shell };
    this.empty.saljare = { ...this.shell.saljare };
    this.empty.kopare = { ...this.shell.kopare };
    this.empty.arbetstyp = { ...this.shell.arbetstyp };

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
textarea,
a {
  font-family: "Lora", "Roboto Serif", "Roboto", "Tienne", "serif";
  color: rgb(255, 255, 255);
}

button {
  all: unset;
}

a {
  text-decoration: none;
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
