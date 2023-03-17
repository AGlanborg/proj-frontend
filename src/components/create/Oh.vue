<template>
  <div class="createContent">
    <div class="createTitleContainer">
      <h2 class="createTitle">
        Leverantörs<wbr />faktura &#38; administrations<wbr />kostnader, OH
      </h2>
    </div>
    <div class="createForm">
      <label for="valuta"> Valuta </label>
      <select id="valuta" :value="valuta" @change="$emit('onValuta', $event)">
        <option>SEK</option>
      </select>
      <label for="mangd"> Antal licenser </label>
      <input
        type="number"
        min="1"
        lang="sv"
        id="mangd"
        :value="mangd"
        @input="$emit('onMangd', $event)"
      />
      <label for="inprisex"> Inpris ex. moms </label>
      <input
        type="number"
        min="1"
        lang="sv"
        id="inprisex"
        :value="inprisex"
        @input="$emit('onInprisex', $event)"
      />
      <label for="inprisin"> Inpris inkl. moms </label>
      <input
        type="number"
        min="1"
        lang="sv"
        id="inprisin"
        disabled
        :value="inprisin"
      />
      <label for="procent"> Procent (%) </label>
      <input
        type="number"
        min="1"
        lang="sv"
        id="procent"
        :value="procent"
        @input="$emit('onProcent', $event)"
      />
      <label for="oh"> OH </label>
      <input type="number" min="1" lang="sv" id="oh" disabled :value="oh" />
      <label for="totalt"> Totalt, SEK, inkl. moms och OH </label>
      <input type="number" min="1" lang="sv" id="totalt" disabled :value="totalt" />
      <label for="fakturanum"> Fakturanummer </label>
      <input
        type="text"
        lang="sv"
        id="fakturanum"
        placeholder="..."
        :value="fakturanum"
        @input="$emit('onFakturanum', $event)"
      />
      <label for="kommentar"> Kommentar </label>
      <input
        type="text"
        lang="sv"
        id="kommentar"
        placeholder="..."
        :value="kommentar"
        @input="$event('onKommentar', $event)"
      />
    </div>
    <div class="newForm"></div>
  </div>
</template>

<script>
export default {
  name: "Create-oh",
  props: {
    valuta: String,
    mangd: String,
    inprisex: String,
    inprisin: String,
    procent: String,
    oh: String,
    totalt: String,
    fakturanum: String,
    kommentar: String,
  },
};
</script>

<style scoped>
@import "@/assets/css/create.css";
@import "@/assets/css/new.css";
</style>
