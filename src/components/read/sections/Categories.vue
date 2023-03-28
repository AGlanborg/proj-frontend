<template>
  <div class="categoryContainer" :class="category ? '' : 'hideAll'">
    <div class="hideContainer">
      <button class="hide" @click="toggleCategory">
        <span class="material-icons hideIcon" :class="category ? 'open' : ''">
          keyboard_arrow_left
        </span>
      </button>
    </div>
    <div class="titleContainer">
      <button class="title" @click="title = !title">
        <h2>
          Filter<span class="material-icons" :class="title ? 'open' : ''">
            keyboard_arrow_up
          </span>
        </h2>
      </button>
    </div>
    <div class="explain" :class="title ? 'expand' : ''">
      <p class="explainText">
        För att filtrera det innehåll som visas i resultatfältet under rubriken
        <strong>Start</strong>, kan följande fält fyllas i.
      </p>
    </div>
    <Leve
      v-if="rapport == '1'"
      :instances="instances"
      :saljare="saljare"
      :kopare="kopare"
      :arbetstyp="arbetstyp"
      @updateFilters="(obj) => $emit('updateFilters', obj)"
    />
  </div>
</template>

<script>
import Leve from "./filters/Verifik.vue";

export default {
  name: "Read-categories",
  components: {
    Leve,
  },
  props: {
    category: Boolean,
    rapport: String,
    instances: Array,
    saljare: Array,
    kopare: Array,
    arbetstyp: Array,
    now: String,
  },
  data() {
    return {
      title: false,
    };
  },
  methods: {
    toggleCategory() {
      this.title = false;
      this.$emit("toggleCategory");
    },
  },
};
</script>

<style scoped>
.categoryContainer {
  position: relative;
  box-shadow: inset -10px 0 15px rgba(0, 0, 0, 0.5);
  width: 25vw;
  height: 100vh;
  transition: 0.5s;
  left: 0;
}

.hideAll {
  left: -21vw;
}

.hideContainer {
  position: relative;
  width: 100%;
}

.hide {
  position: absolute;
  cursor: pointer;
  height: 40px;
  width: 40px;
  top: 92.5vh;
  right: 1.25vw;
}

.hideIcon {
  position: relative;
  top: 20px;
  left: -5px;
  margin: 0;
}

.titleContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  width: 100%;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
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
  width: 67.5%;
  margin: 0 10%;
  padding: 0 5%;
  border-radius: 10px;
  height: 0;
  transition: 0.5s;
}

.expand {
  height: 10vh;
}

.explainText {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
}
</style>
