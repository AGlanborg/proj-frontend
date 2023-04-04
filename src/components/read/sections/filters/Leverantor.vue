<template>
  <div class="filterContainer">
    <div class="container">
      <div class="newText">
        <label for="minfaktur"> Tidigast Faktureringsperiod </label>
        <select id="minfaktur" v-model="start" @change="updateFilters">
          <option selected disabled hidden></option>
          <option v-for="month in months" v-bind:key="month">
            {{ month }}
          </option>
          <option value=""></option>
        </select>
      </div>
    </div>
    <div class="container">
      <div class="newText">
        <label for="maxfaktur"> Senast Faktureringsperiod </label>
        <select id="maxfaktur" v-model="slut" @change="updateFilters">
          <option selected disabled hidden></option>
          <option v-for="month in months" v-bind:key="month">
            {{ month }}
          </option>
          <option value=""></option>
        </select>
      </div>
    </div>
    <div class="container">
      <div class="newText">
        <label for="kopare"> Köpare </label>
        <select id="kopare" v-model="buyer" @change="updateFilters">
          <option selected disabled hidden :value="buyer.kopare_id">
            <div v-if="buyer.kopare_id == ''"></div>
            <div v-else>
              <div v-if="buyer.name">
                {{ buyer.rst }}
              </div>
              <div v-else>
                {{ buyer.copernicus }}
              </div>
            </div>
          </option>
          <option
            v-for="inst in kopare"
            v-bind:key="inst.kopare_id"
            :value="inst"
          >
            <div v-if="inst.name">
              {{ inst.rst }}
            </div>
            <div v-else>
              {{ inst.copernicus }}
            </div>
          </option>
          <option :value="{ kopare_id: '', name: '', copernicus: '' }"></option>
        </select>
      </div>
    </div>
    <div class="container">
      <div class="newText">
        <label for="min"> Min kostnad </label>
        <input
          id="min"
          type="number"
          min="0"
          lang="sv"
          :max="max"
          v-model="min"
          @input="updateFilters"
        />
      </div>
    </div>
    <div class="container">
      <div class="newText">
        <label for="max"> Max kostnad </label>
        <input
          id="max"
          type="number"
          min="0"
          lang="sv"
          :max="ceil"
          v-model="max"
          @input="updateFilters"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filter-verifik",
  props: {
    instances: Array,
    saljare: Array,
    kopare: Array,
    arbetstyp: Array,
  },
  data() {
    return {
      buyer: {
        kopare_id: "",
        name: "",
        copernicus: "",
      },
      start: "",
      slut: "",
      months: [],
      min: 0,
      max: 0,
      ceil: 0,
    };
  },
  methods: {
    updateFilters() {
      const obj = {
        start: this.start,
        slut: this.slut,
        kopare: this.buyer.kopare_id,
        min: this.min,
        max: this.max,
      };

      this.$emit("updateFilters", obj);
    },
    initFilters() {
      this.instances.forEach((value) => {
        if (!this.months.includes(value.now)) {
          this.months.push(value.now);
        }

        this.max = Math.max(Math.ceil(parseFloat(value.totalt)), this.max);
        this.ceil = this.max;
      });

      this.months.sort();

      this.updateFilters();
    },
  },
  mounted() {
    this.initFilters();
  },
  watch: {
    instances() {
      this.initFilters();
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/create.css";

input[type="number"] {
  width: 0;
}

.filterContainer {
  height: 90vh;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.filterContainer::-webkit-scrollbar {
  display: none;
}

.container {
  padding: 0 5vw;
}
</style>