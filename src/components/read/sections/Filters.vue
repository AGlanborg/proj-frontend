<template>
  <div class="filterContainer">
    <label for="seller"> Leverantör </label>
    <select v-bind="selectedSeller" id="seller">
      <option value="0"></option>
      <option
        v-for="seller in sellers"
        v-bind:key="seller.id"
        :value="seller.id"
      >
        {{ seller.text }}
      </option>
    </select>
    <label for="buyer"> Köpare </label>
    <select v-bind="selectedBuyer" id="buyer">
      <option value="0"></option>
      <option v-for="buyer in buyers" v-bind:key="buyer.id" :value="buyer.id">
        {{ buyer.text }}
      </option>
    </select>
    <label for="worktype"> Arbetstyp </label>
    <select v-bind="selectedWorkType" id="worktype">
      <option value="0"></option>
      <option
        v-for="workType in workTypes"
        v-bind:key="workType.id"
        :value="workType.id"
      >
        {{ workType.text }}
      </option>
    </select>
    <label for="amount"> Antal </label>
    <select v-bind="selectedAmount" id="amount">
      <option value="1">1</option>
      <option
        v-for="amount in amounts"
        v-bind:key="amount.id"
        :value="amount.id"
      >
        {{ amount.text }}
      </option>
    </select>
    <label for="format"> Format </label>
    <select v-bind="selectedformat" id="format">
      <option
        v-for="format in formats"
        v-bind:key="format.id"
        :value="format.id"
      >
        {{ format.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Categories-filter",
  props: {
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
};
</script>

<style scoped>
label {
  font-size: 20px;
  margin: 0 8px;
}

select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  cursor: pointer;
  height: 4vh;
  width: 90%;
  min-width: 200px;
  padding: 0 0.5vw;
  margin: 10px 50px 35px 0;
  border-radius: 10px;
  font-size: 20px;
}

select,
option {
  background-color: rgba(44, 44, 64);
}

.filterContainer {
  display: flex;
  flex-direction: column;
  padding: 5%;
  margin: 0 10%;
}
</style>