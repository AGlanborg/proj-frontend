<template>
  <main class="mainContainer" :class="category ? '' : 'expandAll'">
    <div class="createArrowContainer">
      <button class="createArrow" :class="category ? 'createArrowLeft' : ''">
        <span
          class="material-icons createArrowIcon"
          :class="create ? '' : 'invis'"
          @click="$emit('toggleCreate')"
        >
          keyboard_arrow_left
        </span>
      </button>
    </div>
    <div class="titleContainer">
      <button class="title" @click="toggleTitle">
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
    <div class="searchContainer">
      <abbr title="Search by text">
        <button class="searchButtonContainer">
          <span class="material-icons check">search</span>
        </button>
      </abbr>
      <input type="text" class="search" lang="sv" v-bind="search" />
    </div>
    <div class="resultContainer" :class="category ? '' : 'maxResult'">
      <div class="result" :class="title ? 'maxTitle' : 'minTitle'">
        <Results
          :category="category"
          :instances="instances"
          :title="title"
          @handleRemove="handleRemove"
          @toggleUpload="$emit('toggleUpload')"
          @toggleCreate="$emit('toggleCreate')"
        />
      </div>
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
    toggleTitle() {
      this.title = !this.title;
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
  top: 95vh;
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
  transition: opacity 0.5s ease-in;
}

.invis {
  cursor: default;
  opacity: 0;
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

.searchContainer {
  display: flex;
  flex-direction: row;
  background-color: rgb(44, 44, 64);
  height: 5vh;
  margin: 2vh 6.5vw;
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

.resultContainer {
  display: flex;
  flex-direction: column;
  border: 3px solid rgb(44, 44, 64);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  width: 65vw;
  margin: 2vh 5vw;
  border-radius: 20px;
  transition: 0.5s;
}

.maxResult {
  width: 85vw;
}

.result {
  height: 65vh;
}

.minTitle {
  height: 75vh;
}

.check {
  user-select: none;
  font-size: 3vh;
}
</style>
