<template>
  <div class="createContainer">
    <div class="titleContainer">
      <button class="title" @click="this.title = !this.title">
        <h2>
          Skapa<span class="material-icons" :class="title ? 'open' : ''"
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
      <div class="idContainer" :class="{ idInside: create && shell.main_id }">
        <p>För närvarande redigerar:</p>
        <div class="id">
          <p>ID : {{ shell.main_id }}</p>
        </div>
      </div>
      <Mottagande
        :shell="shell"
        :empty="empty"
        :saljare="saljare"
        :kopare="kopare"
        :arbetstyp="arbetstyp"
        @onSaljare="(value) => $emit('onSaljare', value)"
        @onKopare="(value) => $emit('onKopare', value)"
        @onArb="(value) => $emit('onArb', value)"
        @onTyp="(value) => $emit('onTyp', value)"
        @onLeve="(value) => $emit('onLeve', value)"
        @onText="(value) => $emit('onText', value)"
        @onInfo="(value) => $emit('onInfo', value)"
        @reload="$emit('reload')"
      />
      <Oh
        :shell="shell"
        @onValuta="(value) => $emit('onValuta', value)"
        @onMangd="(value) => $emit('onMangd', value)"
        @onInprisex="(value) => $emit('onInprisex', value)"
        @onProcent="(value) => $emit('onProcent', value)"
        @onFakturanum="(value) => $emit('onFakturanum', value)"
        @onKommentar="(value) => $emit('onKommentar', value)"
      />
      <Periodisering
        :shell="shell"
        @onStart="(value) => $emit('onStart', value)"
        @onSlut="(value) => $emit('onSlut', value)"
      />
      <div class="createButtonContainer">
        <button class="createButton" @click="handleUpdate" v-if="shell.main_id">
          Uppdatera
        </button>
        <button class="createButton" @click="handleCreate" v-else>
          Skapa
        </button>
        <button class="createButton clear" @click="$emit('handleClear')">
          Ångra
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Mottagande from "./create/Mottagande.vue";
import Oh from "./create/Oh.vue";
import Periodisering from "./create/Periodisering.vue";

import { form } from "@/assets/scripts/requests/post";
import put from "@/assets/scripts/requests/put";

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
    async handleCreate() {
      const values = Object.values(this.shell);

      let text = `'${this.shell.saljare.saljare_id}',`;
      text += `'${this.shell.kopare.kopare_id}',`;
      text += `'${this.shell.arbetstyp.arbetstyp_id}',`;

      values.splice(0, 4);

      for (let i = 0; i < values.length; i += 1) {
        text += `'${values[i]}',`;
      }

      text = text.substring(0, text.length - 1);

      await form({ data: text }, "main");

      this.$emit("handleClear");
      this.$emit("reload");
      this.$emit("toggleCreate");
    },
    async handleUpdate() {
      let obj = { ...this.shell };

      obj.saljare = this.shell.saljare.saljare_id;
      obj.kopare = this.shell.kopare.kopare_id;
      obj.arbetstyp = this.shell.arbetstyp.arbetstyp_id;

      await put({ data: obj }, "main");

      this.$emit("handleClear");
      this.$emit("reload");
      this.$emit("toggleCreate");
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
