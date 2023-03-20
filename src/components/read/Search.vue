<template>
  <main class="mainContainer" :class="category ? '' : 'expandAll'">
    <div class="createArrowContainer">
      <button class="createArrow" :class="category ? 'createArrowLeft' : ''">
        <span
          class="material-icons createArrowIcon"
          :class="create ? '' : 'open'"
          @click="$emit('toggleCreate')"
        >
          keyboard_arrow_left
        </span>
      </button>
    </div>
    <div class="titleContainer">
      <button class="title" @click="title = !title">
        <h2>
          Search<span class="material-icons" :class="title ? 'open' : ''"
            >keyboard_arrow_up</span
          >
        </h2>
      </button>
    </div>
    <div class="explain" :class="title ? 'expand' : ''">
      <p class="explainText">
        Under denna rubrik kan du se all data som är sparad i databasen. Använd
        valalternativen under <strong>Categories</strong> rubriken och sökfältet
        nedan för att sortera innehållet av resultatfältet.
      </p>
    </div>
    <div class="navContainer">
      <div class="searchContainer">
        <abbr title="Search by text">
          <button class="searchButtonContainer">
            <span class="material-icons check">search</span>
          </button>
        </abbr>
        <input type="text" class="search" lang="sv" v-bind="search" />
      </div>
      <div class="formatContainer">
        <label for="format"> Välj Raport </label>
        <select id="format">
          <option>Summering verifikationer</option>
          <option>Periodiserad leverantörsfakturor</option>
          <option>Totala kostnaden per tillverkare</option>
          <option>Totala kostnaden per tillverkare</option>
        </select>
      </div>
    </div>
    <div
      class="resultContainer"
      :class="{ heightResult: title, widthResult: category }"
    >
      <Results
        :category="category"
        :instances="instances"
        :title="title"
        @handleCopy="handleCopy"
        @handleEdit="handleEdit"
        @handleRemove="handleRemove"
        @toggleUpload="$emit('toggleUpload')"
        @toggleCreate="$emit('toggleCreate')"
      />
    </div>
  </main>
</template>

<script>
import Results from "./sections/Results.vue";

export default {
  name: "Read-search",
  components: {
    Results,
  },
  props: {
    category: Boolean,
    instances: Array,
    create: Boolean,
  },
  data() {
    return {
      title: false,
      search: "",
    };
  },
  methods: {
    handleCopy(id) {
      this.$emit("handleCopy", id);
    },
    handleEdit(id) {
      this.$emit("handleEdit", id);
    },
    handleRemove(id) {
      this.$emit("handleRemove", id);
    },
  },
};
</script>

<style scoped>
abbr {
  text-decoration: none;
}

.mainContainer {
  position: absolute;
  box-shadow: inset -10px 0 15px rgba(0, 0, 0, 0.5);
  width: 97vw;
  height: 100vh;
  transition: 0.5s;
  left: 25vw;
}

.createArrowContainer {
  position: realtive;
  width: 100vw;
}

.createArrow {
  position: absolute;
  cursor: pointer;
  top: 92.5vh;
  left: 93vw;
  height: 40px;
  width: 40px;
}

.createArrowLeft {
  left: 72vw;
}

.createArrowIcon {
  position: relative;
  top: 20px;
  left: -5px;
  margin: 0;
  transition: 0.5s;
}

.expandAll {
  left: 4vw;
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
  text-align: center;
  overflow: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.2);
  width: 45vw;
  margin: 0 10%;
  padding: 0 1vw;
  border-radius: 10px;
  height: 0;
  transition: 0.5s;
}

.explain::-webkit-scrollbar {
  display: none;
}

.expand {
  height: 10vh;
}

.explainText {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
}

.navContainer {
  display: flex;
  flex-direction: row;
}

.searchContainer {
  display: flex;
  flex-direction: row;
  background-color: rgb(44, 44, 64);
  height: 5vh;
  margin: 2vh 2vw 1vh 6.5vw;
  width: 30vw;
  border-radius: 20px;
}

.searchButtonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-right: 5px solid rgb(55, 55, 80);
  width: 5vh;
  height: 5vh;
}

.search {
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 2vh;
  padding: 0 1vh;
  flex-grow: 1;
}

.formatContainer {
  display: flex;
  flex-direction: column;
}

.formatContainer > label {
  margin: 0;
  font-size: 1.5vh;
  line-height: 1.5vh;
}

.formatContainer > select {
  width: 350px;
  height: 4vh;
  margin-bottom: 0;
}

.resultContainer {
  display: flex;
  flex-direction: column;
  border: 3px solid rgb(44, 44, 64);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  width: 85vw;
  height: 75vh;
  margin: 2vh 5vw;
  border-radius: 20px;
  transition: 0.5s;
}

.widthResult {
  width: 65vw;
}

.heightResult {
  height: 65vh;
}

.check {
  user-select: none;
  font-size: 3vh;
}
</style>
