<template>
  <div class="filterContainer">
    <label for="seller"> Leverantör </label>
    <select id="seller">
      <option value="0"></option>
    </select>
    <label for="buyer"> Köpare </label>
    <select id="buyer">
      <option value="0"></option>
    </select>
    <label for="worktype"> Arbetstyp </label>
    <select id="worktype">
      <option value="0"></option>
    </select>
    <label for="amount"> Antal </label>
    <select id="amount">
      <option value="1">1</option>
    </select>
    <label for="format"> Format </label>
    <select id="format">
    </select>
  </div>
</template>

<script>
export default {
  name: "Categories-filter",
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