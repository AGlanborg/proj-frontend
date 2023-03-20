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
        <button class="createButton clear" @click="$emit('handleClear')">Clear</button>
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
  props: {
    shell: Object,
  },
  data() {
    return {
      title: false,
    };
  },
  methods: {
    onSaljare(event) {
      this.$emit("onSaljare", event);
    },
    onKopare(event) {
      this.$emit("onKopare", event);
    },
    onArb(event) {
      this.$emit("onArb", event);
    },
    onTyp(event) {
      this.$emit("onTyp", event);
    },
    onLeve(event) {
      this.$emit("onLeve", event);
    },
    onText(event) {
      this.$emit("onText", event);
    },
    onInfo(event) {
      this.$emit("onInfo", event);
    },
    onValuta(event) {
      this.$emit("onValuta", event);
    },
    onMangd(event) {
      this.$emit("onMangd", event);
    },
    onInprisex(event) {
      this.$emit("onInprisex", event);
    },
    onProcent(event) {
      this.$emit("onProcent", event);
    },
    onFakturanum(event) {
      this.$emit("onFakturanum", event);
    },
    onKommentar(event) {
      this.$emit("onKommentar", event);
    },
    onStart(event) {
      this.$emit("onStart", event);
    },
    onSlut(event) {
      this.$emit("onSlut", event);
    },
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
  justify-content: space-evenly;
  align-items: space;
  width: 100%;
  margin: 100px 0 50px;
}

.createButton {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: 2px solid rgb(50, 200, 50);
  background-color: rgb(44, 44, 64);
  height: 75px;
  width: 200px;
  border-radius: 20px;
  font-size: 30px;
}

.clear {
  outline: 2px solid rgb(200, 50, 50);
}
</style>
