<template>
  <div class="createContent">
    <div class="createTitleContainer">
      <h2 class="createTitle">Periodisering av kostnad</h2>
      <p class="createSubTitle">
        Periodiseringen baseras på samma löptid som på leverantörsfakturan
      </p>
    </div>
    <div class="createForm">
      <label for="inpris"> Inpris </label>
      <input type="number" min="1" id="inpris" disabled :value="total"/>
      <label for="start"> Periodisering Start </label>
      <input
        type="month"
        :min="now"
        id="start"
        :value="start"
        @input="$emit('onStart', $event)"
      />
      <label for="slut"> Periodisering Slut </label>
      <input
        type="month"
        :min="now"
        id="slut"
        :value="slut"
        @input="$emit('onSlut', $event)"
      />
      <label for="perioder"> Periodisering antal månader </label>
      <input type="number" id="perioder" disabled :value="perioder" />
      <label for="infakt"> Internfakt. per period </label>
      <input type="number" min="1" id="infakt" disabled :value="infakt" />
      <label for="upfront"> Antal månader upfront </label>
      <input type="Number" min="0" id="upfront" :value="upfront" @input="$event('onUpfront', $event)" />
      <label for="rest"> Antal månader rest </label>
      <input type="Number" min="0" id="rest" :value="rest" @input="$event('onRest', $event)" />
    </div>
    <div class="newForm"></div>
  </div>
</template>

<script>
export default {
  name: "Create-periodisering",
  props: {
    total: Number,
    start: String,
    slut: String,
    perioder: Number,
    infakt: Number,
    upfront: String,
    rest: String,
    now: String,
  },
};
</script>

<style scoped>
@import "@/assets/css/create.css";
@import "@/assets/css/new.css";
</style>
