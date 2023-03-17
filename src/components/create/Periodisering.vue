<template>
  <div class="createContent">
    <div class="createTitleContainer">
      <h2 class="createTitle">Periodisering av kostnad</h2>
      <p class="createSubTitle">
        Periodiseringen baseras på samma löptid som på leverantörsfakturan
      </p>
    </div>
    <div class="createForm">
      <label for="inpris"> Internpris </label>
      <input
        type="number"
        min="1"
        lang="sv"
        id="inpris"
        disabled
        :value="inpris"
      />
      <label for="start"> Periodisering Start </label>
      <input
        type="month"
        lang="sv"
        id="start"
        :min="now"
        :value="start"
        @input="$emit('onStart', $event)"
      />
      <label for="slut"> Periodisering Slut </label>
      <input
        type="month"
        lang="sv"
        id="slut"
        :min="now"
        :value="slut"
        @input="$emit('onSlut', $event)"
      />
      <label for="perioder"> Periodisering antal månader </label>
      <input type="number" lang="sv" id="perioder" disabled :value="perioder" />
      <label for="upfront"> Antal månader upfront </label>
      <input type="Number" lang="sv" id="upfront" disabled :value="upfront" />
      <label for="rest"> Antal månader resterande </label>
      <input type="Number" lang="sv" id="rest" disabled :value="rest" />
      <label for="internfakt"> Internfakt. per period, SEK </label>
      <input
        type="number"
        lang="sv"
        id="internfakt"
        disabled
        :value="internfakt"
      />
      <label for="intakt"> Intäkt </label>
      <input type="number" lang="sv" id="intakt" disabled :value="intakt" />
      <label for="check"> Check </label>
      <input type="number" lang="sv" id="check" disabled :value="check" />
    </div>
    <div class="newForm"></div>
  </div>
</template>

<script>
export default {
  name: "Create-periodisering",
  props: {
    inpris: String,
    start: String,
    slut: String,
    perioder: Number,
    internfakt: Number,
    upfront: Number,
    rest: Number,
    intakt: Number,
    check: Number,
    now: String,
  },
};
</script>

<style scoped>
@import "@/assets/css/create.css";
@import "@/assets/css/new.css";
</style>
