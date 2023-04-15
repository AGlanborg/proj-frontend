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
        <label for="seller"> Säljare </label>
        <select id="seller" v-model="seller" @change="updateFilters">
          <option selected disabled hidden :value="seller.saljare_id">
            <div v-if="seller.saljare_id == ''"></div>
            <div v-else>
              <div v-if="seller.name">
                {{ seller.rst }}
              </div>
              <div v-else>
                {{ seller.copernicus }}
              </div>
            </div>
          </option>
          <option
            v-for="inst in saljare"
            v-bind:key="inst.saljare_id"
            :value="inst"
          >
            <div v-if="inst.name">
              {{ inst.rst }}
            </div>
            <div v-else>
              {{ inst.copernicus }}
            </div>
          </option>
          <option
            :value="{ saljare_id: '', name: '', copernicus: '' }"
          ></option>
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
        <label for="arbetstyp"> Arbetstyp </label>
        <select id="arbetstyp" v-model="worktype" @change="updateFilters">
          <option selected disabled hidden :value="worktype.arbetstyp_id">
            <div v-if="worktype.arbetstyp_id == ''"></div>
            <div v-else>
              {{ worktype.arbetstyp }}
            </div>
          </option>
          <option
            v-for="inst in arbetstyp"
            v-bind:key="inst.arbetstyp_id"
            :value="inst"
          >
            {{ inst.arbetstyp }}
          </option>
          <option
            :value="{ arbetstyp_id: '', tillverkare: '', arbetstyp: '' }"
          ></option>
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
      seller: {
        saljare_id: "",
        name: "",
        copernicus: "",
      },
      buyer: {
        kopare_id: "",
        name: "",
        copernicus: "",
      },
      worktype: {
        arbetstyp_id: "",
        tillverkare: "",
        arbetstyp: "",
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
        saljare: this.seller.saljare_id,
        kopare: this.buyer.kopare_id,
        arbetstyp: this.worktype.arbetstyp_id,
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
@import "@/assets/css/filter.css";

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
  width: 11vw;
  padding: 0 2vw;
}
</style>