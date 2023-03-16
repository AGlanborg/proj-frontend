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
        :saljare="saljare"
        :kopare="kopare"
        :arbetstyp="arbetstyp"
        :antal="antal"
        :typ="typ"
        :leverantor="leverantor"
        :text="text"
        :info="info"
        @onSaljare="onSaljare"
        @onKopare="onKopare"
        @onArb="onArb"
        @onAntal="onAntal"
        @onTyp="onTyp"
        @onLeve="onLeve"
        @onText="onText"
        @onInfo="onInfo"
      />
      <Oh
        :valuta="valuta"
        :mangd="mangd"
        :inprisex="inprisex"
        :inprisin="inprisin"
        :procent="procent"
        :oh="oh"
        :total="total"
        :fakturanum="fakturanum"
        :kommentar="kommentar"
        @onValuta="onValuta"
        @onMangd="onMangd"
        @onInprisex="onInprisex"
        @onProcent="onProcent"
        @onFakturanum="onFakturanum"
        @onKommentar="onKommentar"
      />
      <Periodisering
        :total="total"
        :fakturanum="fakturanum"
        :kommentar="kommentar"
        :start="start"
        :slut="slut"
        :perioder="perioder"
        :infakt="infakt"
        :upfront="upfront"
        :rest="rest"
        :now="now"
        :check="check"
        @onStart="onStart"
        @onSlut="onSlut"
        @onUpfront="onUpfront"
        @onRest="onRest"
      />
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
      inprisin: 1.25,
      procent: "5",
      oh: 0.0625,
      total: 1.3125,
      fakturanum: "",
      kommentar: "",
      start: "",
      slut: "",
      perioder: 0,
      infakt: 0,
      upfront: "0",
      rest: "0",
      now: "",
    };
  },
  methods: {
    updContent() {
      this.inprisin = this.inprisex * 1.25;
      this.oh = this.inprisin * (this.procent / 100);
      this.total = parseInt(this.mangd) * (this.inprisin + this.oh);

      this.updPerioder();
    },
    updPerioder() {
      const start = this.slut.split("-");
      const slut = this.start.split("-");
      this.perioder =
        12 * (parseInt(start[0]) - parseInt(slut[0])) +
        parseInt(start[1]) -
        parseInt(slut[1]);

      this.updInfakt();
    },
    updInfakt() {
      if (this.perioder == 0) {
        this.infakt = 0;
      } else {
        this.infakt = this.total / this.perioder;
      }
    },
    onSaljare(event) {
      this.saljare = event.target.value;

      if (this.kopare == "Ny") {
        this.kopare = "";
      }
      if (this.arbetstyp == "Ny") {
        this.arbetstyp = "";
      }
    },
    onKopare(event) {
      this.kopare = event.target.value;

      if (this.saljare == "Ny") {
        this.saljare = "";
      }
      if (this.arbetstyp == "Ny") {
        this.arbetstyp = "";
      }
    },
    onArb(event) {
      this.arbetstyp = event.target.value;

      if (this.saljare == "Ny") {
        this.saljare = "";
      }
      if (this.kopare == "Ny") {
        this.kopare = "";
      }
    },
    onAntal(event) {
      this.antal = event.target.value;
    },
    onTyp(event) {
      this.typ = event.target.value;

      if (this.text.split(" ")[0].includes("kostnad")) {
        this.text =
          this.typ + "kostnad " + this.text.split(" ").slice(1).join(" ");
      } else {
        this.text = this.typ + "kostnad " + this.text;
      }
    },
    onLeve(event) {
      this.leverantor = event.target.value;
    },
    onText(event) {
      this.text = event.target.value;
    },
    onInfo(event) {
      this.info = event.target.value;
    },
    onValuta(event) {
      this.valuta = event.target.value;
    },
    onMangd(event) {
      this.mangd = event.target.value;
      this.updContent();
    },
    onInprisex(event) {
      this.inprisex = event.target.value;
      this.updContent();
    },
    onProcent(event) {
      this.procent = event.target.value;
      this.updContent();
    },
    onFakturanum(event) {
      this.fakturanum = event.target.value;
    },
    onKommentar(event) {
      this.kommentar = event.target.value;
    },
    onStart(event) {
      this.start = event.target.value;
      this.updPerioder();
    },
    onSlut(event) {
      this.slut = event.target.value;
      this.updPerioder();
    },
    onUpfront(event) {
      this.upfront = event.target.value;
    },
    onRest(event) {
      this.rest = event.target.value;
    },
  },
  mounted() {
    let now = new Date();
    if (now.getMonth().toString().length < 2) {
      now = now.getFullYear() + "-0" + (now.getMonth() + 1);
    } else {
      now = now.getFullYear() + "-" + now.getMonth();
    }

    this.start = now;
    this.slut = now;
    this.now = now;

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
