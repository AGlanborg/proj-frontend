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
        :value="shell.inpris"
      />
      <label for="start"> Periodisering Start </label>
      <input
        type="month"
        lang="sv"
        id="start"
        :min="shell.now"
        :value="shell.start"
        @input="$emit('onStart', $event)"
      />
      <label for="slut"> Periodisering Slut </label>
      <input
        type="month"
        lang="sv"
        id="slut"
        :min="shell.now"
        :value="shell.slut"
        @input="$emit('onSlut', $event)"
      />
      <label for="perioder"> Periodisering antal månader </label>
      <input
        type="number"
        lang="sv"
        id="perioder"
        disabled
        :value="shell.perioder"
      />
      <label for="upfront"> Antal månader upfront </label>
      <input
        type="Number"
        lang="sv"
        id="upfront"
        disabled
        :value="shell.upfront"
      />
      <label for="rest"> Antal månader resterande </label>
      <input type="Number" lang="sv" id="rest" disabled :value="shell.rest" />
      <label for="internfakt"> Internfakt. per period, SEK </label>
      <input
        type="number"
        lang="sv"
        id="internfakt"
        disabled
        :value="shell.internfakt"
      />
      <label for="intakt"> Intäkt </label>
      <input
        type="number"
        lang="sv"
        id="intakt"
        disabled
        :value="shell.intakt"
      />
      <label for="scan"> scan </label>
      <input type="number" lang="sv" id="scan" disabled :value="shell.scan" />
    </div>
    <div class="newForm"></div>
  </div>
</template>

<script>
export default {
  name: "Create-periodisering",
  props: {
    shell: Object,
  },
};
</script>

<style scoped>
@import "@/assets/css/create.css";
@import "@/assets/css/new.css";
</style>
