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
      <div class="idContainer" :class="{idInside: create && shell.main_id}">
        <p>
          För närvarande redigerar:
        </p>
        <div class="id">
          <p>
            ID : {{ shell.main_id }}
          </p>
        </div>
      </div>
      <Mottagande
        :shell="shell"
        :empty="empty"
        :saljare="saljare"
        :kopare="kopare"
        :arbetstyp="arbetstyp"
        @onSaljare="onSaljare"
        @onKopare="onKopare"
        @onArb="onArb"
        @onTyp="onTyp"
        @onLeve="onLeve"
        @onText="onText"
        @onInfo="onInfo"
        @reload="$emit('reload')"
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
        <button class="createButton" @click="handleCreate">Create</button>
        <button class="createButton clear" @click="$emit('handleClear')">Clear</button>
      </div>
    </div>
  </div>
</template>

<script>
import Mottagande from "./create/Mottagande.vue";
import Oh from "./create/Oh.vue";
import Periodisering from "./create/Periodisering.vue";

import { form } from '@/assets/scripts/requests/post'

export default {
  name: "Main-create",
  components: {
    Mottagande,
    Oh,
    Periodisering,
  },
  props: {
    create: Boolean,
    shell: Object,
    empty: Object,
    saljare: Array,
    kopare: Array,
    arbetstyp: Array,
  },
  data() {
    return {
      title: false,
    };
  },
  methods: {
    handleCreate() {
      const values = Object.values(this.shell)
      let check = false

      for(let i = 0; i < values.length; i += 1) {
        if (!values[i]) {
          check = true
          break
        }
      }

      if (!check) {
        form(this.shell, "main")
      }
    },
    onSaljare(value) {
      this.$emit("onSaljare", value);
    },
    onKopare(value) {
      this.$emit("onKopare", value);
    },
    onArb(value) {
      this.$emit("onArb", value);
    },
    onTyp(value) {
      this.$emit("onTyp", value);
    },
    onLeve(value) {
      this.$emit("onLeve", value);
    },
    onText(value) {
      this.$emit("onText", value);
    },
    onInfo(value) {
      this.$emit("onInfo", value);
    },
    onValuta(value) {
      this.$emit("onValuta", value);
    },
    onMangd(value) {
      this.$emit("onMangd", value);
    },
    onInprisex(value) {
      this.$emit("onInprisex", value);
    },
    onProcent(value) {
      this.$emit("onProcent", value);
    },
    onFakturanum(value) {
      this.$emit("onFakturanum", value);
    },
    onKommentar(value) {
      this.$emit("onKommentar", value);
    },
    onStart(value) {
      this.$emit("onStart", value);
    },
    onSlut(value) {
      this.$emit("onSlut", value);
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

.idContainer {
  position: fixed;
  left: 176vw;
  top: 15vh;
  z-index: 5;
  transition: 1s;
}

.idContainer > p {
  margin: 0 0 8px 10px;
}

.id {
  border: 3px solid rgb(100, 100, 200);
  background-color: rgb(44, 44, 64);
  width: 175px;
  height: 50px;
  border-radius: 20px;
  padding: 0 25px;
}

.id > p {
  font-size: 25px;
  line-height: 0;
}

.idInside {
  left: 80vw;
}
</style>
