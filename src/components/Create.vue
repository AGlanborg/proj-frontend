<template>
  <div class="createContainer">
    <div class="titleContainer">
      <button class="title" @click="this.title = !this.title">
        <h2>
          Create<span class="material-icons" :class="title ? 'open' : ''"
            >keyboard_arrow_up</span
          >
        </h2>
      </button>
    </div>
    <div class="explain" :class="title ? 'expand' : ''">
      <p class="explainText">
        Under denna rubrik kan lägga till fler rader i databasen. Varje fält är
        kategoriserad och namngiven. Vissa fält är fler-val och vissa går inte
        att ändra på.
      </p>
    </div>
    <div class="createContentContainer" :class="title ? 'minimize' : ''">
      <Mottagande
        :shell="shell"
        @onSaljare="onSaljare"
        @onKopare="onKopare"
        @onArb="onArb"
        @onTyp="onTyp"
        @onLeve="onLeve"
        @onText="onText"
        @onInfo="onInfo"
      />
      <Oh
        :shell="shell"
        @onValuta="onValuta"
        @onMangd="onMangd"
        @onInprisex="onInprisex"
        @onProcent="onProcent"
        @onFakturanum="onFakturanum"
        @onKommentar="onKommentar"
      />
      <Periodisering :shell="shell" @onStart="onStart" @onSlut="onSlut" />
      <div class="createButtonContainer">
        <button class="createButton">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import Mottagande from "./create/Mottagande.vue";
import Oh from "./create/Oh.vue";
import Periodisering from "./create/Periodisering.vue";

export default {
  name: "Main-create",
  components: {
    Mottagande,
    Oh,
    Periodisering,
  },
  data() {
    return {
      title: false,
      shell: {
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
        perioder: 0,
        internfakt: 0,
        upfront: 0,
        rest: 0,
        intakt: 0,
        scan: 0,
        now: "",
      },
    };
  },
  methods: {
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
      this.shell.internfakt = Math.round(this.shell.totalt / this.shell.perioder);
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
        this.shell.upfront * this.shell.internfakt + this.shell.rest * this.shell.internfakt;
      this.shell.scan = this.shell.internfakt * this.shell.perioder - this.shell.inpris;
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
          this.shell.typ + "kostnad " + this.shell.text.split(" ").slice(1).join(" ");
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
  mounted() {
    let now = new Date();
    if (now.getMonth().toString().length < 2) {
      now = now.getFullYear() + "-0" + (now.getMonth() + 1);
    } else {
      now = now.getFullYear() + "-" + now.getMonth();
    }

    this.shell.start = now;
    this.shell.slut = now;
    this.shell.now = now;

    this.updContent();
    this.updPerioder();
  },
};
</script>

<style scoped>
.titleContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 10vh;
  width: 100%;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  height: 60px;
  width: 285px;
  padding-left: 40px;
  line-height: 0;
}

.title > h2 {
  font-size: 40px;
  margin: 0;
}

.title > h2 > span {
  position: relative;
  top: 6px;
}

.material-icons {
  user-select: none;
  margin: 0;
  margin-left: 5px;
  font-size: 40px;
  line-height: 0;
  transition: 0.5s;
}

.open {
  transform: rotate(180deg);
}

.explain {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  text-align: center;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  height: 0;
  transition: 0.5s;
  width: 55vw;
  margin: 0 6vw;
  padding: 0 1vw;
}

.explain::-webkit-scrollbar {
  display: none;
}

.expand {
  height: 7.5vh;
  margin-bottom: 5vh;
}

.explainText {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
}

.createContentContainer {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-top: 3px solid rgb(100, 100, 200);
  width: 96vw;
  height: 85vh;
}

.createContentContainer::-webkit-scrollbar {
  display: none;
}

.minimize {
  height: 73vh;
}

.createButtonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 100px 0 50px;
}

.createButton {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgb(44, 44, 64);
  height: 75px;
  width: 200px;
  border-radius: 20px;
  font-size: 30px;
}
</style>
