<template>
  <div class="createContainer">
    <div class="titleContainer">
      <h2 class="title" @click="toggleTitle">
        Create<span class="material-icons" :class="title ? 'open' : ''"
          >keyboard_arrow_up</span
        >
      </h2>
    </div>
    <div class="explain" :class="title ? 'expand' : ''">
      <p class="explainText" :class="title ? 'visible' : 'hidden'">
        Under denna rubrik kan lägga till fler rader i databasen. Varje fält är
        kategoriserad och namngiven. Vissa fält är fler-val och vissa går inte
        att ändra på.
      </p>
    </div>
    <div class="createContentContainer">
      <div class="createContent">
        <div class="createTitleContainer">
          <h2 class="createTitle">General</h2>
          <p class="createSubTitle">Vem, var, hur</p>
        </div>
        <div class="createForm">
          <label for="saljare"> Leverantör </label>
          <select id="saljare" v-model="saljare">
            <option disabled></option>
            <option>Ny</option>
          </select>
          <label for="kopare"> Köpare </label>
          <select id="kopare" v-model="kopare">
            <option disabled></option>
            <option>Ny</option>
          </select>
          <label for="arbetstyp"> Arbetstyp </label>
          <select id="arbetstyp" v-model="arbetstyp">
            <option disabled></option>
            <option>Ny</option>
          </select>
          <label for="antal"> Antal </label>
          <input type="text" id="antal" class="antal" v-model="antal" />
          <label for="text"> Text </label>
          <textarea id="text" v-model="text"> </textarea>
        </div>
        <div class="newForm">
          <div class="new" :class="kopare == 'Ny' ? 'expandNew' : ''">
            <h2>Ny köpare</h2>
            <div>
              <label for="rst"> RST nummer </label>
              <input
                type="text"
                id="rst"
                v-model="rst"
                @input="checknewFilled"
              />
            </div>
            <div>
              <label for="copernicus"> Copernicus kod </label>
              <input
                type="text"
                id="copernicus"
                v-model="copernicus"
                @input="checknewFilled"
              />
            </div>
            <div>
              <label for="kontaktperson"> Kontaktperson </label>
              <input
                type="text"
                id="kontaktperson"
                v-model="kontakt"
                @input="checknewFilled"
              />
            </div>
            <div class="newButton">
              <input
                type="button"
                value="Skapa"
                :class="newFilled ? '' : 'disabeled'"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="createContent">
        <div class="createTitleContainer">
          <h2 class="createTitle">Mängd</h2>
          <p class="createSubTitle">Hur mycket och tid</p>
        </div>
        <div class="createForm">
          <label for="internpris"> Internpris (SEK) </label>
          <input type="text" id="internpris" v-model="internpris" />
          <label for="periodstart">
            Periodisering start
            <abbr title="Manuellt intryck på Firefox">
              <span class="material-icons smallIcon">info</span>
            </abbr>
          </label>
          <input
            type="month"
            id="periodstart"
            placeholder="yyyy-mm"
            v-model="periodstart"
            :min="now"
          />
          <label for="periodslut">
            Periodisering slut
            <abbr title="Manuellt intryck på Firefox">
              <span class="material-icons smallIcon">info</span>
            </abbr>
          </label>
          <input
            type="month"
            id="periodslut"
            placeholder="yyyy-mm"
            v-model="periodslut"
            :min="now"
          />
          <label for="ar"> År </label>
          <input
            type="month"
            id="ar"
            placeholder="yyyy"
            class="disabeled"
            v-model="ar"
            disabled
          />
          <label for="manad"> Månad </label>
          <input
            type="month"
            id="manad"
            placeholder="mm"
            class="disabeled"
            v-model="manad"
            disabled
          />
        </div>
      </div>
      <div class="createContent">
        <div class="createTitleContainer">
          <h2 class="createTitle">Detaljer</h2>
          <p class="createSubTitle">Pengar</p>
        </div>
        <div class="createForm">
          <label for="typ"> Typ </label>
          <select id="typ" v-model="typ">
            <option disabled></option>
            <option>Licens</option>
            <option>Support</option>
            <option>Services</option>
          </select>
          <label for="leverantor"> Leverantör </label>
          <select id="leverantor" v-model="leverantor">
            <option disabled></option>
            <option>Ny</option>
          </select>
          <label for="valuta"> Valuta </label>
          <select id="valuta" v-model="valuta">
            <option disabled></option>
            <option>Ny</option>
          </select>
          <label for="mangd"> Mängd </label>
          <input type="text" id="mangd" class="mangd" v-model="mangd" />
          <label for="inpris"> Inpris ex moms </label>
          <input type="text" id="inpris" class="inpris" v-model="inpris" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main-create",
  data() {
    return {
      title: false,
      saljare: "",
      kopare: "",
      arbetstyp: "",
      antal: "",
      text: "",
      internpris: "",
      periodstart: "",
      periodslut: "",
      ar: "",
      manad: "",
      typ: "",
      leverantor: "",
      valuta: "",
      mangd: "",
      inpris: "",
      rst: "",
      copernicus: "",
      kontakt: "",
      newFilled: false,
      now: "",
    };
  },
  methods: {
    toggleTitle() {
      this.title ? (this.title = false) : (this.title = true);
    },
    checknewFilled() {
      if (this.rst == "" || this.copernicus == "" || this.kontakt == "") {
        this.newFilled = false;
      } else {
        this.newFilled = true;
      }
    },
  },
  mounted() {
    const now = new Date();
    if (now.getMonth().toString().length < 2) {
      this.now = now.getFullYear() + "-0" + (now.getMonth() + 1);
      this.manad = "0" + (now.getMonth() + 1);
    } else {
      this.now = now.getFullYear() + "-" + now.getMonth();
      this.manad = now.getMonth() + 1;
    }
    this.periodstart = this.now;
    this.periodslut = this.now;
    this.ar = now.getFullYear();
  },
};
</script>

<style scoped>
label {
  font-size: 20px;
  margin: 0 8px;
}

input[type="text"],
input[type="month"],
select,
textarea {
  display: block;
  border: none;
  outline: none;
  background-color: rgb(44, 44, 64);
  height: 4vh;
  padding: 0 0.5vw;
  margin: 10px 60px 45px 0;
  border-radius: 10px;
  font-size: 20px;
}

select {
  cursor: pointer;
  appearance: none;
  width: 15vw;
}

input[type="text"] {
  width: 14vw;
}

input[type="button"] {
  border: none;
  outline: none;
  cursor: pointer;
  background-color: rgb(55, 55, 80);
  border-radius: 10px;
  font-size: 20px;
  padding: 1vh 1vw;
}

input[type="text"].antal {
  width: 8vw;
}

textarea {
  padding: 1vw 1vh;
  flex-wrap: wrap;
  height: 18vh;
  width: 14vw;
}

.createContainer {
  box-shadow: -10px 0 15px rgba(0, 0, 0, 0.5);
  height: 100vh;
}

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
  font-size: 40px;
  margin: 0;
  line-height: 0;
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

.explain,
.new {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  height: 0;
  transition: 0.5s;
}

.explain {
  text-align: center;
  width: 55vw;
  margin: 0 6vw;
  padding: 0 1vw;
}

.new {
  width: 20vw;
  padding: 0 0.5vw;
}

.new > h2 {
  text-align: center;
}

.new > div > input {
  background-color: rgb(55, 55, 80);
  margin-bottom: 5vh;
}

.explain::-webkit-scrollbar,
.new::-webkit-scrollbar {
  display: none;
}

.expand {
  height: 7.5vh;
}

.expandNew {
  min-height: 60vh;
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
  border: 1px solid rgb(44, 44, 64);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 80vw;
  height: 75vh;
  margin: 5vh 6vw 0;
  border-radius: 20px;
}

.createContentContainer::-webkit-scrollbar {
  display: none;
}

.createContent {
  display: flex;
  flex-direction: row;
  border-bottom: 5px solid rgb(44, 44, 64);
}

.createForm {
  width: 25vw;
  padding: 5vh 0 0;
}

.createTitleContainer {
  width: 20vw;
  padding: 5vh 0 0 5vw;
}

.createTitleContainer {
  display: flex;
  flex-direction: column;
}

.createTitle {
  display: inline-block;
  font-size: 35px;
  margin: 0;
}

.createSubTitle {
  display: inline-block;
  font-size: 20px;
  margin: 10px 0 0 30px;
}

.newForm {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30vw;
}

.newButton {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
}

.disabeled {
  cursor: default;
  color: rgb(100, 100, 100);
}

.smallIcon {
  font-size: 25px;
  line-height: 0;
}
</style>
