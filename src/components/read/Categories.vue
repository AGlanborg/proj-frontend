<template>
  <div class="container" :class="category ? '' : 'hideAll'">
    <div class="hideContainer">
      <div class="hide" @click="toggleCategory">
        <span class="material-icons hideIcon" :class="category ? 'open' : ''">
          keyboard_arrow_left
        </span>
      </div>
    </div>
    <div class="titleContainer">
      <h2 class="title" @click="toggleTitle">
        Categories<span class="material-icons" :class="title ? 'open' : ''">
          keyboard_arrow_up
        </span>
      </h2>
    </div>
    <div class="explain" :class="title ? 'expand' : ''">
      <p class="explainText">
        För att filtrera det innehåll som visas i resultatfältet under rubriken
        <strong>Search</strong>, kan följande fält fyllas i.
      </p>
    </div>
    <Filters
      :sellers="sellers"
      :selectedSeller="selectedSeller"
      :buyers="buyers"
      :selectedBuyer="selectedBuyer"
      :workTypes="workTypes"
      :selectedWorkType="selectedWorkType"
      :amounts="amounts"
      :selectedAmount="selectedAmount"
      :formats="formats"
      :selectedFormat="selectedFormat"
    />
  </div>
</template>

<script>
import Filters from "./sections/Filters.vue";

export default {
  name: "Read-categories",
  components: {
    Filters,
  },
  props: {
    category: Boolean,
    sellers: Array,
    selectedSeller: Number,
    buyers: Array,
    selectedBuyer: Number,
    workTypes: Array,
    selectedWorkType: Number,
    amounts: Array,
    selectedAmount: Number,
    formats: Array,
    selectedFormat: Number,
  },
  data() {
    return {
      title: false,
    };
  },
  methods: {
    toggleTitle() {
      this.title ? (this.title = false) : (this.title = true);
    },
    toggleCategory() {
      this.title = false
      this.$emit('toggleCategory')
    }
  },
};
</script>

<style scoped>
.container {
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
  top: 95vh;
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
  height: 60px;
  width: 285px;
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
